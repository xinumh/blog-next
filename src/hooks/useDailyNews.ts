import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/request";
import { RssEntriesType } from "@/types/rss";
import dayjs from "dayjs";

export function useDailyNews() {
  const [news, setNews] = useState<RssEntriesType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchList = async (date?: string) => {
    const pubDate = date
      ? dayjs(date).format("YYYY-MM-DD")
      : dayjs(date).format("YYYY-MM-DD");
    try {
      setLoading(true);
      const res = await apiRequest<{ data: RssEntriesType[] }>(
        "/api/proxy?path=/api/rss_entries/page",
        {
          page: 1,
          pageSize: 100,
          pubDate,
        }
      );
      console.log("res", res);
      setNews(res?.data ?? []);
    } catch (e) {
      console.error("daily_news fetch error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return { news, run: fetchList, loading };
}
