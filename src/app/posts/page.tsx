import { getAllPosts } from "@/utils/notion";
import Link from "next/link";

export default async function PostList() {
  const posts = await getAllPosts();
  console.log("posts", posts);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold mb-8">📚 所有文章</h1>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>
              <div className="group">
                <h2 className="text-xl font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(post.date).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {post.summary && (
                  <p className="text-gray-700 mt-2">{post.summary}</p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
