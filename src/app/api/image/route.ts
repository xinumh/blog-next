// app/api/image/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const src = req.nextUrl.searchParams.get("src");
  if (!src) {
    return new NextResponse("Missing src", { status: 400 });
  }

  try {
    const imageRes = await fetch(src);

    if (!imageRes.ok) {
      return new NextResponse("Failed to fetch image", {
        status: imageRes.status,
      });
    }

    const buffer = await imageRes.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": imageRes.headers.get("Content-Type") || "image/jpeg",
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("Image proxy error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
