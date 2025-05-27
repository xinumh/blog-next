import { NextRequest } from "next/server";

const TARGET_BASE_URL =
  process.env.TARGET_BASE_URL || "http://114.132.87.45:9004";

export async function POST(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "";
  const targetUrl = `${TARGET_BASE_URL}${path}`;
  console.log("Proxying to:", targetUrl);
  try {
    const body = await request.json();

    const headers = new Headers();
    request.headers.forEach((value, key) => {
      if (
        !["host", "content-length", "connection"].includes(key.toLowerCase())
      ) {
        headers.set(key, value);
      }
    });

    const res = await fetch(targetUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") || "application/json";
    const text = await res.text(); // 保证响应可打印

    return new Response(text, {
      status: res.status,
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
}
