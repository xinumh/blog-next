import { useEffect, useState } from "react";

export function useHideOnScroll(threshold = 64, scrollDelta = 16) {
  const [isSticky, setIsSticky] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const diff = currentScrollY - lastScrollY;

          if (Math.abs(diff) > scrollDelta) {
            if (currentScrollY > threshold) {
              setIsSticky(true);
              setShow(diff < 0); // 向上滚动显示，向下滚动隐藏
            } else {
              setIsSticky(false);
              setShow(true);
            }

            setLastScrollY(currentScrollY);
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, threshold, scrollDelta]);

  return { isSticky, show };
}
