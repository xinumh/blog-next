// utils/request.ts

import { getCookie } from "./cookie";

export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  timestamp: number;
}

/**
 * 封装统一的 fetch 请求
 */
export async function apiRequest<T = unknown>(
  url: string,
  body: unknown,
  options?: RequestInit
): Promise<T> {
  const token = getCookie("token");

  const res = await fetch(url, {
    method: "POST", // 只需要 POST
    ...options,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const json: ApiResponse<T> = await res.json();
  console.log("json", json);
  // 如果未授权，重定向到登录页
  if (json.code === 401) {
    window.location.href = "/login";
    throw new Error("登录已过期，请重新登录");
  }

  if (json.code !== 0) {
    return {
      ...json,
      data: null,
    } as T;
  }

  return json.data;
}
