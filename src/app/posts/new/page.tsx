// 创建新文章页面
import { CreatePostForm } from "@/components/create-post-form";

export default function NewPostPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">创建新文章</h1>
      <CreatePostForm />
    </div>
  );
}
