'use client';

import { useState, useEffect, useRef } from 'react';
import type { ScheduleData, SchedulePagination } from '@/types/schedules';
import { currencyForCountry } from '@/components/schedules/types';
import { viewerTimeZone } from '@/lib/scheduleTime';
import { useIpLocation } from './useIpLocation';


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
    // Wait for a location (saved or fresh); a changed country refetches via locationData.
    if (locationLoading) return;
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
        // Currency from the visitor's IP (empty → the API route uses the edge country, then USD).
        const detectedCurrency = locationData?.currency ?? currencyForCountry(locationData?.countryCode) ?? '';
        const detectedTimezone = viewerTimeZone(locationData?.timezone);

        const effectiveCurrency = customCurrency || detectedCurrency;
        const effectiveTimezone = customTimezone || detectedTimezone;

        const payload: Record<string, string> = {
          page: String(page),
          limit: String(limit),
          sort: 'startsAt',
          slug: courseSlug,
          currency: effectiveCurrency,
          timezone: effectiveTimezone,
          select:
            '_id,code,status,batchType,deliveryType,isFlexibleSchedule,startsAt,endsAt,commenceDate,commencedAt,commencedDate,commencementDate,commence_date,duration,totalSessions,country,filteredPricing,enableRecommend,pricingTemplateId',
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

