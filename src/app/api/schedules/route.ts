import { NextRequest, NextResponse } from 'next/server';
import { currencyForCountry, type ScheduleQuery } from '@/components/schedules/types';
import { fetchFromBackend } from '@/lib/apiProxy';
import { edgeCountry } from '@/lib/edgeGeo';
import { cleanQuery, getSchedules, scheduleParams } from '@/services/schedule.service';

/*
 * Schedules proxy.
 *   GET  ?slug&page&limit&currency&timezone&month&year&timings&deliveryType&batchType
 *        → cleaned, typed list ({ schedules, page, hasMore }) for /schedules pages.
 *   POST { same fields } → the raw CMS payload, for components that read the CMS
 *        shape directly (hooks/useSchedules → course BannerScheduleCards).
 * Both accept only known filters with valid values. Without a currency, the hosting
 * edge's country header picks one (from the visitor's IP).
 */

/** Fills a missing currency from the edge country; returns true when it did (response must not be shared). */
function applyEdgeCurrency(query: ScheduleQuery, request: NextRequest) {
  if (query.currency) return false;
  const currency = currencyForCountry(edgeCountry(request));
  if (currency) query.currency = currency;
  return !!currency;
}

export async function GET(request: NextRequest) {
  const query = cleanQuery(Object.fromEntries(request.nextUrl.searchParams));
  const fromEdge = applyEdgeCurrency(query, request);
  const list = await getSchedules(query);
  return NextResponse.json(list, {
    headers: {
      // A currency picked from request headers must not be shared through the CDN cache.
      'Cache-Control': fromEdge ? 'private, no-store' : 'public, s-maxage=120, stale-while-revalidate=600',
    },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const input =
    body && typeof body === 'object'
      ? Object.fromEntries(Object.entries(body as Record<string, unknown>).map(([k, v]) => [k, v == null ? undefined : String(v)]))
      : {};
  const query = cleanQuery(input);
  applyEdgeCurrency(query, request);

  try {
    const response = await fetchFromBackend('/schedules', { request, queryParams: scheduleParams(query), cache: 'no-store' });
    if (!response.ok) {
      return NextResponse.json({ error: `Backend responded with ${response.status}` }, { status: response.status });
    }
    return NextResponse.json(await response.json(), { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error: unknown) {
    console.error('API Proxy Error (Schedules List):', error);
    return NextResponse.json({ error: 'Could not load schedules' }, { status: 500 });
  }
}
