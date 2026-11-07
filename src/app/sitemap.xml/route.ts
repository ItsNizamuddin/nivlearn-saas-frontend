import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/site';
import { generateSitemapIndexXml, SitemapIndexEntry } from '@/lib/sitemapUtils';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const today = new Date().toISOString().split('T')[0];

  const subSitemaps: SitemapIndexEntry[] = [
    { url: `${SITE_URL}/sitemaps/pages.xml`, lastmod: today },
    { url: `${SITE_URL}/sitemaps/categories.xml`, lastmod: today },
    { url: `${SITE_URL}/sitemaps/courses.xml`, lastmod: today },
    { url: `${SITE_URL}/sitemaps/locations.xml`, lastmod: today },
    { url: `${SITE_URL}/sitemaps/blogs.xml`, lastmod: today },
  ];

  const xml = generateSitemapIndexXml(subSitemaps);

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

