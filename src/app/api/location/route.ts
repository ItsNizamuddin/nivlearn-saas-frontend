import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';

export async function GET(request: NextRequest) {
    try {
        const clientIp =
            request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            'unknown';

        // Rate limit: 30 location requests per minute per IP
        if (!checkRateLimit(`location-lookup:${clientIp}`, 30, 60_000)) {
            return NextResponse.json(
                { status: 'fail', message: 'Too many requests' },
                { status: 429 }
            );
        }

        const searchParams = request.nextUrl.searchParams;
        const ip = searchParams.get('ip') || clientIp;

        const isLoopback =
            !ip ||
            ip === 'unknown' ||
            ip === '127.0.0.1' ||
            ip === '::1' ||
            ip === '::ffff:127.0.0.1' ||
            ip.startsWith('192.168.') ||
            ip.startsWith('10.');

        if (isLoopback) {
            // Local development fallback
            return NextResponse.json({
                status: 'success',
                country: 'India',
                countryCode: 'IN',
                region: 'KA',
                regionName: 'Karnataka',
                city: 'Bengaluru',
                zip: '560001',
                lat: 12.9716,
                lon: 77.5946,
                timezone: 'Asia/Kolkata',
                isp: 'Localhost',
                org: 'Localhost Development',
                as: 'AS0 Localhost',
                query: '127.0.0.1',
            });
        }

        const externalUrl = `http://ip-api.com/json/${encodeURIComponent(
            ip
        )}?fields=city,query,country,countryCode,timezone,region,regionName,zip,lat,lon,isp,org,as,status,message`;

        const response = await fetch(externalUrl, {
            // Cache lookup results for 24h per IP to avoid third-party API rate limits
            next: { revalidate: 86400 },
        });

        if (!response.ok) {
            return NextResponse.json(
                { status: 'fail', message: `Geo IP service responded with ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: unknown) {
        console.error('[API /api/location] Error:', error);
        return NextResponse.json(
            { status: 'fail', message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

