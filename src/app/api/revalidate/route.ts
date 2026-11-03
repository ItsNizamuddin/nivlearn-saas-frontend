import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get("x-revalidate-secret") ||
                   request.nextUrl.searchParams.get("secret");

    if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
    }

    const path = request.nextUrl.searchParams.get("path");
    const tag = request.nextUrl.searchParams.get("tag");

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path, now: Date.now() });
    }

    if (tag) {
      revalidateTag(tag, "max");
      return NextResponse.json({ revalidated: true, tag, now: Date.now() });
    }

    return NextResponse.json(
      { message: "Missing path or tag parameter" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating", error: (error as Error).message },
      { status: 500 }
    );
  }
}

