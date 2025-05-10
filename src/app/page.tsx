import { getPostSlugs, getPostBySlug } from "@/utils/posts";
import Link from "next/link";

export default function HomePage() {
  const slugs = getPostSlugs();
  const posts = slugs.map(getPostBySlug);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-4">
            <Link href={`/posts/${post.slug}`}>
              <span className="text-lg text-blue-600 hover:underline">
                {post.meta.title}
              </span>
              <div className="text-sm text-gray-500">{post.meta.date}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
