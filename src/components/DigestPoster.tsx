import { DateInfoType, RssDigestsType, RssEntriesType } from "@/types/rss";

type Props = {
  dateInfo?: DateInfoType | null;
  entries?: RssEntriesType[];
  digest: RssDigestsType;
};

export default function DigestPoster({
  dateInfo,
  entries = [],
  digest,
}: Props) {
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-xl overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg px-4 py-3 mb-4 shadow">
        <h1 className="text-lg font-semibold tracking-wide">每日30秒看世界</h1>
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
        【微语】：{digest.quote}
      </div>
    </div>
  );
}
