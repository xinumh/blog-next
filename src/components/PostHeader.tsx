import { PostType } from "@/types/post";
import React from "react";
import PostTag from "./PostTag";

type Props = {
  post: PostType;
};

export const tagColorMap: Record<string, string> = {
  default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white",
  gray: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white",
  brown: "bg-amber-200 text-amber-900 dark:bg-amber-600 dark:text-white",
  orange: "bg-orange-200 text-orange-800 dark:bg-orange-500 dark:text-white",
  yellow: "bg-yellow-200 text-yellow-800 dark:bg-yellow-500 dark:text-white",
  green: "bg-green-200 text-green-800 dark:bg-green-500 dark:text-white",
  blue: "bg-blue-200 text-blue-800 dark:bg-blue-500 dark:text-white",
  purple: "bg-purple-200 text-purple-800 dark:bg-purple-500 dark:text-white",
  pink: "bg-pink-200 text-pink-800 dark:bg-pink-500 dark:text-white",
  red: "bg-red-200 text-red-800 dark:bg-red-500 dark:text-white",
};

const PostHeader = ({ post }: Props) => {
  return (
    <header>
      <h1>{post.title}</h1>
      <time dateTime={post.date} className="text-sm flex">
        {post.date}
      </time>
      <ul className="tags flex my-2">
        {post.tags.map((tag) => (
          <PostTag tag={tag} key={tag.id} className="px-1.5 py-0" />
        ))}
      </ul>
    </header>
  );
};

export default PostHeader;
