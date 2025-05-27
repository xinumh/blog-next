import { RssEntriesType } from "@/app/shortnews/page";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

/**
 * 获取一个日期的“分组标签”
 * @param dateStr ISO 时间字符串或 Date 对象
 * @returns string 如 "今天"、"昨天"、"周一"、"5月16日"
 */
export function getDateLabel(dateStr: string | Date): string {
  const date = dayjs(dateStr);

  if (date.isToday()) {
    return "今天";
  } else if (date.isYesterday()) {
    return "昨天";
  } else if (dayjs().diff(date, "day") < 7) {
    const weekDay = "日一二三四五六"[date.day()];
    return `周${weekDay}`;
  } else if (dayjs().year() !== date.year()) {
    return date.format("YYYY年M月D日");
  } else {
    return date.format("M月D日");
  }
}

export function groupByDate(list: RssEntriesType[]) {
  const grouped = new Map<string, RssEntriesType[]>();

  for (const item of list) {
    const label = getDateLabel(item.createdAt);

    if (!grouped.has(label)) {
      grouped.set(label, []);
    }

    grouped.get(label)!.push(item);
  }

  return grouped;
}

export function mergeGroupedRecords(
  prev: Map<string, RssEntriesType[]>,
  newItems: RssEntriesType[]
): Map<string, RssEntriesType[]> {
  const next = new Map(prev); // clone

  for (const item of newItems) {
    const date = getDateLabel(item.pubDate); // 如 "2025-05-26"
    const list = next.get(date) || [];

    // 避免重复插入相同 ID（可选）
    if (!list.some((r) => r.id === item.id)) {
      next.set(date, [...list, item]);
    }
  }

  return next;
}
