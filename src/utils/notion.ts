import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  PartialDatabaseObjectResponse,
  DatabaseObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

type Post = {
  id: string;
  title: string;
  slug: string;
};

type NotionResult =
  | PageObjectResponse
  | PartialPageObjectResponse
  | PartialDatabaseObjectResponse
  | DatabaseObjectResponse;

export function parseNotionPosts(results: NotionResult[]): Post[] {
  return results
    .filter((item): item is PageObjectResponse => "properties" in item)
    .map((item) => {
      const props = item.properties;

      const title =
        props.Name?.type === "title"
          ? props.Name.title[0]?.plain_text ?? "Untitled"
          : "Untitled";

      const slug =
        props.Slug?.type === "rich_text"
          ? props.Slug.rich_text[0]?.plain_text ?? item.id
          : item.id;

      return {
        id: item.id,
        title,
        slug,
      };
    });
}

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getAllPosts() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  });

  const posts = parseNotionPosts(res.results);
  return posts;
}

export async function fetchMarkdownById(id: string) {
  const mdBlocks = await n2m.pageToMarkdown(id);
  const mdString = n2m.toMarkdownString(mdBlocks);
  return mdString.parent;
}

export async function getPostContent(postId: string) {
  const markdown = await fetchMarkdownById(postId); // 你自己的函数

  const { content } = await compileMDX({
    source: markdown,
    components: mdxComponents, // 💡 加上这里！
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm], // 启用 GFM 支持表格
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-dark",
              onVisitLine(node: { children: string | unknown[] }) {
                if (node.children.length === 0) {
                  node.children = [{ type: "text", value: " " }];
                }
              },
              onVisitHighlightedLine(node: {
                properties: { className: string[] };
              }) {
                node.properties.className?.push("line--highlighted");
              },
            },
          ],
        ],
      },
    },
  });

  return content; // content 是一个 React 组件，已包含组件映射
}
