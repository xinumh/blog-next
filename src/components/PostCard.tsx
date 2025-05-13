"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ReactElement } from "react";

const PostCard = ({
  slug,
  frontmatter,
}: {
  slug: string;
  content: ReactElement;
  frontmatter: { date: string; title: string };
}) => {
  return (
    <motion.article whileHover={{ y: -5 }} className="p-6 mb-8 shadow-sm">
      <span className="text-sm">{frontmatter.date}</span>
      <h2 className="text-2xl font-serif mt-2 mb-4">{frontmatter.title}</h2>
      <div className="mt-4 flex justify-end">
        <Link
          href={`/posts/${slug}`}
          className="hover:underline flex items-center"
        >
          阅读全文 →
        </Link>
      </div>
    </motion.article>
  );
};

export default PostCard;
