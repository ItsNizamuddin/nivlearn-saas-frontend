import type { NextRequest } from 'next/server';

/**
 * Visitor country set by the hosting edge (Cloudflare / Vercel) from the request IP.
 * Only platform headers are read (the platform overwrites them, so a client can't fake
 * them there). Cloudflare's XX (unknown) and T1 (Tor) are treated as no country.
 */
export function edgeCountry(request: NextRequest) {
  const code = (request.headers.get('cf-ipcountry') || request.headers.get('x-vercel-ip-country') || '').toUpperCase();
  return /^[A-Z]{2}$/.test(code) && code !== 'XX' && code !== 'T1' ? code : null;
}
