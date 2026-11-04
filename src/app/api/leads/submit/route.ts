import { NextRequest, NextResponse } from 'next/server';
import { fetchFromBackend, getApiErrorMessage } from '@/lib/apiProxy';
import { checkRateLimit } from '@/lib/rateLimit';
import { verifyTurnstileToken } from '@/lib/turnstile';

export async function POST(request: NextRequest) {
    try {
        const ip =
            request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            'unknown';

        // 1. Rate Limiting: 10 requests per minute per IP
        if (!checkRateLimit(`leads-submit:${ip}`, 10, 60_000)) {
            return NextResponse.json(
                { message: 'Too many requests. Please wait a moment and try again.' },
                { status: 429 }
            );
        }

        const body = await request.json().catch(() => null);
        if (!body || typeof body !== 'object') {
            return NextResponse.json(
                { message: 'Invalid request body.' },
                { status: 400 }
            );
        }

        // 2. Basic Validation
        const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
        const email = typeof body.email === 'string' ? body.email.trim() : '';
        const phone = typeof body.phone === 'string' ? body.phone.trim() : '';

        if (!fullName) {
            return NextResponse.json(
                { message: 'Full name is required.' },
                { status: 400 }
            );
        }

        if (!email && !phone) {
            return NextResponse.json(
                { message: 'Please provide either an email address or a phone number.' },
                { status: 400 }
            );
        }

        // 3. Cloudflare Turnstile Verification (Server-Side)
        if (body.turnstileToken) {
            const verified = await verifyTurnstileToken(
                body.turnstileToken,
                request.headers.get('x-user-ip') || ip
            );
            if (!verified) {
                return NextResponse.json(
                    { message: 'Security verification failed. Please try again.' },
                    { status: 403 }
                );
            }
        }

        // 4. Extract and forward UTM attribution query parameters
        const queryParams = new URLSearchParams();
        const utmSource = body.utm_source || body.utmSource || request.nextUrl.searchParams.get('utm_source');
        const utmMedium = body.utm_medium || body.utmMedium || request.nextUrl.searchParams.get('utm_medium');
        const utmCampaign = body.utm_campaign || body.utmCampaign || request.nextUrl.searchParams.get('utm_campaign');
        const utmTerm = body.utm_term || body.utmTerm || request.nextUrl.searchParams.get('utm_term');
        const utmContent = body.utm_content || body.utmContent || request.nextUrl.searchParams.get('utm_content');
        const leadSource = body.lead_source || body.leadSource || request.nextUrl.searchParams.get('lead_source');
        const gclid = body.gclid || request.nextUrl.searchParams.get('gclid');
        const landingPage = body.landingPage || body.landing_page;

        if (utmSource) queryParams.set('utm_source', utmSource);
        if (utmMedium) queryParams.set('utm_medium', utmMedium);
        if (utmCampaign) queryParams.set('utm_campaign', utmCampaign);
        if (utmTerm) queryParams.set('utm_term', utmTerm);
        if (utmContent) queryParams.set('utm_content', utmContent);
        if (leadSource) queryParams.set('lead_source', leadSource);
        if (gclid) queryParams.set('gclid', gclid);
        if (landingPage) queryParams.set('landing_page', landingPage);

        // 5. Proxy lead submission to backend CMS
        const response = await fetchFromBackend('/leads/submit', {
            method: 'POST',
            queryParams: queryParams.size > 0 ? queryParams : undefined,
            body,
            request,
            headers: {
                'x-user-ip': request.headers.get('x-user-ip') || (typeof body.clientIp === 'string' ? body.clientIp : ip),
                'user-agent': request.headers.get('user-agent') || '',
            },
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || 'Lead submission failed' },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('[Leads Submit Route] Error:', error);
        return NextResponse.json(
            { message: getApiErrorMessage(error) },
            { status: 500 }
        );
    }
}
