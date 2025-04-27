// Server Actions
"use server";
import { db } from "@/db/client";
import { posts } from "@/db/schema";

// 获取所有文章
export async function getPosts() {
  try {
    return await db.select().from(posts).all();
  } catch (error) {
    console.error("Database query failed:", error);
    // throw new Error("Failed to fetch posts.");
    return [];
  }
}
