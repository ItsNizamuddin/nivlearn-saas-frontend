import { fetchFromBackend } from '@/lib/apiProxy';
import { SITE_URL } from '@/lib/site';

export interface SitemapEntry {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface SitemapIndexEntry {
  url: string;
  lastmod?: string;
}

/**
 * Escape XML special characters in URLs and text
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Format any date value into valid ISO 8601 string for XML sitemaps
 */
function formatDate(date?: string | Date): string {
  if (!date) return new Date().toISOString().split('T')[0];
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
    return d.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

/**
 * Serialize a list of leaf URLs into standard <urlset> XML
 */
export function generateSitemapXml(entries: SitemapEntry[]): string {
  const urlsXml = entries
    .map((entry) => {
      const loc = `<loc>${escapeXml(entry.url)}</loc>`;
      const lastmod = entry.lastModified
        ? `<lastmod>${formatDate(entry.lastModified)}</lastmod>`
        : '';
      const changefreq = entry.changeFrequency
        ? `<changefreq>${entry.changeFrequency}</changefreq>`
        : '';
      const priority =
        typeof entry.priority === 'number'
          ? `<priority>${entry.priority.toFixed(1)}</priority>`
          : '';

      return `  <url>\n    ${loc}${lastmod ? `\n    ${lastmod}` : ''}${
        changefreq ? `\n    ${changefreq}` : ''
      }${priority ? `\n    ${priority}` : ''}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlsXml}\n</urlset>`;
}

/**
 * Serialize sub-sitemaps into root <sitemapindex> XML
 */
export function generateSitemapIndexXml(sitemaps: SitemapIndexEntry[]): string {
  const sitemapsXml = sitemaps
    .map((s) => {
      const loc = `<loc>${escapeXml(s.url)}</loc>`;
      const lastmod = s.lastmod ? `\n    <lastmod>${formatDate(s.lastmod)}</lastmod>` : '';
      return `  <sitemap>\n    ${loc}${lastmod}\n  </sitemap>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapsXml}\n</sitemapindex>`;
}

/**
 * 1. Static Core Pages
 */
export function getStaticPagesSitemap(baseUrl: string = SITE_URL): SitemapEntry[] {
  const today = new Date().toISOString().split('T')[0];
  return [
    { url: `${baseUrl}`, lastModified: today, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about-us`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact-us`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/corporate`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/hire-from-us`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/accreditations`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/become-an-instructor`, lastModified: today, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/become-a-guest-author`, lastModified: today, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: today, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/privacy-policy`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/refund-policy`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/grievance-redressal-policy`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
  ];
}

/**
 * 2. Category Pages (/trainings, /bootcamps, etc.)
 */
export async function getCategoriesSitemap(baseUrl: string = SITE_URL): Promise<SitemapEntry[]> {
  try {
    const res = await fetchFromBackend('/sitemap?select=category', {
      next: { revalidate: 3600, tags: ['categories', 'sitemap'] },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const categories: Array<{ slug: string; name?: string; updatedAt?: string }> =
      json?.data || [];

    return categories
      .filter((c) => Boolean(c.slug))
      .map((cat) => ({
        url: `${baseUrl}/${cat.slug}`,
        lastModified: cat.updatedAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      }));
  } catch (error) {
    console.error('[sitemapUtils] Error fetching categories sitemap:', error);
    return [];
  }
}

/**
 * 3. Course Primary Pages (e.g. /trainings/digital-marketing-course)
 */
export async function getCoursesSitemap(baseUrl: string = SITE_URL): Promise<SitemapEntry[]> {
  try {
    // 1. Fetch all category slugs
    const catRes = await fetchFromBackend('/sitemap?select=category', {
      next: { revalidate: 3600, tags: ['categories', 'sitemap'] },
    });
    if (!catRes.ok) return [];
    const catJson = await catRes.json();
    const categories: Array<{ slug: string }> = catJson?.data || [];

    // 2. Fetch courses for each category in parallel
    const coursePromises = categories.map(async (cat) => {
      try {
        const res = await fetchFromBackend(`/sitemap?select=courses&category=${cat.slug}`, {
          next: { revalidate: 3600, tags: ['courses', 'sitemap'] },
        });
        if (!res.ok) return [];
        const json = await res.json();
        return Array.isArray(json?.data) ? json.data : [];
      } catch {
        return [];
      }
    });

    const nestedCourses = await Promise.all(coursePromises);
    const courses = nestedCourses.flat();

    const seenUrls = new Set<string>();
    const entries: SitemapEntry[] = [];

    for (const c of courses) {
      const catSlug = c.category_slug || 'trainings';
      const courseSlug = c.course_slug || c.slug;
      if (!courseSlug) continue;

      const url = `${baseUrl}/${catSlug}/${courseSlug}`;
      if (seenUrls.has(url)) continue;
      seenUrls.add(url);

      entries.push({
        url,
        lastModified: c.updated_at || c.updatedAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }

    return entries;
  } catch (error) {
    console.error('[sitemapUtils] Error fetching courses sitemap:', error);
    return [];
  }
}

/**
 * 4. Course Location-specific Pages (e.g. /trainings/digital-marketing-course/bangalore)
 */
export async function getLocationsSitemap(baseUrl: string = SITE_URL): Promise<SitemapEntry[]> {
  try {
    // Fetch courses first to query their location slugs
    const catRes = await fetchFromBackend('/sitemap?select=category', {
      next: { revalidate: 3600, tags: ['categories', 'sitemap'] },
    });
    if (!catRes.ok) return [];
    const catJson = await catRes.json();
    const categories: Array<{ slug: string }> = catJson?.data || [];

    const coursePromises = categories.map(async (cat) => {
      try {
        const res = await fetchFromBackend(`/sitemap?select=courses&category=${cat.slug}`, {
          next: { revalidate: 3600, tags: ['courses', 'sitemap'] },
        });
        if (!res.ok) return [];
        const json = await res.json();
        return Array.isArray(json?.data) ? json.data : [];
      } catch {
        return [];
      }
    });

    const nestedCourses = await Promise.all(coursePromises);
    const courses = nestedCourses.flat();

    // Query location URLs per course in parallel
    const locationPromises = courses.map(async (c) => {
      const courseSlug = c.course_slug || c.slug;
      if (!courseSlug) return [];
      try {
        const res = await fetchFromBackend(`/sitemap?select=location&course=${courseSlug}`, {
          next: { revalidate: 3600, tags: ['courses', 'sitemap'] },
        });
        if (!res.ok) return [];
        const json = await res.json();
        return Array.isArray(json?.data) ? json.data : [];
      } catch {
        return [];
      }
    });

    const nestedLocations = await Promise.all(locationPromises);
    const locations = nestedLocations.flat();

    const seenUrls = new Set<string>();
    const entries: SitemapEntry[] = [];

    for (const loc of locations) {
      const catSlug = loc.category_slug || 'trainings';
      // location_slug from backend is either "course-slug/city" or "city"
      const locationPart = loc.location_slug || '';
      if (!locationPart) continue;

      let fullPath = '';
      if (locationPart.includes('/')) {
        fullPath = `${catSlug}/${locationPart}`;
      } else {
        const cSlug = loc.course_slug || '';
        fullPath = `${catSlug}/${cSlug}/${locationPart}`;
      }

      const url = `${baseUrl}/${fullPath}`;
      if (seenUrls.has(url)) continue;
      seenUrls.add(url);

      entries.push({
        url,
        lastModified: loc.updated_at || loc.updatedAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }

    return entries;
  } catch (error) {
    console.error('[sitemapUtils] Error fetching locations sitemap:', error);
    return [];
  }
}

/**
 * 5. Blog Articles Sitemap (/blog/[slug])
 */
export async function getBlogsSitemap(baseUrl: string = SITE_URL): Promise<SitemapEntry[]> {
  try {
    const res = await fetchFromBackend('/sitemap?select=blog', {
      next: { revalidate: 3600, tags: ['blogs', 'sitemap'] },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const blogs: Array<{ slug: string; updated_at?: string; updatedAt?: string }> =
      json?.data || [];

    return blogs
      .filter((b) => Boolean(b.slug))
      .map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: blog.updated_at || blog.updatedAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
  } catch (error) {
    console.error('[sitemapUtils] Error fetching blogs sitemap:', error);
    return [];
  }
}

