// app/posts/[slug]/page.tsx
import { getAllPosts, getPostContent } from "@/utils/notion";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const posts = await getAllPosts();
  const current = posts.find((post) => post.slug === slug);

  if (!current) {
    return <div>Post not found</div>;
  }

  // const markdown = await getPostContent(current.id);
  const MDXContent = await getPostContent(current.id); // 这里变成了组件

  return (
    <div className="prose max-w-3xl px-4 mx-auto markdown">{MDXContent}</div>
  );
}
