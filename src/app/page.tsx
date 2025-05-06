import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header className="text-center py-6 shadow">
        <h1 className="text-3xl font-bold">👋 Hi, I&apos;m Ashin</h1>
        <p className="text-gray-600">Full-stack Developer | Blogger</p>
      </header>

      <section className="flex flex-col items-center text-center py-12">
        <Image
          src="/man.jpg"
          width={300}
          height={300}
          alt="Avatar"
          className="w-32 h-32 rounded-full border mb-4"
        />
        <p className="max-w-xl text-lg">
          Passionate about clean code, web technologies, and building side
          projects that solve real problems.
        </p>
        <div className="flex gap-4 mt-4">
          <a
            href="https://github.com/xinumh"
            target="_blank"
            className="underline text-blue-500"
          >
            GitHub
          </a>
          <a
            href="mailto:ashinshiwo@gmail.com"
            className="underline text-blue-500"
          >
            Email
          </a>
        </div>
      </section>

      <section className="px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border rounded p-4">
            <h3 className="font-bold">MyBlog</h3>
            <p>A minimalist blog platform built with Next.js and SQLite.</p>
            <a href="#" className="text-blue-500 underline">
              View Project →
            </a>
          </div>
          <div className="border rounded p-4">
            <h3 className="font-bold">RSS Parser</h3>
            <p>
              A simple tool to aggregate RSS feeds and auto-translate titles.
            </p>
            <a href="/rss_entries" className="text-blue-500 underline">
              View Project →
            </a>
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 py-6">
        © {new Date().getFullYear()} Ashin. All rights reserved.
      </footer>
    </main>
  );
}
