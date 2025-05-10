"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "@/utils/cookie";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/proxy?path=/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("data", data);

    if (!res.ok) {
      setError(data.error || "登录失败");
    } else {
      setCookie(data.data.token);
      router.push("/"); // 登录后跳转
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h1 className="text-2xl font-bold mb-4">登录</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border px-3 py-2 rounded"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <Link
            href="/forgot_password"
            className="hover:underline text-blue-600"
          >
            忘记密码？
          </Link>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          登录
        </button>
      </form>
    </main>
  );
}
