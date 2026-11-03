import { fetchFromBackend, FetchOptions, UpstreamError, isGone, sanitizeSlugs, getApiErrorMessage } from './apiProxy';

export { fetchFromBackend, UpstreamError, isGone, sanitizeSlugs, getApiErrorMessage };
export type { FetchOptions };

/**
 * Convenience helper to fetch and parse JSON from the backend using fetchFromBackend.
 */
export async function fetchJsonFromBackend<T = unknown>(
  endpoint: string,
  options?: FetchOptions
): Promise<T> {
  const response = await fetchFromBackend(endpoint, options);

  if (!response.ok) {
    throw new UpstreamError(endpoint, response.status);
  }

  const data = await response.json();
  return sanitizeSlugs(data) as T;
}
