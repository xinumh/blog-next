"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RssSourcesType } from "../rss_source/page";
import { groupByDate, mergeGroupedRecords } from "@/utils/groupnews";
import { BookPlus } from "lucide-react";
import Link from "next/link";
import { apiRequest } from "@/utils/request";

export type RssEntriesType = {
  id: number;
  title: string;
  titleZh?: string;
  link: string;
  description: string;
  createdAt: string;
  pubDate: string;
};

export default function RssEntriesPage() {
  const [groupData, setGroupData] = useState<Map<string, RssEntriesType[]>>(
    new Map()
  );
  const [sources, setSources] = useState<RssSourcesType[]>([]);
  const [sourceId, setSourceId] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [page, setPage] = useState(1);
  const pageSize = 20;

  const fetchData = useCallback(
    async (page: number, source: unknown) => {
      setLoading(true);
      try {
        const result = await apiRequest<{
          page: number;
          pageSize: number;
          data: RssEntriesType[];
          total: number;
        }>("/api/proxy?path=/api/rss_entries/page", {
          page,
          pageSize,
          sourceId: source,
        });

        const resData = result.data ?? [];
        const group =
          page === 1
            ? groupByDate(resData)
            : mergeGroupedRecords(groupData, resData);
        setGroupData(group);
        setHasMore(page * pageSize < result?.total);
      } catch (error) {
        console.error("Request failed:", error);
      } finally {
        setLoading(false);
      }
    },
    [groupData]
  );

  useEffect(() => {
    const init = () => {
      fetchData(page, sourceId);
    };
    init();
  }, []);

  // 使用 IntersectionObserver 检测“加载更多”触底
  useEffect(() => {
    if (!loaderRef.current || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const nextPage = Math.max(page + 1, 1);
          setPage(nextPage);
          fetchData(nextPage, sourceId);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [fetchData, hasMore, loading, page, sourceId]);

  useEffect(() => {
    const fetchSourcesData = async () => {
      try {
        const result = await apiRequest<{
          page: number;
          pageSize: number;
          data: RssSourcesType[];
          total: number;
        }>("/api/proxy?path=/api/rss_sources/page", {
          body: JSON.stringify({ page: 1, pageSize: 100 }),
        });

        console.log("result=======", result);
        setSources(result?.data || []); // 确保 API 返回 { data: [...] }
      } catch (error) {
        console.error("Request failed:", error);
        setSources([]);
      }
    };
    fetchSourcesData();
  }, []);

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSource = Number(e.target.value);
    console.log("newSource", newSource);
    setSourceId(newSource);
    setPage(1);
    fetchData(1, newSource); // 👈 主动请求
  };

  return (
    <>
      <section className=" flex mb-4 items-center justify-between">
        <h1 className="text-xl font-bold ">Short News</h1>
        <div className="flex flex-row items-center gap-2">
          <Link href="/rss_source">
            <BookPlus className="text-blue-500 w-6" />
          </Link>

          <select
            id="rssSource"
            value={sourceId ?? ""}
            onChange={handleSourceChange}
            className="
              w-auto
              px-3 py-2
              text-sm sm:text-base
              border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all
              hover:border-gray-400
              cursor-pointer
            "
          >
            <option value="">可选择 RSS 源</option>
            {sources?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <div className="space-y-6">
        {groupData &&
          Array.from(groupData.entries()).map(([date, list]) => (
            <div key={date}>
              <h3>{date}</h3>
              <ul>
                {list.map((entry: RssEntriesType) => (
                  <li
                    key={entry.id}
                    className="p-4 border-dashed rounded-md shadow-sm hover:bg-gray-50"
                  >
                    <a
                      href={entry.link || "#"}
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
