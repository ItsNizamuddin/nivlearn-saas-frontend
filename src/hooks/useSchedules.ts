'use client';

import { useState, useEffect, useRef } from 'react';
import type { ScheduleData, SchedulePagination } from '@/types/schedules';
import { useIpLocation } from './useIpLocation';

const COUNTRY_CURRENCY_MAP: Record<string, string> = {
  IN: 'INR',
  US: 'USD',
  GB: 'GBP',
  AE: 'AED',
  SG: 'SGD',
  AU: 'AUD',
  CA: 'CAD',
  EU: 'EUR',
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  NL: 'EUR',
};

export interface UseSchedulesOptions {
  limit?: number;
  page?: number;
  currency?: string;
  timezone?: string;
  deliveryType?: string;
  batchType?: string;
}

export function useSchedules(courseSlug: string, options: UseSchedulesOptions = {}) {
  const { limit = 2, page = 1, currency: customCurrency, timezone: customTimezone } = options;
  const { data: locationData, loading: locationLoading } = useIpLocation();

  const [schedules, setSchedules] = useState<ScheduleData[]>([]);
  const [pagination, setPagination] = useState<SchedulePagination | null>(null);
  const [loadingSchedules, setLoadingSchedules] = useState(true);

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (locationLoading && !locationData) return;
    if (!courseSlug) {
      setLoadingSchedules(false);
      return;
    }

    const fetchSchedules = async () => {
      if (schedules.length === 0 || !isFirstRun.current) {
        setLoadingSchedules(true);
      }
      isFirstRun.current = false;

      try {
        let detectedCurrency = 'USD';
        let detectedTimezone = 'Asia/Kolkata';

        if (locationData) {
          if (locationData.countryCode && COUNTRY_CURRENCY_MAP[locationData.countryCode]) {
            detectedCurrency = COUNTRY_CURRENCY_MAP[locationData.countryCode];
          }
          if (locationData.timezone) {
            detectedTimezone = locationData.timezone;
          }
        }

        const effectiveCurrency = customCurrency || detectedCurrency;
        const effectiveTimezone = customTimezone || detectedTimezone;

        const payload: Record<string, string> = {
          page: String(page),
          limit: String(limit),
          sort: 'startsAt',
          slug: courseSlug,
          currency: effectiveCurrency,
          timezone: effectiveTimezone,
        };

        if (options.deliveryType) payload.deliveryType = options.deliveryType;
        if (options.batchType) payload.batchType = options.batchType;

        const res = await fetch('/api/schedules', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const data = await res.json();
          setSchedules(data.schedules || []);
          if (data.pagination) {
            setPagination({
              total: data.pagination.total ?? (data.schedules?.length || 0),
              page: data.pagination.page ?? page,
              pages: data.pagination.pages ?? 1,
              limit: data.pagination.limit ?? limit,
              hasMore: data.pagination.hasMore ?? false,
              count: data.count,
            });
          }
        }
      } catch (err) {
        console.error('Error fetching schedules:', err);
      } finally {
        setLoadingSchedules(false);
      }
    };

    fetchSchedules();
  }, [
    courseSlug,
    locationLoading,
    locationData,
    limit,
    page,
    customCurrency,
    customTimezone,
    options.deliveryType,
    options.batchType,
  ]);

  return { schedules, loadingSchedules, pagination };
}

