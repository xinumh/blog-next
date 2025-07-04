"use client";

import DigestPoster from "@/components/DigestPoster";
import { useRssDigestEntries } from "@/hooks/useRssDigestEntries";
import { useRssDigests } from "@/hooks/useRssDigests";
import { useDailyNews } from "@/hooks/useDailyNews";
import { useDailyNewsDetail } from "@/hooks/useDailyNewsDetail";
import { apiRequest } from "@/utils/request";
import { Rocket } from "lucide-react";
import { useState } from "react";
import SourceTag from "@/components/SourceTag";
import NewsListEditor from "@/components/NewsListEditor";

export default function DigestPage() {
  const [digestId, setDigestId] = useState<number>();
  const { digests, run: fetchDigests } = useRssDigests();
  const { news, run: fetchDailyNews } = useDailyNews();
  const { detail } = useDailyNewsDetail();

  const {
    data: { dateInfo, entries, digest },
  } = useRssDigestEntries(digestId);
  const handlCopyDigests = () => {
    const list = entries.map(
      (entry, index) => `${index + 1}.${entry.titleZh ?? entry.title}\n`
    );
    const listString = list.join("");

    const content = `${digest?.title}\n${dateInfo?.date}\n${dateInfo?.weekday}\n农历 ${dateInfo?.lunar}\n\n${listString}`;
    // console.log("content", content);
    navigator.clipboard.writeText(content);
  };

  const fetchDigestsPoster = async (digestId: number) => {
    try {
      const res = await apiRequest("/api/proxy?path=/api/rss_digests/poster", {
        digestId,
      });
      console.log("res", res);
    } catch (e) {
      console.error("rss_digests fetch error", e);
    }
  };

  const fetchGenerateDigest = async () => {
    try {
      return await apiRequest(
        "/api/proxy?path=/api/rss_digests/aigenerate",
        {}
      );
    } catch (e) {
      console.error("rss_digests fetch error", e);
    }
  };

  const fetchDailyNewsSync = async () => {
    try {
      return await apiRequest("/api/proxy?path=/api/daily_news/sync", {});
    } catch (e) {
      console.error("daily_news sync error", e);
    }
  };

  const handleRefreshHistory = async () => {
    // 1.生成今日简报
    // 2.查询最新历史记录
    await fetchGenerateDigest();
    await fetchDigests();
  };

  const handleRowClick = async (digestId: number) => {
    setDigestId(digestId);
  };

  const handleRefreshDailyNews = async () => {
    await fetchDailyNewsSync();
    await fetchDailyNews();
  };

  return (
    <div className="flex">
      <div className="w-32">
        <div className="flex items-center mb-4">
          <h1>历史简报</h1>
          <Rocket
            size={18}
            onClick={handleRefreshHistory}
            className="ml-5 text-blue-500 cursor-pointer"
          />
        </div>
        {digests.map((row) => (
          <p
            key={row.id}
            onClick={() => handleRowClick(row.id)}
            className="leading-8 text-blue-500 cursor-pointer"
          >
            {row.digestDate}
          </p>
        ))}
      </div>
      <div className="flex-1 max-w-xl">
        <div className="flex items-center mb-4">
          <h1>新闻列表</h1>
          <Rocket
            size={18}
            onClick={handleRefreshDailyNews}
            className="ml-5 text-blue-500 cursor-pointer"
          />
        </div>
        {news.map((item) => (
          <div key={item.id}>
            <SourceTag source={item.sourceId} /> -{item.title}
          </div>
        ))}
      </div>
      <div className="flex-1 max-w-xl">
        <div>
          <h2 className="">今日早报</h2>
        </div>
        <div className="news">
          <NewsListEditor />
        </div>
      </div>
      <div className="flex-1 max-w-xl">
        {digest?.id ? (
          <div className="">
            <DigestPoster data={detail} />
            <div className="m-4 text-center">
              <span
                className="bg-blue-500 w-20 rounded-md p-2 text-white"
                onClick={() => fetchDigestsPoster(digest.id)}
              >
                下载图片
              </span>
              <span
                className="bg-blue-500 w-20 rounded-md m-3 p-2 text-white"
                onClick={handlCopyDigests}
              >
                拷贝文字
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
