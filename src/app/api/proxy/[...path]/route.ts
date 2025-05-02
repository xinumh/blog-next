import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxyRequest(req, params);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxyRequest(req, params);
}

async function proxyRequest(req: NextRequest, params: { path: string[] }) {
  const targetPath = params.path.join("/");
  const targetUrl = `https://api.wonder.wang/api/${targetPath}`;

  const method = req.method;
  const headers = new Headers(req.headers);
  headers.delete("host"); // 可选：避免转发 host

  const body = ["GET", "HEAD"].includes(method) ? undefined : await req.body;

  const response = await fetch(targetUrl, {
    method,
    headers,
    body,
    redirect: "manual",
  });

  const responseBody = await response.arrayBuffer();

  const proxyResponse = new NextResponse(responseBody, {
    status: response.status,
    headers: response.headers,
  });

  return proxyResponse;
}
