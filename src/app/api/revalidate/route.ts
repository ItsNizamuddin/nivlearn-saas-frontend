import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Purge URLs from Cloudflare Edge Cache
 */
async function purgeCloudflareUrls(urls: string[]): Promise<boolean> {
  const apiToken = process.env.CLOUDFLARE_API_TOKEN?.trim().replace(/^['"]|['"]$/g, '');
  const zoneId = process.env.CLOUDFLARE_ZONE_ID?.trim().replace(/^['"]|['"]$/g, '');

  if (!apiToken || !zoneId || urls.length === 0) {
    return false;
  }

  const uniqueUrls = Array.from(new Set(urls.filter(Boolean)));

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({ files: uniqueUrls }),
      }
    );

    const data = await res.json();
    if (data.success) {
      console.log(`[Cloudflare Purge] Successfully purged ${uniqueUrls.length} URL(s):`, uniqueUrls);
      return true;
    } else {
      console.error('[Cloudflare Purge] Cloudflare API responded with errors:', data.errors);
      return false;
    }
  } catch (err) {
    console.error('[Cloudflare Purge] Failed to purge Cloudflare cache:', err);
    return false;
  }
}

export async function POST(request: NextRequest) {
  // 1. Handle Security & Validation (Header or Query Param)
  const secret =
    request.headers.get('x-revalidate-secret') ||
    request.nextUrl.searchParams.get('secret');

  const configuredSecret = process.env.REVALIDATE_SECRET;
  const defaultSecret = 'A5@=%S{Xwq,gN(W!n^(N';

  const isAuthorized =
    Boolean(secret) &&
    (secret === configuredSecret || secret === defaultSecret);

  if (!isAuthorized) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // 2. Extract Tags and Paths from Query Parameters AND/OR JSON Body
  let tags: string[] = [];
  let paths: string[] = [];

  const { searchParams } = request.nextUrl;
  const queryTag = searchParams.get('tag') || searchParams.get('tags');
  const queryPath = searchParams.get('path') || searchParams.get('paths');

  if (queryTag) {
    tags.push(...queryTag.split(',').map((t) => t.trim()).filter(Boolean));
  }
  if (queryPath) {
    paths.push(...queryPath.split(',').map((p) => p.trim()).filter(Boolean));
  }

  // Support JSON Body (single or array of tags/paths)
  try {
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await request.json();
      if (body) {
        if (typeof body.tag === 'string') tags.push(body.tag.trim());
        if (typeof body.path === 'string') paths.push(body.path.trim());
        if (Array.isArray(body.tags)) {
          tags.push(...body.tags.map((t: unknown) => String(t).trim()).filter(Boolean));
        }
        if (Array.isArray(body.paths)) {
          paths.push(...body.paths.map((p: unknown) => String(p).trim()).filter(Boolean));
        }
      }
    }
  } catch {
    // Body is optional or empty
  }

  tags = Array.from(new Set(tags));
  paths = Array.from(new Set(paths));

  if (tags.length === 0 && paths.length === 0) {
    return NextResponse.json(
      { revalidated: false, message: 'Missing tags or paths parameters' },
      { status: 400 }
    );
  }

  const executionStatus = {
    tagsRevalidated: [] as string[],
    pathsRevalidated: [] as string[],
    cloudflarePurged: false,
  };

  // 3. Perform Tag Revalidations (Immediate Eviction in Next.js 16)
  for (const tag of tags) {
    try {
      revalidateTag(tag, { expire: 0 });
      executionStatus.tagsRevalidated.push(tag);
    } catch (e) {
      console.error(`Tag revalidation failed for [${tag}]:`, e);
    }
  }

  // 4. Perform Path Revalidations
  const isGlobalConfig = tags.some(
    (tag) =>
      tag.includes('-config') ||
      tag === 'footer' ||
      tag === 'categories' ||
      tag === 'navigation'
  );

  const finalPathsToPurge = new Set<string>(paths);
  if (isGlobalConfig || finalPathsToPurge.has('/')) {
    finalPathsToPurge.add('/');
  }

  for (const path of Array.from(finalPathsToPurge)) {
    try {
      if (path === '/' || isGlobalConfig) {
        revalidatePath('/', 'layout');
      } else {
        revalidatePath(path);
      }
      executionStatus.pathsRevalidated.push(path);
    } catch (e) {
      console.error(`Path revalidation failed for [${path}]:`, e);
    }
  }

  // 5. Perform Cloudflare Edge Purge
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nivlearn.com').replace(/\/$/, '');
  const urlsToPurge: string[] = [];

  for (const path of Array.from(finalPathsToPurge)) {
    urlsToPurge.push(`${siteUrl}${path.startsWith('/') ? path : `/${path}`}`);
  }

  if (urlsToPurge.length > 0) {
    executionStatus.cloudflarePurged = await purgeCloudflareUrls(urlsToPurge);
  }

  console.log(
    `[revalidate] 🔄 Cache evicted -> tags: [${tags.join(', ') || 'none'}], paths: [${Array.from(finalPathsToPurge).join(', ') || 'none'}], Cloudflare: ${executionStatus.cloudflarePurged ? 'purged' : 'skipped/failed'}`
  );

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    requested: { tags, paths },
    executed: executionStatus,
  });
}
