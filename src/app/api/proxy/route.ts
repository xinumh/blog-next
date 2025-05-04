import { NextRequest } from "next/server";

// 环境变量配置的目标URL
const TARGET_BASE_URL =
  process.env.TARGET_BASE_URL || "http://114.132.87.45:9004";

export async function POST(request: NextRequest) {
  // 从请求中获取路径和查询参数
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get("path") || "";
  const targetUrl = `${TARGET_BASE_URL}${path}`;
  console.log("targetUrl", targetUrl);

  try {
    // 获取原始请求的headers并过滤掉不需要的headers
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      // 过滤掉Next.js特定的headers和host
      if (
        !["host", "content-length", "connection"].includes(key.toLowerCase())
      ) {
        headers.set(key, value);
      }
    });

    // 获取原始请求体
    let body;
    const contentType = request.headers.get("content-type");

    if (contentType?.includes("multipart/form-data")) {
      // 处理FormData
      const formData = await request.formData();
      body = formData;
    } else if (contentType?.includes("application/json")) {
      // 处理JSON
      body = await request.json();
    } else {
      // 处理原始文本
      body = await request.text();
    }

    // 发起代理请求
    const response = await fetch(targetUrl, {
      method: "POST",
      headers,
      body: body instanceof FormData ? body : JSON.stringify(body),
      cache: "no-store",
    });

    // 处理响应
    const responseContentType = response.headers.get("content-type") || "";

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Proxy error: ${response.status} - ${errorText}`);
      return new Response(
        JSON.stringify({
          success: false,
          status: response.status,
          message: "Failed to fetch from target",
          error: errorText,
        }),
        { status: response.status }
      );
    }

    // 根据内容类型返回响应
    if (responseContentType.includes("application/json")) {
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          // 传递原始响应头（可选）
          ...Object.fromEntries(response.headers),
        },
      });
    } else {
      const text = await response.text();
      return new Response(text, {
        status: 200,
        headers: {
          "Content-Type": responseContentType || "text/plain",
          ...Object.fromEntries(response.headers),
        },
      });
    }
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
