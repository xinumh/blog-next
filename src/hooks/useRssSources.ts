import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/request";
import { RssSourcesType } from "@/types/rss";

export function useRssSources() {
  const [sources, setSources] = useState<RssSourcesType[]>([]);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const res = await apiRequest<{ data: RssSourcesType[] }>(
          "/api/proxy?path=/api/rss_sources/page",
          {
            page: 1,
            pageSize: 100,
          }
        );
        setSources(res?.data ?? []);
      } catch (e) {
        console.error("rss_sources fetch error", e);
      }
    };
    fetchSources();
  }, []);

  return { sources };
}
