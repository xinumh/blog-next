import { getPost } from "@/utils/mdx";
import { getPostContent, getPostSlugs } from "@/utils/posts";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostContent(slug);
  const { content } = await getPost(slug);

  if (!post) return notFound();

  return (
    <article className="markdown prose prose-neutral dark:prose-invert mx-auto py-10 px-4">
      <h1>{post.meta.title}</h1>
      <p className="text-sm">{post.meta.date}</p>
      {content}
    </article>
  );
}
