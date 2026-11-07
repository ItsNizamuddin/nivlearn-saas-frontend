import { fetchFromBackend } from '@/lib/apiProxy';
import { FooterData } from '@/components/Footer/types';

export interface Ribbon {
  _id: string;
  name: string;
  RibbonContent: string;
  isActive: boolean;
  Type: 'header' | 'footer';
  Position: 'Sticky' | 'Static' | string;
}

export interface RibbonResponse {
  data: Ribbon[];
}

/**
 * Fetch dynamic promotional / announcement ribbons from CMS.
 * Revalidates every 3600s (1h) or on-demand via webhook tag 'ribbons'.
 */
export async function getRibbons(): Promise<RibbonResponse | null> {
  try {
    const res = await fetchFromBackend('/ribbons?active=true', {
      next: { revalidate: 3600, tags: ['ribbons'] },
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error('[content.service] Error fetching ribbons:', error);
    return null;
  }
}

/**
 * Fetch dynamic footer data from CMS.
 * Revalidates every 3600s (1h) or on-demand via webhook tag 'footer'.
 */
export async function getFooterData(): Promise<FooterData> {
  try {
    const res = await fetchFromBackend('/footer', {
      next: { revalidate: 3600, tags: ['footer'] },
    });

    if (!res.ok) {
      console.error('[content.service] Failed to fetch footer data:', res.status);
      return {};
    }

    const data = await res.json();
    return (data || {}) as FooterData;
  } catch (error) {
    console.error('[content.service] Error fetching footer data:', error);
    return {};
  }
}

