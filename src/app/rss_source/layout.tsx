import Footer from "@/components/Footer";
import Navigation from "@/components/Header/Navigation";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navigation />
      <main className="min-h-screen max-w-3xl m-auto pb-6 pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}
