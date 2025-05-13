import { getPostBySlug, getPostSlugs } from "@/utils/posts";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  console.log("🚀 ~ PostPage ~ slug:", slug);

  const post = await getPostBySlug(slug);
  console.log("🚀 ~ PostPage ~ post:", post);
  if (!post) return notFound();
  const { content, frontmatter } = post;
  console.log("frontmatter", frontmatter);

  return (
    <article className="markdown prose prose-neutral dark:prose-invert mx-auto px-4">
      <h1>{frontmatter.title}</h1>
      <div className="text-sm leading-6 mt-4 flex items-center">
        {/* <Calendar className="text-gray-400 " size={18} /> */}
        <CalendarDays size={18} className="text-gray-400 -top-px" />
        <time className="pl-1" dateTime={frontmatter.date?.toString()}>
          {frontmatter.date}
        </time>
      </div>
      {frontmatter.heroImage && (
        <div className="relative not-prose my-[2em] first:mt-0 last:mb-0 rounded-2xl overflow-hidden">
          <Image
            width={800}
            height={200}
            src={frontmatter.heroImage}
            alt="hero_image"
          />
        </div>
      )}

      {content}
    </article>
  );
}
