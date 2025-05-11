import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

console.log("process.cwd()", process.cwd());

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  console.log("realSlug", realSlug);
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    slug: realSlug,
    meta: data,
    content,
  };
}

export async function getPostContent(slug: string) {
  const { content, ...rest } = getPostBySlug(slug);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  return {
    ...rest,
    contentHtml,
  };
}

export const getExcerpt = (content: string, length = 100) => {
  // 移除 Markdown 语法（如 ##、** 等）
  const plainText = content
    .replace(/[#*`\[\]]/g, "") // 移除部分 Markdown 符号
    .replace(/\s+/g, " ") // 合并多个空格
    .trim();

  return plainText.slice(0, length) + (plainText.length > length ? "..." : "");
};
