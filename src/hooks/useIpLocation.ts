'use client';

/*
 * Visitor location from their IP (country, timezone, currency).
 *
 * - One lookup per page: every component calling useIpLocation() shares a single
 *   lookup (module-level store + in-flight promise), instead of each one calling
 *   /api/location (and ipify) on its own.
 * - No server/browser mismatch: server render and first client render both start
 *   in `loading: true`; the saved location is read only after hydration
 *   (useSyncExternalStore with a fixed server snapshot).
 * - Timeouts and storage errors: each request gives up after a few seconds instead
 *   of hanging. If browser storage is blocked (private windows), the result is
 *   still kept in memory for the visit; it just isn't saved for the next one.
 * - Fast for returning visitors: a saved location younger than 24h is used at once
 *   (`loading: false`), so prices load without waiting for the network.
 * - Still re-checked on every page load, in the background: the IP can change (travel,
 *   VPN, mobile network). If the country, currency or timezone changed, `data` is
 *   replaced and pages refetch prices; if nothing changed, `data` keeps the same object,
 *   so nothing refetches.
 * - First visit (no saved location): `loading` stays true until the check answers.
 * - A failed check is retried on the next component mount (e.g. client navigation).
 * - Fires a `geolocation:updated` window event with the fresh location (LeadForm uses
 *   it to pick the phone dial code).
 */

import { useEffect, useSyncExternalStore } from 'react';

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
    /** Currency the CMS prices in for this country (set by /api/location). */
    currency?: string;
    /** Which lookup answered: edge headers, ip-api, ipwho.is, or the dev fallback. */
    source?: string;
    cachedAt?: number;
}

const CACHE_KEY = 'geoLocation';
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
        try {
            localStorage.removeItem(CACHE_KEY);
        } catch {
            // Storage unavailable
        }
    }
    return null;
}

/* ---------- shared store: one lookup per page load, however many components ask ---------- */

interface LocationState {
    data: IpLocationData | null;
    loading: boolean;
    error: string | null;
}

const SERVER_STATE: LocationState = { data: null, loading: true, error: null };
let state: LocationState | null = null;
let inflight: Promise<void> | null = null;
const listeners = new Set<() => void>();

/** The saved location, only while it is younger than CACHE_TTL_MS. */
function freshCache() {
    const stored = getCachedGeoLocation();
    return stored?.cachedAt && Date.now() - stored.cachedAt < CACHE_TTL_MS ? stored : null;
}

function getState(): LocationState {
    if (!state) {
        const cached = freshCache();
        state = { data: cached, loading: !cached, error: null };
    }
    return state;
}

const sameLocation = (a: IpLocationData | null, b: IpLocationData) =>
    !!a && a.countryCode === b.countryCode && a.currency === b.currency && a.timezone === b.timezone;

function setState(next: Partial<LocationState>) {
    state = { ...getState(), ...next };
    listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

/** On localhost the server only sees 127.0.0.1, so ask ipify for the real public IP. */
async function localPublicIp() {
    const host = window.location.hostname;
    if (host !== 'localhost' && host !== '127.0.0.1') return null;
    try {
        const res = await fetch('https://api64.ipify.org?format=json', { signal: AbortSignal.timeout(2500) });
        const data = res.ok ? await res.json() : null;
        return typeof data?.ip === 'string' ? data.ip : null;
    } catch {
        return null;
    }
}

async function lookup() {
    const cached = getState().data;

    try {
        const ip = await localPublicIp();
        const res = await fetch(ip ? `/api/location?ip=${encodeURIComponent(ip)}` : '/api/location', {
            signal: AbortSignal.timeout(5000),
        });
        if (!res.ok) throw new Error(`Location lookup failed (${res.status})`);
        const result: IpLocationData = await res.json();
        if (result.status !== 'success' || !result.countryCode) throw new Error('Location could not be resolved');

        const withTime = { ...result, cachedAt: Date.now() };
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(withTime));
        } catch {
            // Private mode / quota: keep it in memory only
        }
        // Same place as the saved location: keep the object so dependants don't refetch.
        setState({ data: sameLocation(cached, withTime) ? cached : withTime, loading: false, error: null });
        window.dispatchEvent(new CustomEvent('geolocation:updated', { detail: withTime }));
    } catch (err: unknown) {
        // Allow a retry on the next mount; keep any cached location, otherwise report the
        // failure (callers fall back to defaults).
        inflight = null;
        setState({ loading: false, error: cached ? null : err instanceof Error ? err.message : 'Location lookup failed' });
    }
}

/** Starts the lookup once per page load (again after a failure). */
export function ensureIpLocation() {
    inflight ??= lookup();
    return inflight;
}

/**
 * Visitor location from their IP (country, timezone, currency), cached for 24h.
 * Server render and first client render both see `loading: true`, so there is no hydration mismatch.
 */
export function useIpLocation() {
    const current = useSyncExternalStore(subscribe, getState, () => SERVER_STATE);
    useEffect(() => {
        void ensureIpLocation();
    }, []);
    return current;
}
