"use server";
// use server 表示这是一个 Server Action。

export async function fetchAboutInfo() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/proxy/about`
  );
  if (!res.ok) throw new Error("Failed to fetch About data");

  const data = await res.json();
  return data;
}
