"use client";

import { useEffect, useState } from "react";

type RssSourcesType = {
  name: string;
  url: string;
  description: string;
};

export default function RssSourcesPage() {
  const [data, setData] = useState<RssSourcesType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("/api/proxy?path=/api/rss_sources/page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page, pageSize }),
      });

      const result = await res.json();
      console.log("result=======", result);
      setData(result.data?.data); // 确保 API 返回 { data: [...] }
      setTotal(result.data?.total);
      setLoading(false);
    };

    fetchData();
  }, [page]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="max-w-2xl mx-auto p-4">
      <section className="flex mb-4 items-center justify-between">
        <h1 className="text-xl font-bold ">RSS Sources</h1>
        <a className="text-blue-500 cursor-pointer" href="/rss_source/new">
          +新增
        </a>
      </section>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="space-y-2">
            {data.map((item, index) => (
              <li key={index} className="p-3 border rounded">
                {item.name} – {item.description}
              </li>
            ))}
          </ul>

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
