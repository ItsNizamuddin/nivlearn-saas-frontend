import { NextRequest, NextResponse } from 'next/server';
import { fetchFromBackend } from '@/lib/apiProxy';

export const dynamic = 'force-dynamic';

async function handleRequest(request: NextRequest, isPost: boolean) {
  try {
    let queryParams = new URLSearchParams();

    if (isPost) {
      try {
        const body = await request.json();
        for (const [key, value] of Object.entries(body)) {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        }
      } catch {
        queryParams = request.nextUrl.searchParams;
      }
    } else {
      queryParams = request.nextUrl.searchParams;
    }

    const response = await fetchFromBackend('/schedules', {
      request,
      queryParams,
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend responded with ${response.status}` },
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
    console.error('API Proxy Error (Schedules List):', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return handleRequest(request, false);
}

export async function POST(request: NextRequest) {
  return handleRequest(request, true);
}

