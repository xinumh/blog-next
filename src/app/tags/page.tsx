import { getAllTags } from "@/utils/notion";
import PostTag from "@/components/PostTag";

export default async function TagsPage() {
  const tags = await getAllTags();
  console.log("tags", tags);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">📌 所有标签</h1>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <PostTag key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
}
