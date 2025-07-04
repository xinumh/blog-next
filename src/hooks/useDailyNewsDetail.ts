import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/request";
import dayjs from "dayjs";
import { DailyNewsDataType } from "@/types/rss";

const defaultData = {
  date: "",
  weekday: "",
  lunar: "",
  quote: "",
  newsList: [],
};

export function useDailyNewsDetail() {
  const [detail, setDetail] = useState<DailyNewsDataType>(defaultData);

  const fetchDetail = async (date: string) => {
    try {
      const res = await apiRequest<DailyNewsDataType>(
        "/api/proxy?path=/api/daily_news/detail",
        {
          date,
        }
      );
      console.log("res", res);
      setDetail(res ?? defaultData);
    } catch (e) {
      console.error("rss_digests fetch error", e);
    }
  };
  useEffect(() => {
    const date = dayjs().format("YYYY-MM-DD");
    fetchDetail(date);
  }, []);

  return { detail, run: fetchDetail };
}

export function useDailyNewsList() {
  const [data, setData] = useState<DailyNewsDataType[]>([defaultData]);

  const fetchData = async (page = 1, pageSize = 10) => {
    try {
      const res = await apiRequest<DailyNewsDataType[]>(
        "/api/proxy?path=/api/daily_news/overview",
        {
          page,
          pageSize,
        }
      );
      console.log("res", res);
      setData(res ?? defaultData);
    } catch (e) {
      console.error("rss_digests fetch error", e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { data, run: fetchData };
}
