import Footer from "@/components/Footer";
import Navigation from "@/components/Header/Navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Short News",
  description: "Read less & Read more. Less is more.",
};

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen max-w-3xl m-auto pt-20 px-3 container-paper">
        {children}
      </main>
      <Footer />
    </>
  );
}
