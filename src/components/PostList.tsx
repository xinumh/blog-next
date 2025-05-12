import { getExcerpt, getPostBySlug, getPostSlugs } from "@/utils/posts";
import React from "react";
import BlogCard from "@/components/PostCard";

const PostList = () => {
  const slugs = getPostSlugs();
  const posts = slugs.map(getPostBySlug);
  return (
    <ul>
      {posts.map((post) => (
        <BlogCard
          title={post.meta.title}
          date={post.meta.date}
          excerpt={getExcerpt(post.content)}
          key={post.slug}
          {...post}
        />
      ))}
    </ul>
  );
};

export default PostList;
