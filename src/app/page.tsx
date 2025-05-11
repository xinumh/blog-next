import Hero from "@/components/Hero";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center  transition-colors duration-300">
      <Hero />
    </main>
  );
}
