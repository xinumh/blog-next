"use client";

import { useEffect, useState } from "react";
import { RssSourcesType } from "../rss_source/page";

type RssEntriesType = {
  id: number;
  title: string;
  title_zh?: string;
  link: string;
  description: string;
};

export default function RssEntriesPage() {
  const [data, setData] = useState<RssEntriesType[]>([]);
  const [sources, setSources] = useState<RssSourcesType[]>([]);
  const [sourceId, setSourceId] = useState<number>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(total / pageSize);

  const fetchData = async (page: number, source: unknown) => {
    setLoading(true);
    try {
      const res = await fetch("/api/proxy?path=/api/rss_entries/page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page, pageSize, sourceId: source }),
      });

      const result = await res.json();
      setData(result.data?.data ?? []);
      setTotal(result.data?.total ?? 0);
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, sourceId); // 初始加载一次
  }, []);

  useEffect(() => {
    const fetchSourcesData = async () => {
      try {
        const res = await fetch("/api/proxy?path=/api/rss_sources/page", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page: 1, pageSize: 100 }),
        });

        const result = await res.json();
        console.log("result=======", result);
        setSources(result.data?.data); // 确保 API 返回 { data: [...] }
      } catch (error) {
        console.error("Request failed:", error);
        setSources([]);
      }
    };
    fetchSourcesData();
  }, []);

  const handlePrev = () => {
    const prevPage = Math.max(page - 1, 1);
    setPage(prevPage);
    fetchData(prevPage, sourceId);
  };
  const handleNext = () => {
    const nextPage = Math.max(page + 1, 1);
    setPage(nextPage);
    fetchData(nextPage, sourceId);
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSource = Number(e.target.value);
    console.log("newSource", newSource);
    setSourceId(newSource);
    setPage(1);
    fetchData(1, newSource); // 👈 主动请求
  };

  console.log("sourceId", sourceId);

  return (
    <>
      <section className=" flex mb-4 items-center justify-between">
        <h1 className="text-xl font-bold ">Short News</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <select
            id="rssSource"
            value={sourceId ?? ""}
            onChange={handleSourceChange}
            className="
              w-full sm:w-auto
              px-3 py-2
              text-sm sm:text-base
              border border-gray-300 rounded-lg
              shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all
              hover:border-gray-400
              cursor-pointer
            "
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

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="space-y-6">
            {data.map((entry) => (
              <div
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

                {entry.title_zh && (
                  <p className="text-gray-700 mt-1 text-sm">
                    🔹 {entry.title_zh}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6 items-center">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}
