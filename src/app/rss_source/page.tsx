"use client";

import { apiRequest } from "@/utils/request";
import clsx from "clsx";
import { RefreshCcw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export type RssSourcesType = {
  id: number;
  name: string;
  url: string;
  description: string;
};

export default function RssSourcesPage() {
  const [data, setData] = useState<RssSourcesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncLoadingId, setSyncLoadingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const page = 1;
  const pageSize = 100;

  const fetchRssSync = async (row: RssSourcesType) => {
    const { url, id } = row;
    setSyncLoadingId(id);

    try {
      await apiRequest("/api/proxy?path=/api/rss_sources/rssSyncSingle", {
        url,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSyncLoadingId(null);
    }
  };

  const fetchRssDelete = async ({ id: sourceId }: RssSourcesType) => {
    setDeleteId(sourceId);
    await apiRequest("/api/proxy?path=/api/rss_sources/delete", {
      sourceId,
    }).finally(() => {
      setDeleteId(null);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await apiRequest<{
        page: number;
        pageSize: number;
        data: RssSourcesType[];
        total: number;
      }>("/api/proxy?path=/api/rss_sources/page", { page, pageSize });

      console.log("res=======", res);
      setData(res.data ?? []); // 确保 API 返回 { data: [...] }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <section className="flex mb-4 items-center justify-between border-b border-gray-400">
        <h1 className="text-xl font-bold ">RSS Sources</h1>
        <a className="text-blue-500 cursor-pointer" href="/rss_source/new">
          +新增
        </a>
      </section>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {data.map((item, index) => (
            <li
              key={index}
              className="p-3 border-b border-gray-300 flex justify-between"
            >
              <span>
                {item.name} – {item.description}
              </span>
              <span className="inline-flex">
                <RefreshCcw
                  size={18}
                  onClick={() => fetchRssSync(item)}
                  className={clsx(
                    "mr-1 cursor-pointer transition-transform text-blue-500",
                    syncLoadingId == item.id && "animate-spin"
                  )}
                />
                <Trash2
                  size={18}
                  className={clsx(
                    "text-red-500 cursor-pointer",
                    deleteId == item.id && "animate-spin"
                  )}
                  onClick={() => fetchRssDelete(item)}
                />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
