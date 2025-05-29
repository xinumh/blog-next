// app/api/image/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const src = req.nextUrl.searchParams.get("src");
  if (!src) return new NextResponse("Missing src", { status: 400 });

  const imageRes = await fetch(src);
  const buffer = await imageRes.arrayBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": imageRes.headers.get("Content-Type") || "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
