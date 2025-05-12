"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PostCard({
  title,
  date,
  excerpt,
  slug,
}: {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}) {
  return (
    <motion.article whileHover={{ y: -5 }} className="p-6 mb-8 shadow-sm">
      <span className="text-sm">{date}</span>
      <h2 className="text-2xl font-serif mt-2 mb-4">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h2>
      <p className="opacity-90">{excerpt}</p>
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
}
