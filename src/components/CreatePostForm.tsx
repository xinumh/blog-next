// src/components/create-post-form.tsx
"use client";

import { createPost } from "@/actions/posts/create";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function CreatePostForm() {
  const [state, formAction] = useActionState(createPost, {
    error: undefined,
    success: false,
  });
  const { pending } = useFormStatus();
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/posts"); // 创建成功后跳转
      router.refresh(); // 刷新页面数据
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="max-w-md mx-auto space-y-4 p-6 bg-white rounded-lg shadow-md"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          标题
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          minLength={3}
          disabled={pending}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          内容
        </label>
        <textarea
          id="content"
          name="content"
          required
          minLength={10}
          rows={6}
          disabled={pending}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {state?.error && (
        <p className="text-red-500 text-sm mt-2">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          pending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {pending ? "提交中..." : "创建文章"}
      </button>
    </form>
  );
}
