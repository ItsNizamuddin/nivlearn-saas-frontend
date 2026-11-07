import { NextRequest, NextResponse } from 'next/server';
import { currencyForCountry } from '@/components/schedules/types';
import { getRealClientIp } from '@/lib/apiProxy';
import { edgeCountry } from '@/lib/edgeGeo';
import { checkRateLimit } from '@/lib/rateLimit';

/*
 * Visitor location from their IP.
 *
 * Lookup order:
 *   1. Cloudflare's or Vercel's own visitor-country headers. No outside service
 *      is called, so there's no limit.
 *   2. ip-api.com (free tier: HTTP only, ~45 lookups/min per server IP).
 *   3. ipwho.is (HTTPS) as a backup when ip-api is down or over its limit.
 * `?ip=` (sent by the browser on localhost) skips the edge headers; it is honoured
 * in development only.
 *
 * - IP address: same lookup as the rest of the app (getRealClientIp), so rate limits
 *   and the payment API see one consistent IP.
 * - Currency included: the reply carries the currency the CMS prices in for that
 *   country (e.g. "currency": "INR") and which method answered (`source`).
 *   The schedules page uses that currency directly.
 * - Dev-only fallback: the hard-coded Bengaluru location is only used in
 *   development. On the live site an unknown location reports failure instead of
 *   pretending to be India, and prices fall back to the backend's USD.
 */

interface Location {
    status: 'success';
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip?: string;
    lat?: number;
    lon?: number;
    timezone?: string;
    isp?: string;
    org?: string;
    as?: string;
    query: string;
    currency?: string;
    source: string;
}

const NO_STORE = { 'Cache-Control': 'private, no-store' };
const IPV4 = /^(\d{1,3}\.){3}\d{1,3}$/;
const IPV6 = /^[0-9a-f:]+$/i;

const countryName = (code: string) => {
    try {
        return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) ?? code;
    } catch {
        return code;
    }
};

const decode = (value: string | null) => {
    if (!value) return '';
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
};

const num = (value: unknown) => {
    const n = typeof value === 'string' ? Number(value) : value;
    return typeof n === 'number' && Number.isFinite(n) ? n : undefined;
};

function isPrivate(ip: string) {
    return (
        !ip ||
        ip === '::1' ||
        ip.startsWith('127.') ||
        ip.startsWith('::ffff:127.') ||
        ip.startsWith('10.') ||
        ip.startsWith('192.168.') ||
        /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ||
        /^f[cd][0-9a-f]{2}:/i.test(ip)
    );
}

function fromEdge(request: NextRequest, ip: string): Location | null {
    const h = request.headers;
    const code = edgeCountry(request);
    if (!code) return null;
    return {
        status: 'success',
        country: countryName(code),
        countryCode: code,
        region: h.get('cf-region-code') || h.get('x-vercel-ip-country-region') || '',
        regionName: decode(h.get('cf-region')),
        city: decode(h.get('cf-ipcity') || h.get('x-vercel-ip-city')),
        zip: h.get('cf-postal-code') || h.get('x-vercel-ip-postal-code') || undefined,
        lat: num(h.get('cf-iplatitude') || h.get('x-vercel-ip-latitude')),
        lon: num(h.get('cf-iplongitude') || h.get('x-vercel-ip-longitude')),
        timezone: h.get('cf-timezone') || h.get('x-vercel-ip-timezone') || undefined,
        query: ip,
        source: 'edge',
    };
}

async function fromIpApi(ip: string): Promise<Location | null> {
    const fields = 'status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query';
    const res = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=${fields}`, {
        signal: AbortSignal.timeout(3000),
        next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.status === 'success' && data.countryCode ? { ...data, status: 'success', source: 'ip-api' } : null;
}

async function fromIpWho(ip: string): Promise<Location | null> {
    const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
        signal: AbortSignal.timeout(3000),
        next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const d = await res.json();
    if (!d?.success || !d.country_code) return null;
    return {
        status: 'success',
        country: d.country ?? countryName(d.country_code),
        countryCode: d.country_code,
        region: d.region_code ?? '',
        regionName: d.region ?? '',
        city: d.city ?? '',
        zip: d.postal || undefined,
        lat: num(d.latitude),
        lon: num(d.longitude),
        timezone: d.timezone?.id,
        isp: d.connection?.isp,
        org: d.connection?.org,
        as: d.connection?.asn ? `AS${d.connection.asn}` : undefined,
        query: d.ip ?? ip,
        source: 'ipwho.is',
    };
}

const DEV_FALLBACK: Location = {
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
    source: 'dev-fallback',
};

const respond = (location: Location) =>
    NextResponse.json({ ...location, currency: currencyForCountry(location.countryCode) }, { headers: NO_STORE });

export async function GET(request: NextRequest) {
    const requesterIp = getRealClientIp(request);
    if (!checkRateLimit(`location-lookup:${requesterIp || 'unknown'}`, 30, 60_000)) {
        return NextResponse.json({ status: 'fail', message: 'Too many requests' }, { status: 429, headers: NO_STORE });
    }

    // `?ip=` is a localhost aid only; on the live site it would let anyone look up any IP.
    const param = process.env.NODE_ENV === 'development' ? request.nextUrl.searchParams.get('ip')?.trim() ?? '' : '';
    const requested = IPV4.test(param) || IPV6.test(param) ? param : '';
    const ip = requested || requesterIp;

    if (!requested) {
        const edge = fromEdge(request, ip);
        if (edge) return respond(edge);
    }

    if (isPrivate(ip)) {
        // Local development without a public IP.
        return process.env.NODE_ENV === 'development'
            ? respond(DEV_FALLBACK)
            : NextResponse.json({ status: 'fail', message: 'Location unavailable' }, { status: 404, headers: NO_STORE });
    }

    for (const provider of [fromIpApi, fromIpWho]) {
        try {
            const location = await provider(ip);
            if (location) return respond(location);
        } catch (error) {
            console.warn(`[api/location] ${provider.name} failed:`, error instanceof Error ? error.message : error);
        }
    }

    return NextResponse.json({ status: 'fail', message: 'Location could not be resolved' }, { status: 502, headers: NO_STORE });
}
