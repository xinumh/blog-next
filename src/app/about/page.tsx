import { fetchAboutInfo } from "./actions";

export default async function AboutPage() {
  const aboutData = await fetchAboutInfo();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">About Us</h1>
      <p>This is the about page.</p>
      <p>{aboutData.content}</p>
    </div>
  );
}
