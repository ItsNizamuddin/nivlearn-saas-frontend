'use client';

import { useState, useEffect, useRef } from 'react';
import type { LMSClass, LMSProgram } from '@/types/lms';
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

export function useLmsOffers(courseSlug: string) {
  const { data: locationData, loading: locationLoading } = useIpLocation();

  const [classes, setClasses] = useState<LMSClass[]>([]);
  const [programs, setPrograms] = useState<LMSProgram[]>([]);
  const [loading, setLoading] = useState(true);

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (locationLoading && !locationData) return;
    if (!courseSlug) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchOffers = async () => {
      if (classes.length === 0 && programs.length === 0 || !isFirstRun.current) {
        setLoading(true);
      }
      isFirstRun.current = false;

      try {
        let detectedCurrency = 'USD';
        if (locationData?.countryCode && COUNTRY_CURRENCY_MAP[locationData.countryCode]) {
          detectedCurrency = COUNTRY_CURRENCY_MAP[locationData.countryCode];
        }

        const query = new URLSearchParams({
          course: courseSlug,
          currency: detectedCurrency,
          limit: '6',
          status: 'open',
        });

        const [classesRes, programsRes] = await Promise.all([
          fetch(`/api/lms/classes?${query.toString()}`).then((r) => (r.ok ? r.json() : null)),
          fetch(`/api/lms/programs?${query.toString()}`).then((r) => (r.ok ? r.json() : null)),
        ]);

        if (!isMounted) return;

        const classesList: LMSClass[] = Array.isArray(classesRes?.data)
          ? classesRes.data
          : Array.isArray(classesRes)
          ? classesRes
          : [];

        const programsList: LMSProgram[] = Array.isArray(programsRes?.data)
          ? programsRes.data
          : Array.isArray(programsRes)
          ? programsRes
          : [];

        setClasses(classesList);
        setPrograms(programsList);
      } catch (err) {
        console.error('[useLmsOffers] Error fetching LMS cohorts/programs:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOffers();

    return () => {
      isMounted = false;
    };
  }, [courseSlug, locationData, locationLoading]);

  return { classes, programs, loading };
}

