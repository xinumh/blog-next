"use client";

import { useRssDigestEntries } from "@/hooks/useRssDigestEntries";
import { useRssDigests } from "@/hooks/useRssDigests";
import { apiRequest } from "@/utils/request";

const fetchDigests = async () => {
  try {
    const res = await apiRequest("/api/proxy?path=/api/rss_digests/poster", {
      digestId: 4,
    });
    console.log("res", res);
  } catch (e) {
    console.error("rss_digests fetch error", e);
  }
};

export default function DigestPage() {
  const { digests = [] } = useRssDigests();

  const digestId = 4;
  const {
    data: { dateInfo, entries, digest },
  } = useRssDigestEntries(digestId);
  console.log("digests", digests);
  const microQuote = "旧事已过，未来都是新的";
  const handlCopyDigests = () => {
    const list = entries.map(
      (entry, index) => `${index + 1}.${entry.titleZh ?? entry.title}\n`
    );
    const listString = list.join("");

    const content = `${digest?.title}\n${dateInfo?.date}\n${dateInfo?.weekday}\n农历 ${dateInfo?.lunar}\n\n${listString}`;
    // console.log("content", content);
    navigator.clipboard.writeText(content);
  };
  return (
    <>
      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-xl overflow-hidden font-sans">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg px-4 py-3 mb-4 shadow">
          <h1 className="text-lg font-semibold tracking-wide">
            每日30秒看世界
          </h1>
          <div className="text-sm mt-1">
            <div>{dateInfo?.date}</div>
            <div>{dateInfo?.weekday}</div>
            <div>农历 {dateInfo?.lunar}</div>
          </div>
        </div>

        {/* News List */}
        <ul className="space-y-3 text-gray-800 text-[15px] leading-relaxed">
          {entries.map((entry, index: number) => (
            <li key={entry.id} className="flex items-start">
              <span className="text-blue-500 mr-2 w-3">{index + 1}.</span>
              <span>{entry.titleZh ?? entry.title}</span>
            </li>
          ))}
        </ul>

        {/* 微语 */}
        <div className="mt-6 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg border border-blue-100 text-sm text-center italic shadow-sm">
          【微语】：{microQuote}
        </div>
      </div>
      <div>
        <span
          className="bg-blue-500 w-20 rounded-md m-3 p-2 text-white"
          onClick={fetchDigests}
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
    </>
  );
}
