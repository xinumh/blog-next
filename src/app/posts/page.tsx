import { getPostBySlug, getPostSlugs } from "@/utils/posts";
import React from "react";
import PostCard from "@/components/PostCard";

const PostList = async () => {
  const slugs = getPostSlugs();
  console.log("🚀 ~ PostList ~ slugs:", slugs);
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  return (
    <div className="bg-[var(--background)] min-h-screen py-6">
      {posts.map((post, idx) => {
        if (!post) return null;
        const slug = slugs[idx];
        return (
          <PostCard
            key={slug}
            slug={slug}
            content={post.content}
            frontmatter={post.frontmatter}
          />
        );
      })}
    </div>
  );
};

export default PostList;
