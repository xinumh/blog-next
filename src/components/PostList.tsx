import { PostType } from "@/types/post";
import Link from "next/link";
import React from "react";

type Props = {
  posts: PostType[];
};

const PostList = ({ posts }: Props) => {
  return (
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
  );
};

export default PostList;
