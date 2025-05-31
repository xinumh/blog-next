import { useCallback, useEffect, useRef, useState } from "react";
import { apiRequest } from "@/utils/request";
import { groupByDate, mergeGroupedRecords } from "@/utils/groupnews";
import { RssEntriesType } from "@/types/rss";

export function usePaginatedRssEntries(sourceId?: number, pageSize = 20) {
  const [groupData, setGroupData] = useState<Map<string, RssEntriesType[]>>(
    new Map()
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const hasInitialized = useRef(false);

  const fetchData = useCallback(
    async (page: number, sourceId?: number) => {
      setLoading(true);
      try {
        const result = await apiRequest<{
          page: number;
          pageSize: number;
          data: RssEntriesType[];
          total: number;
        }>("/api/proxy?path=/api/rss_entries/page", {
          page,
          pageSize,
          sourceId,
        });

        const resData = result.data ?? [];

        setGroupData((prevGroup) => {
          const updated =
            page === 1
              ? groupByDate(resData)
              : mergeGroupedRecords(prevGroup, resData);
          return new Map(updated);
        });

        setHasMore(page * pageSize < result.total);
      } catch (e) {
        console.error("rss_entries fetch error", e);
      } finally {
        setLoading(false);
      }
    },
    [pageSize]
  );

  // 初始加载或 sourceId 改变时重置
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      fetchData(1);
    }
  }, [fetchData]);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader || loading || !hasMore) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setLoading(true); // 提前设置
        const nextPage = page + 1;
        setPage(nextPage);
        fetchData(nextPage, sourceId);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 1.0,
    });

    observer.observe(loader);

    return () => {
      if (loader) observer.unobserve(loader);
      if (observer) observer.disconnect();
    };
  }, [loaderRef, loading, hasMore, page, fetchData, sourceId]);

  return { groupData, loading, hasMore, loaderRef, refetchFn: fetchData };
}
