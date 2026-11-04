'use client';

import { useEffect } from 'react';
import { useIpLocation } from '@/hooks/useIpLocation';
import { captureAttribution } from '@/lib/utm';

/**
 * Headless client initializer mounted in RootLayout.
 * - Detects user's GeoIP location and caches it in localStorage.
 * - Captures marketing UTM / attribution parameters from URL & referrer.
 */
export default function GeoLocationInitializer() {
    useIpLocation();

    useEffect(() => {
        captureAttribution();
    }, []);

    return null;
}

