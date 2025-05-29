import { getAllPosts } from "@/utils/notion";
import Link from "next/link";

export default async function PostList() {
  const posts = await getAllPosts();
  console.log("posts", posts);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">📝 博客文章</h1>
      <ul className="space-y-2">
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Link
                href={`/posts/${post.slug}`}
                className="text-blue-600 hover:underline"
              >
                {post.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
