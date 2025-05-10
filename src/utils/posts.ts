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
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
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
