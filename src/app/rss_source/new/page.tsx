"use client";
import { getErrorMessage } from "@/utils/error";
import { apiRequest } from "@/utils/request";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RssPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const name = formData.get("name"); // 获取 input[name="name"] 的值
    const description = formData.get("description");
    const url = formData.get("url");
    try {
      await apiRequest("/api/proxy?path=/api/rss_sources/create", {
        name,
        url,
        description,
      });

      router.push("/rss_source"); // 跳转到某个页面
    } catch (err) {
      setError(getErrorMessage(err));
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4 p-6  rounded-lg shadow-md"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            名称
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            minLength={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            RSS 链接
          </label>
          <input
            type="text"
            id="url"
            name="url"
            required
            minLength={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            描述
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${"bg-blue-600 hover:bg-blue-700"}`}
        >
          添加 RSS {loading && <span>中...</span>}
        </button>
        {error && <p style={{ color: "red" }}>❌ {error}</p>}
      </form>
    </div>
  );
}
