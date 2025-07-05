"use client";

import ConfirmPopover from "@/components/ConfirmPopover";
import { RssSourcesType } from "@/types/rss";
import { apiRequest } from "@/utils/request";
import Image from "next/image";
import clsx from "clsx";
import {
  BetweenVerticalStart,
  ListRestart,
  Link2Off,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function RssSourcesPage() {
  const [data, setData] = useState<RssSourcesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncLoadingId, setSyncLoadingId] = useState<number | null>(null);
  const [subscribeLoadingId, setSubscribeLoadingId] = useState<number | null>(
    null
  );
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
    }>("/api/proxy?path=/api/rss_sources/page_subscribe", { page, pageSize });

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

  const fetchSubscribe = async (row: RssSourcesType) => {
    const { id, isSubscribed } = row;
    setSubscribeLoadingId(id);

    try {
      await apiRequest(
        isSubscribed
          ? "/api/proxy?path=/api/subscriptions/unsubscribe"
          : "/api/proxy?path=/api/subscriptions/subscribe",
        {
          sourceId: id,
        }
      );
      await fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setSubscribeLoadingId(null);
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
                <Image src={item.icon} width={40} height={40} alt="icon" />
                {item.name} – {item.url}
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
                <Star
                  size={18}
                  onClick={() => fetchSubscribe(item)}
                  className={clsx(
                    "mr-1 cursor-pointer transition-transform text-blue-500",
                    subscribeLoadingId == item.id && "animate-spin",
                    item?.isSubscribed
                      ? "fill-yellow-400 text-yellow-500"
                      : "text-gray-400"
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
