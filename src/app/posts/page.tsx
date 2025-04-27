// 显示所有文章
import { getPosts } from "@/actions/posts/get";
import { redirect } from "next/navigation";

export default async function PostsPage() {
  const posts = await getPosts();
  console.log("posts", posts);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">文章列表</h1>
      <a href="/posts/new">新建文章</a>
      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 mt-2">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
