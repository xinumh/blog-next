import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/request";
import { RssDigestsType } from "@/types/rss";

export function useRssDigests() {
  const [digests, setDigests] = useState<RssDigestsType[]>([]);

  useEffect(() => {
    const fetchDigests = async () => {
      try {
        const res = await apiRequest<{ data: RssDigestsType[] }>(
          "/api/proxy?path=/api/rss_digests/page",
          {
            page: 1,
            pageSize: 100,
          }
        );
        console.log("res", res);
        setDigests(res?.data ?? []);
      } catch (e) {
        console.error("rss_digests fetch error", e);
      }
    };
    fetchDigests();
  }, []);

  return { digests };
}
