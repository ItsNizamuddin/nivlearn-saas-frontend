import { fetchFromBackend } from '@/lib/apiProxy';
import FooterClient from './FooterClient';
import FooterFallback from './FooterFallback';
import { FooterData } from './types';

export { FooterFallback };

/**
 * Server-Side Data Fetcher with ISR & Tag Revalidation
 * Revalidates automatically in the background every 3600s (1 hour),
 * or instantly on-demand when /api/revalidate?tag=footer is triggered.
 */
async function getFooterData(): Promise<FooterData> {
    try {
        const res = await fetchFromBackend('/footer', {
            next: { revalidate: 3600, tags: ['footer'] },
        });

        if (!res.ok) {
            console.error('[Footer] Failed to fetch footer data:', res.status);
            return {};
        }

        const data = await res.json();
        return (data || {}) as FooterData;
    } catch (error) {
        console.error('[Footer] Error fetching footer data:', error);
        return {};
    }
}

export default async function Footer() {
    const data = await getFooterData();
    return <FooterClient data={data} />;
}
