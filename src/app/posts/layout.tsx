import Footer from "@/components/Footer";
import Navigation from "@/components/Header/Navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "我的笔记",
  description: "阅读｜生活｜好时光",
};

export default function PostListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navigation />
      <main className="min-h-screen max-w-3xl m-auto pt-16">{children}</main>
      <Footer />
    </div>
  );
}
