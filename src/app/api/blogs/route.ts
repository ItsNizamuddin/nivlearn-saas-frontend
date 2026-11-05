import { NextRequest, NextResponse } from 'next/server';
import { getBlogs } from '@/services/blog.service';
import { BLOG_PAGE_SIZE } from '@/components/blog/types';

/** Blog list for the client-side explorer (category tabs + "Load more"). */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number.parseInt(searchParams.get('page') ?? '1', 10) || 1);
  const limit = Math.min(Math.max(1, Number.parseInt(searchParams.get('limit') ?? '', 10) || BLOG_PAGE_SIZE), 24);
  const category = searchParams.get('category')?.slice(0, 100) || undefined;

  const list = await getBlogs({ category, page, limit });
  return NextResponse.json(list, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' },
  });
}
