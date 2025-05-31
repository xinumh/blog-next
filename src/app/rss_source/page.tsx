"use client";

import ConfirmPopover from "@/components/ConfirmPopover";
import { RssSourcesType } from "@/types/rss";
import { apiRequest } from "@/utils/request";
import clsx from "clsx";
import { BetweenVerticalStart, ListRestart, Link2Off } from "lucide-react";
import { useEffect, useState } from "react";

export default function RssSourcesPage() {
  const [data, setData] = useState<RssSourcesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncLoadingId, setSyncLoadingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const page = 1;
  const pageSize = 100;

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

  useEffect(() => {
    fetchData();
  }, []);

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
    try {
      await apiRequest("/api/proxy?path=/api/rss_sources/delete", {
        sourceId,
      });
      fetchData();
    } catch (error) {
      console.log("error", error);
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <section className="flex mb-4 items-center ">
        <h1 className="text-xl font-bold ">rss sources</h1>
        <a className="text-blue-500 cursor-pointer" href="/rss_source/new">
          <BetweenVerticalStart size={18} className="mx-2" />
        </a>
      </section>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2 border-t border-gray-300">
          {data.map((item, index) => (
            <li
              key={index}
              className="py-3 border-b border-gray-300 flex justify-between"
            >
              <span>
                {item.name} – {item.description}
              </span>
              <span className="inline-flex">
                <ListRestart
                  size={18}
                  onClick={() => fetchRssSync(item)}
                  className={clsx(
                    "mr-1 cursor-pointer transition-transform text-blue-500",
                    syncLoadingId == item.id && "animate-spin"
                  )}
                />

                <ConfirmPopover
                  message="你确定要删除这条记录吗？"
                  onConfirm={() => fetchRssDelete(item)}
                >
                  <Link2Off
                    size={18}
                    className={clsx(
                      "text-red-500 cursor-pointer",
                      deleteId == item.id && "animate-spin"
                    )}
                  />
                </ConfirmPopover>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
