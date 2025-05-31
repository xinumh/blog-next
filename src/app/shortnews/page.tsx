"use client";

import Link from "next/link";
import { BookPlus } from "lucide-react";
import { useState } from "react";
import { usePaginatedRssEntries } from "@/hooks/usePaginatedRssEntries";
import { useRssSources } from "@/hooks/useRssSources";

export default function RssEntriesPage() {
  const [sourceId, setSourceId] = useState<number>();
  const { groupData, loading, hasMore, loaderRef, refetchFn } =
    usePaginatedRssEntries(sourceId);
  const { sources } = useRssSources();
  const handleSourceChange = (e: { target: { value: unknown } }) => {
    const value = Number(e.target.value);
    setSourceId(value);
    refetchFn(1, value);
  };

  return (
    <>
      <section className="flex mb-4 items-center justify-between">
        <h1 className="text-xl font-bold">Short News</h1>
        <div className="flex items-center gap-2">
          <Link href="/rss_source">
            <BookPlus className="text-blue-500 w-6" />
          </Link>

          <select
            value={sourceId ?? ""}
            onChange={handleSourceChange}
            className="px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">可选择 RSS 源</option>
            {sources.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <div className="space-y-6">
        {Array.from(groupData.entries()).map(([date, list]) => (
          <div key={date}>
            <h3>{date}</h3>
            <ul>
              {list.map((entry) => (
                <li
                  key={entry.id}
                  className="p-4 border-dashed rounded-md shadow-sm hover:bg-gray-50"
                >
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold text-lg hover:underline"
                  >
                    📌 {entry.title}
                  </a>
                  {entry.titleZh && (
                    <p className="text-gray-700 mt-1 text-sm">
                      🔹 {entry.titleZh}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div ref={loaderRef} className="py-4 text-center text-gray-500">
        {loading ? "加载中..." : hasMore ? "滑动加载更多" : "没有更多了"}
      </div>
    </>
  );
}
