import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/request";
import { RssDigestsType, RssEntriesType, DateInfoType } from "@/types/rss";

type DataType = {
  entries: RssEntriesType[];
  digest: RssDigestsType | null;
  dateInfo: DateInfoType | null;
};
export function useRssDigestEntries(digestId: number) {
  const [data, setData] = useState<DataType>({
    entries: [],
    digest: null,
    dateInfo: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest<DataType>(
          "/api/proxy?path=/api/rss_digests/entries",
          {
            digestId,
          }
        );
        setData(res);
      } catch (e) {
        console.error("rss_digests fetch error", e);
      }
    };
    fetchData();
  }, []);

  return { data };
}
