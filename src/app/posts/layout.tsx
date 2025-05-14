import Footer from "@/components/Footer";
import Navigation from "@/components/Header/Navigation";

export default function PostListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navigation />
      <main className="min-h-screen max-w-3xl m-auto">{children}</main>
      <Footer />
    </div>
  );
}
