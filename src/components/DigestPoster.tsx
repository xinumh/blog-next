import { DailyNewsDataType } from "@/types/rss";

type Props = {
  data: DailyNewsDataType;
  className?: string;
};

export default function DigestPoster({ data, className }: Props) {
  const { date, weekday, lunar, quote, newsList = [] } = data;
  return (
    <div
      className={`max-w-md  p-4 bg-white shadow-md rounded-xl overflow-hidden font-sans ${className}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg px-4 py-3 mb-4 shadow">
        <h1 className="text-lg font-semibold tracking-wide">每日30秒看世界</h1>
        <div className="text-sm mt-1">
          <div>{date}</div>
          <div>{weekday}</div>
          <div>农历 {lunar}</div>
        </div>
      </div>

      {/* News List */}
      <ul className="space-y-3 text-gray-800 text-[15px] leading-relaxed">
        {newsList?.map((entry, index: number) => (
          <li key={entry.order} className="flex items-start">
            <span className="text-blue-500 mr-2 w-3">{index + 1}.</span>
            <span>{entry.title}</span>
          </li>
        ))}
      </ul>

      {/* 微语 */}
      <div className="mt-6 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg border border-blue-100 text-sm text-center italic shadow-sm">
        【微语】：{quote}
      </div>
    </div>
  );
}
