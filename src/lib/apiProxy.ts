import { NextRequest } from 'next/server';
import { env } from './env';

export interface FetchOptions {
    request?: NextRequest;
    queryParams?: URLSearchParams;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: unknown;
    next?: RequestInit['next'];
    headers?: Record<string, string>;
    cache?: RequestCache;
    skipPurge?: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

/**
 * Extract subdomain safely for multi-tenant setups
 */
export function getSubdomain(request: NextRequest): string | null {
    const host = request.headers.get('host');
    if (!host) return null;

    const hostname = host.split(':')[0];

    if (
        hostname === 'localhost' ||
        hostname.startsWith('127.') ||
        hostname.startsWith('192.168.')
    ) {
        return null;
    }

    const parts = hostname.split('.');

    if (parts.length > 2) {
        if (parts[0] === 'www') return null;
        return parts[0];
    }

    return null;
}

/**
 * Extract real user IP safely when behind Cloudflare
 */
export function getRealClientIp(request: NextRequest): string {
    let ip =
        request.headers.get('cf-connecting-ip') ||
        request.headers.get('x-user-ip') ||
        request.headers.get('x-forwarded-for') ||
        '';

    if (ip && ip.includes(',')) {
        ip = ip.split(',')[0].trim();
    }

    return ip;
}

/**
 * MAIN FETCH PROXY
 */
export async function fetchFromBackend(
    endpoint: string,
    options?: FetchOptions
): Promise<Response> {
    const { request, queryParams, method = 'GET', body, next, cache } = options || {};

    let backendUrl = `${env.API_BASE_URL}/content${endpoint}`;
    if (queryParams && queryParams.toString()) {
        backendUrl += `?${queryParams.toString()}`;
    }

    const headers: Record<string, string> = {
        'x-api-key': env.API_KEY,
        'Content-Type': 'application/json',
    };

    /**
     * 🔐 REAL USER IP + TENANT DEBUG
     */
    if (request) {
        const clientIp = getRealClientIp(request);
        if (clientIp) headers['x-user-ip'] = clientIp;

        const country = request.headers.get('cf-ipcountry');
        if (country) headers['x-user-country'] = country;

        const subdomain = getSubdomain(request);
        if (subdomain) headers['X-Tenant-Subdomain'] = subdomain;

        // Add debug headers to help trace cache issues (dev only)
        if (process.env.NODE_ENV === 'development') {
            headers['x-cache-debug'] = '1';
        }
    }

    const isDev = process.env.NODE_ENV === 'development';
    const finalCache = isDev ? 'no-store' : (cache || (next ? undefined : 'force-cache'));
    const finalNext = isDev ? undefined : next;

    try {
        let response = await fetch(backendUrl, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            cache: finalCache,
            next: finalNext
        });

        if (response.status === 401) {
            headers['Authorization'] = `Bearer ${env.API_KEY}`;
            delete headers['x-api-key'];

            response = await fetch(backendUrl, {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined,
                cache: finalCache,
                next: finalNext
            });
        }

        /**
         * 🔎 CACHE STATUS DEBUG
         */
        const backendCacheStatus = response.headers.get('x-cache');
        const cfCacheStatus =
            response.headers.get('cf-cache-status') ||
            response.headers.get('x-vercel-cache');

        console.log(`[apiProxy] Endpoint: ${endpoint} | x-cache: ${backendCacheStatus} | CDN-cache: ${cfCacheStatus}`);
        // GET-request self-purging has been removed to prevent revalidation storms:
        // the backend's own cache expiring (x-cache: MISS) used to be treated as a
        // signal to purge our own edge cache, which just re-triggered the same MISS
        // on the next request forever. Cache invalidation is now driven exclusively
        // via POST to the /api/revalidate webhook.

        return response;
    } catch (error: unknown) {


        throw error;
    }
}

/**
 * Signals that the backend failed to answer — never that content is genuinely absent.
 */
export class UpstreamError extends Error {
    constructor(endpoint: string, readonly status: number) {
        super(`Upstream fetch failed for ${endpoint}: ${status}`);
        this.name = 'UpstreamError';
    }
}

/**
 * Decides whether a non-OK response means "this content is gone" or "the backend
 * is having a moment", for the fetches that drive a page's notFound() branch.
 */
export function isGone(response: Response, endpoint: string): boolean {
    if (response.ok) return false;
    if (response.status === 404 || response.status === 410) return true;
    throw new UpstreamError(endpoint, response.status);
}

/**
 * Utility — sanitize nested slug objects
 */
export function sanitizeSlugs<T>(data: T): T {
    if (!data) return data;

    const sanitizeValue = (val: unknown): unknown => {
        if (!isRecord(val)) return val;

        if (Array.isArray(val)) return val.map(sanitizeValue);

        const newObj: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(val)) {
            const currentValue = value;

            if (
                key === 'slug' ||
                key.endsWith('Slug') ||
                key === 'category_slug' ||
                key === 'url' ||
                key === 'href'
            ) {
                let current: unknown = currentValue;
                let depth = 0;

                while (isRecord(current) && depth < 5) {
                    if (current.slug) current = current.slug;
                    else if (current._id) {
                        current = current._id;
                        break;
                    } else {
                        const firstString = Object.values(current).find(
                            (entry): entry is string => typeof entry === 'string'
                        );
                        current = firstString || String(current);
                        break;
                    }
                    depth++;
                }

                newObj[key] = current;
            } else {
                newObj[key] = sanitizeValue(currentValue);
            }
        }
        return newObj;
    };

    return sanitizeValue(data) as T;
}

/**
 * API error helper
 */
export function getApiErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        const cause = error.cause as { code?: string } | undefined;
        if (cause?.code === 'ECONNREFUSED') return 'Backend connection refused';
    }
    return 'Internal Server Error';
}

