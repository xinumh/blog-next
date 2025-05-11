"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 主标题 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl font-serif tracking-wider mb-4">
          山长水阔
        </h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-[2px] bg-[#C53D2B] mx-auto my-6"
        />
        <p className="text-2xl md:text-3xl font-sans mt-6">我自缓行</p>
      </motion.div>
    </section>
  );
}
