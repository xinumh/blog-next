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
import { PostType } from "@/types/post";

type NotionResult =
  | PageObjectResponse
  | PartialPageObjectResponse
  | PartialDatabaseObjectResponse
  | DatabaseObjectResponse
  | DatePropertyItemObjectResponse;

type NotionFilter =
  | {
      property: string;
      checkbox: { equals: boolean };
    }
  | {
      property: string;
      multi_select: { contains: string };
    };

export function parseNotionPosts(results: NotionResult[]): PostType[] {
  console.log("results", results);
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

      const tags =
        props.tags?.type === "multi_select"
          ? props.tags.multi_select ?? []
          : [];

      return {
        id: item.id,
        title,
        slug,
        date,
        published,
        summary,
        tags,
      };
    });
}

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

// lib/notion.ts
export async function getAllPosts(tag?: string) {
  const filters: NotionFilter[] = [
    {
      property: "published",
      checkbox: { equals: true },
    },
  ];

  if (tag) {
    filters.push({
      property: "tags",
      multi_select: {
        contains: tag,
      },
    });
  }

  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: filters.length === 1 ? filters[0] : { and: filters },
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

export async function getAllTags() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "published",
      checkbox: { equals: true },
    },
  });

  const tagsMap = new Map<string, PostType["tags"][0]>();

  for (const item of res.results as PageObjectResponse[]) {
    const tagProp = item.properties.tags;
    if (tagProp?.type === "multi_select") {
      tagProp.multi_select.forEach((t) => tagsMap.set(t.name, t));
    }
  }
  const tags = Array.from(tagsMap.values());
  return tags;
}

export async function getPostsByTag(tag: string) {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        {
          property: "published",
          checkbox: { equals: true },
        },
        {
          property: "tags",
          multi_select: {
            contains: tag,
          },
        },
      ],
    },
  });

  const posts = parseNotionPosts(res.results);
  return posts;
}
