import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  PartialDatabaseObjectResponse,
  DatabaseObjectResponse,
  DatePropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

type Post = {
  id: string;
  title: string;
  slug: string;
  date: string;
  published: boolean;
  summary?: string;
};

type NotionResult =
  | PageObjectResponse
  | PartialPageObjectResponse
  | PartialDatabaseObjectResponse
  | DatabaseObjectResponse
  | DatePropertyItemObjectResponse;

export function parseNotionPosts(results: NotionResult[]): Post[] {
  return results
    .filter((item): item is PageObjectResponse => "properties" in item)
    .map((item) => {
      const props = item.properties;

      const title =
        props.title?.type === "title"
          ? props.title.title[0]?.plain_text ?? "Untitled"
          : "Untitled";

      const slug =
        props.slug?.type === "rich_text"
          ? props.slug.rich_text[0]?.plain_text ?? item.id
          : item.id;

      const date =
        props.date?.type === "date" ? props.date?.date?.start ?? "" : "";

      const published =
        props.published?.type === "checkbox"
          ? props.published?.checkbox ?? false
          : false;

      const summary =
        props.summary?.type === "rich_text"
          ? props.summary.rich_text[0].plain_text
          : "";

      return {
        id: item.id,
        title,
        slug,
        date,
        published,
        summary,
      };
    });
}

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getAllPosts() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "published",
      checkbox: {
        equals: true, // ✅ 只获取 published 的
      },
    },
    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
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
        rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
      },
    },
  });

  return content; // content 是一个 React 组件，已包含组件映射
}
