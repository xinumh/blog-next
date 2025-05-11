// lib/mdx.ts
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { remarkCustomNotes } from "./remark-note-plugin";
import remarkDirective from "remark-directive";

export async function getPost(slug: string) {
  const filePath = path.join(
    process.cwd(),
    "posts",
    slug.endsWith(".mdx") ? slug : `${slug}.mdx` // 自动处理两种情况
  );
  console.log("filePath", filePath);
  const source = fs.readFileSync(filePath, "utf8");

  const { content, frontmatter } = await compileMDX({
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
}
