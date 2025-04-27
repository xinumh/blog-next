"use server";

import { db } from "@/db/client";
import { posts } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState: any, formData: FormData) {
  try {
    const title = formData.get("title")?.toString().trim();
    const content = formData.get("content")?.toString().trim();

    // 验证输入
    if (!title || title.length < 3) {
      return { error: "标题至少需要3个字符" };
    }

    if (!content || content.length < 10) {
      return { error: "内容至少需要10个字符" };
    }

    // 插入数据库
    await db.insert(posts).values({
      title,
      content,
    });

    // 刷新缓存并重定向
    revalidatePath("/posts");
    return { success: true };
  } catch (error) {
    console.error("创建失败:", error);
    return {
      error: error instanceof Error ? error.message : "创建文章时出错",
    };
  }
}
