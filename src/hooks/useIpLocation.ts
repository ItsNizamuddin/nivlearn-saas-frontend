'use client';

import { useState, useEffect } from 'react';

export interface IpLocationData {
    status: string;
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
    cachedAt?: number;
}

const CACHE_KEY = 'geoLocation';
const SESSION_CHECK_KEY = 'geoLocation_session_verified';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function getCachedGeoLocation(): IpLocationData | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed && parsed.status === 'success' && parsed.countryCode) {
            return parsed;
        }
    } catch {
        localStorage.removeItem(CACHE_KEY);
    }
    return null;
}

export function useIpLocation(ip?: string | null) {
    const [data, setData] = useState<IpLocationData | null>(() => getCachedGeoLocation());
    const [loading, setLoading] = useState<boolean>(() => !getCachedGeoLocation());
    const [error, setError] = useState<string | null>(null);

    // Sync state when another hook or background worker updates geolocation
    useEffect(() => {
        const handleUpdate = (e: Event) => {
            const detail = (e as CustomEvent<IpLocationData>).detail;
            if (detail) {
                setData(detail);
            }
        };

        window.addEventListener('geolocation:updated', handleUpdate);
        return () => window.removeEventListener('geolocation:updated', handleUpdate);
    }, []);

    useEffect(() => {
        let isMounted = true;

        const checkLocation = async () => {
            const cached = getCachedGeoLocation();
            const now = Date.now();
            const isFresh = cached?.cachedAt && now - cached.cachedAt < CACHE_TTL_MS;

            let sessionVerified = false;
            try {
                sessionVerified = Boolean(sessionStorage.getItem(SESSION_CHECK_KEY));
            } catch {
                // Ignore storage access errors
            }

            // If we have valid cache, no custom IP was requested, and this session was already verified within 24h:
            // Serve cached data immediately without any network call.
            if (cached && !ip && isFresh && sessionVerified) {
                if (isMounted) {
                    setData(cached);
                    setLoading(false);
                }
                return;
            }

            // If we have cached data, make UI usable immediately while verifying drift in background
            if (cached && !ip) {
                if (isMounted) {
                    setData(cached);
                    setLoading(false);
                }
            } else if (isMounted) {
                setLoading(true);
            }

            try {
                let targetIp = ip;

                // When testing locally without explicit IP, probe ipify to test real public IP
                if (!targetIp && typeof window !== 'undefined') {
                    const isLocal =
                        window.location.hostname === 'localhost' ||
                        window.location.hostname === '127.0.0.1';

                    if (isLocal) {
                        try {
                            const ipRes = await fetch('https://api64.ipify.org?format=json', {
                                signal: AbortSignal.timeout(2500),
                            });
                            if (ipRes.ok) {
                                const ipData = await ipRes.json();
                                if (ipData.ip) {
                                    targetIp = ipData.ip;
                                }
                            }
                        } catch {
                            // Fallback to server detection
                        }
                    }
                }

                const url = targetIp
                    ? `/api/location?ip=${encodeURIComponent(targetIp)}`
                    : '/api/location';

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Location lookup failed (${response.status})`);
                }

                const freshResult: IpLocationData = await response.json();

                if (freshResult.status === 'success' && isMounted) {
                    const resultWithTime: IpLocationData = {
                        ...freshResult,
                        cachedAt: now,
                    };

                    const ipChanged = cached?.query !== freshResult.query;
                    const countryChanged = cached?.countryCode !== freshResult.countryCode;

                    // Update localStorage & session marker
                    try {
                        localStorage.setItem(CACHE_KEY, JSON.stringify(resultWithTime));
                        sessionStorage.setItem(SESSION_CHECK_KEY, '1');
                    } catch {
                        // Ignore quota/private mode errors
                    }

                    // Only trigger state updates/events if data actually changed or initial load
                    if (!cached || ipChanged || countryChanged) {
                        setData(resultWithTime);
                        window.dispatchEvent(
                            new CustomEvent('geolocation:updated', { detail: resultWithTime })
                        );
                    }
                } else if (!cached && isMounted) {
                    setError('Failed to resolve location');
                }
            } catch (err: unknown) {
                if (!cached && isMounted) {
                    const message =
                        err instanceof Error ? err.message : 'An unexpected error occurred';
                    setError(message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        void checkLocation();

        return () => {
            isMounted = false;
        };
    }, [ip]);

    return { data, loading, error };
}
