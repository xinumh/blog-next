import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx";
import remarkDirective from "remark-directive";
import { remarkCustomNotes } from "./remark-note-plugin";

console.log("process.cwd()", process.cwd());

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(
    postsDirectory,
    slug.endsWith(".mdx") ? slug : `${slug}.mdx` // 自动处理两种情况
  );
  if (!fs.existsSync(fullPath)) {
    console.warn(`Post not found: ${realSlug}`);
    return null; // 或者 undefined，取决于你的需求
  }
  try {
    const source = fs.readFileSync(fullPath, "utf8");
    const { content, frontmatter } = await compileMDX<{
      heroImage: string;
      date: string;
      title: string;
    }>({
      source,
      components: mdxComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkDirective, remarkCustomNotes],
          rehypePlugins: [],
        },
      },
    });
    return { content, frontmatter };
  } catch (error) {
    console.error(`Error reading post ${realSlug}:`, error);
    return null;
  }
}

export const getExcerpt = (content: string, length = 100) => {
  // 移除 Markdown 语法（如 ##、** 等）
  const plainText = content
    .replace(/[#*`\[\]]/g, "") // 移除部分 Markdown 符号
    .replace(/\s+/g, " ") // 合并多个空格
    .trim();

  return plainText.slice(0, length) + (plainText.length > length ? "..." : "");
};
