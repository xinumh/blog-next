"use client";

import DigestPoster from "@/components/DigestPoster";
import NewsListEditor from "@/components/NewsListEditor";
import { useDailyNews } from "@/hooks/useDailyNews";
import {
  useDailyNewsDetail,
  useDailyNewsList,
} from "@/hooks/useDailyNewsDetail";
import clsx from "clsx";
import { Copy } from "lucide-react";
import SourceTag from "@/components/SourceTag";

export default function DailyNewsEditPage() {
  const { detail, run: fetchDetail } = useDailyNewsDetail();
  const { data: dailyList } = useDailyNewsList();
  const {
    news,
    loading: dailyNewsLoading,
    run: fetchAllDailyNews,
  } = useDailyNews();

  const handleCopy = (title: string) => {
    navigator.clipboard.writeText(title);
  };

  console.log("data", dailyList);
  const handleDateChange = (date: string) => {
    fetchDetail(date);
    fetchAllDailyNews(date);
  };
  return (
    <div className="flex">
      <div className="w-30">
        <h2 className="font-bold">历史早报</h2>
        {dailyList.map((item) => (
          <p
            key={item.date}
            onClick={() => handleDateChange(item.date)}
            className="leading-8 text-blue-600 cursor-pointer"
          >
            {item.date}
          </p>
        ))}
      </div>
      <div className="w-[500px]">
        <h2 className="font-bold">早报预览</h2>
        {detail.date && <DigestPoster data={detail} />}
      </div>

      <div className="flex-1 max-w-xl">
        <div className="flex items-center align-middle">
          <h2 className="font-bold mr-3">新闻列表</h2>
          <button
            onClick={() => fetchAllDailyNews()}
            className={clsx(
              "mr-1 cursor-pointer transition-transform text-blue-500",
              dailyNewsLoading && "animate-spin"
            )}
            disabled={dailyNewsLoading}
          >
            刷新
          </button>
        </div>
        {news.map((item) => (
          <div key={item.id} className="flex items-baseline leading-7">
            <Copy
              size={16}
              onClick={() => handleCopy(item.title)}
              className="text-red-300 mr-1 cursor-pointer"
            />
            <SourceTag source={item.sourceId} className="w-6" />
            <a href={item.link} target="_blank" className="leading-7">
              {item.title}
            </a>
          </div>
        ))}
      </div>

      <div className="flex-1 max-w-xl">
        <div>
          <h2 className="font-bold">今日早报</h2>
        </div>
        <div className="news">
          <NewsListEditor />
        </div>
      </div>
    </div>
  );
}
