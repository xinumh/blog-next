"use client";

import { useEffect, useState } from "react";

type RssEntriesType = {
  id: number;
  title: string;
  title_zh?: string;
  link: string;
  description: string;
};

export default function RssEntriesPage() {
  const [data, setData] = useState<RssEntriesType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("/api/rss_entries/page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page, pageSize }),
      });

      const result = await res.json();
      console.log("result=======", result);
      setData(result.data?.data ?? []); // 确保 API 返回 { data: [...] }
      setTotal(result.data?.total ?? 0);
      setLoading(false);
    };

    fetchData();
  }, [page]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="max-w-2xl mx-auto p-4">
      <section className="flex mb-4 items-center justify-between">
        <h1 className="text-xl font-bold ">RSS Entries</h1>
      </section>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="space-y-6">
            {data.map((entry) => (
              <div
                key={entry.id}
                className="p-4 border rounded-md shadow-sm hover:bg-gray-50"
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
    </div>
  );
}
