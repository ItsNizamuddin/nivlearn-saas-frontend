import { NextRequest, NextResponse } from 'next/server';
import { fetchFromBackend } from '@/lib/apiProxy';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const queryParams = request.nextUrl.searchParams;

    const response = await fetchFromBackend('/ribbons', {
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
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error: unknown) {
    console.error('API Proxy Error (Ribbons):', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error', data: [] },
      { status: 500 }
    );
  }
}

