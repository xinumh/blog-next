// app/posts/[slug]/page.tsx
import { getAllPosts, getPostContent } from "@/utils/notion";
import { Metadata } from "next";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const posts = await getAllPosts();
  const currentPost = posts.find((post) => post.slug === slug);

  return {
    title: currentPost?.title,
    description: currentPost?.summary ?? "desacsscscs",
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = await getAllPosts();
  const current = posts.find((post) => post.slug === slug);

  if (!current) {
    return <div>Post not found</div>;
  }

  const MDXContent = await getPostContent(current.id); // 这里变成了组件

  return (
    <div className="prose prose-neutral max-w-3xl px-4 mx-auto markdown">
      {MDXContent}
    </div>
  );
}
