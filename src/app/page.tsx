import Link from "next/link";
import { Link as LinkIcon, MailPlus, NotebookText } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center">
      <section className="m-auto text-center">
        <Link
          href="/shortnews"
          className="flex justify-between items-center bg-white"
        >
          <span className="flex-1 flex w-xs rounded-xs h-14  px-3 items-center">
            <MailPlus color="#8c4356" className="mr-3" />
            Short News
          </span>
          <LinkIcon className="w-8" color="#8c4356" />
        </Link>

        <Link
          href="/posts"
          className="flex justify-between items-center bg-white mt-4"
        >
          <span className="flex-1 flex w-xs rounded-xs h-14  px-3 items-center">
            <NotebookText color="#8c4356" className="mr-3" />
            Blogs
          </span>
          <LinkIcon className="w-8" color="#8c4356" />
        </Link>
      </section>
    </main>
  );
}
