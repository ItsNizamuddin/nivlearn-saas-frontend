'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useIpLocation } from '@/hooks/useIpLocation';
import { viewerTimeZone } from '@/lib/scheduleTime';
import { currencyForCountry, FILTER_KEYS, SCHEDULE_PAGE_SIZE, type ScheduleList } from './types';

/**
 * Visitor's currency and timezone from their IP, once geolocation has settled.
 * No currency when the lookup failed: the server then uses the hosting edge's country header.
 */
export function useViewerLocale() {
  const { data: geo, loading } = useIpLocation();
  const currency = geo?.currency ?? currencyForCountry(geo?.countryCode) ?? '';
  // Undefined until geolocation settles (and always on the server).
  const timezone = loading ? undefined : viewerTimeZone(geo?.timezone);
  return { currency, timezone };
}

/** Schedules for a course (or all), following the filters in the URL. */
export function useSchedules(courseSlug?: string) {
  const searchParams = useSearchParams();
  const { currency, timezone } = useViewerLocale();
  const [result, setResult] = useState<{ query: string; list: ScheduleList | null; error: boolean } | null>(null);

  const params = new URLSearchParams({ limit: String(SCHEDULE_PAGE_SIZE) });
  if (courseSlug) params.set('slug', courseSlug);
  for (const key of [...FILTER_KEYS, 'page'] as const) {
    const value = searchParams.get(key);
    if (value) params.set(key, value);
  }
  if (currency) params.set('currency', currency);
  if (timezone) params.set('timezone', timezone);
  const query = timezone ? params.toString() : null;

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();
    fetch(`/api/schedules?${query}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Schedules failed: ${res.status}`);
        return res.json() as Promise<ScheduleList>;
      })
      .then((list) => setResult({ query, list, error: false }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error(error);
        setResult({ query, list: null, error: true });
      });
    return () => controller.abort();
  }, [query]);

  const current = result?.query === query ? result : null;
  return { list: current?.list ?? null, error: current?.error ?? false, loading: !current, currency, timezone };
}
