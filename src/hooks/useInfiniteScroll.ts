import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback: () => void, hasMore: boolean) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return; // 没有更多就不监听

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { rootMargin: "100px" } // 提前100px加载
    );

    const currentElement = observerRef.current;
    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [callback, hasMore]);

  return observerRef;
}
