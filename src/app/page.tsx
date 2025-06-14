"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-6 py-12">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* 左侧：文字 + 按钮 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            欢迎来到我的网站 👋
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            点击下面的入口，探索最新的短讯（Short News）或深度博客（My Blog）。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/shortnews"
              className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition"
            >
              📌 Short News
            </Link>
            <Link
              href="/posts"
              className="px-6 py-3 bg-gray-800 text-white rounded-full shadow hover:bg-gray-900 transition"
            >
              ✍️ My Blog
            </Link>
          </div>
        </motion.div>

        {/* 右侧：插画 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <Image
            src="/hero1.svg"
            alt="Hero Illustration"
            width={450}
            height={450}
            className="object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
}
