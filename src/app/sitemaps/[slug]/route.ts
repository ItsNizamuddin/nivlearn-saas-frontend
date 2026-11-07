import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/site';
import {
  generateSitemapXml,
  getBlogsSitemap,
  getCategoriesSitemap,
  getCoursesSitemap,
  getLocationsSitemap,
  getStaticPagesSitemap,
  SitemapEntry,
} from '@/lib/sitemapUtils';

export const revalidate = 3600; // Cache for 1 hour

export async function GET(
  _request: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const cleanSlug = slug.replace(/\.xml$/i, '').toLowerCase();

  let entries: SitemapEntry[] = [];

  switch (cleanSlug) {
    case 'pages':
      entries = getStaticPagesSitemap(SITE_URL);
      break;
    case 'categories':
      entries = await getCategoriesSitemap(SITE_URL);
      break;
    case 'courses':
      entries = await getCoursesSitemap(SITE_URL);
      break;
    case 'locations':
      entries = await getLocationsSitemap(SITE_URL);
      break;
    case 'blogs':
    case 'blog':
      entries = await getBlogsSitemap(SITE_URL);
      break;
    default:
      return new NextResponse('Sitemap not found', { status: 404 });
  }

  const xml = generateSitemapXml(entries);

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

