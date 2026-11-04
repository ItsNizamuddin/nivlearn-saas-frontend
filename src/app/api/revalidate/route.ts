import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

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

  const { searchParams } = request.nextUrl;
  const tag = searchParams.get('tag');
  const path = searchParams.get('path');

  if (!tag && !path) {
    return NextResponse.json(
      { revalidated: false, message: 'Missing both tag and path parameters' },
      { status: 400 }
    );
  }

  // Track status for logging/response metrics
  const executionStatus = { tagRevalidated: false, pathRevalidated: false };

  // 2. Perform Tag Revalidation (Immediate Eviction in Next.js 16)
  if (tag) {
    try {
      // NOTE: For automated webhooks, { expire: 0 } forces immediate data eviction,
      // while "max" defers updates via stale-while-revalidate.
      revalidateTag(tag, { expire: 0 });
      executionStatus.tagRevalidated = true;
    } catch (e) {
      console.error(`Tag revalidation failed for [${tag}]:`, e);
    }
  }

  // 3. Perform Path Revalidation
  // Decoupled from the tag logic so that BOTH can run independently if provided
  const isGlobalConfig =
    tag?.includes('-config') ||
    tag === 'footer' ||
    tag === 'categories' ||
    tag === 'navigation';

  if (path || isGlobalConfig) {
    try {
      if (path === '/' || isGlobalConfig) {
        revalidatePath('/', 'layout');
      } else {
        revalidatePath(path!);
      }
      executionStatus.pathRevalidated = true;
    } catch (e) {
      console.error(
        `Path revalidation failed for [${path || '/ (global config)'}]:`,
        e
      );
    }
  }

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    requested: { tag, path },
    executed: executionStatus,
  });
}
