import PostList from "@/components/PostList";
import { getPostsByTag } from "@/utils/notion";
import Link from "next/link";

type Props = {
  params: Promise<{ tag: string }>;
};

export default async function TagDetailPage({ params }: Props) {
  const { tag } = await params;
  const posts = await getPostsByTag(decodeURIComponent(tag));

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="flex justify-between">
        <h1 className="font-bold text-xl mb-6">
          🔖 标签：{decodeURIComponent(tag)}
        </h1>
        <Link href="/tags" className="text-blue-600">
          查看全部标签
        </Link>
      </div>
      <PostList posts={posts} />
    </div>
  );
}
