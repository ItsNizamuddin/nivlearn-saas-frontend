import { NextRequest, NextResponse } from 'next/server';
import { fetchFromBackend } from '@/lib/apiProxy';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const queryParams = request.nextUrl.searchParams;

    const response = await fetchFromBackend('/lms-programs', {
      request,
      queryParams,
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend responded with ${response.status}`, data: [] },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error: unknown) {
    console.error('[API Proxy] Error fetching LMS programs:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error', data: [] },
      { status: 500 }
    );
  }
}

