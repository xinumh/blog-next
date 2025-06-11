"use client";

import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { AnimatePresence, motion } from "framer-motion";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";
import { Logo } from "../Logo";

const navItems = [
  { label: "📝 posts", path: "/posts" },
  { label: "📰 shortnews", path: "/shortnews" },
  { label: "📡 rss sources", path: "/rss_source" },
];

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isSticky, show } = useHideOnScroll(); // 可传 threshold / scrollDelta

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (path: string) => {
    router.push(path);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-transform duration-300",
        isSticky
          ? show
            ? "translate-y-0 bg-white/80 backdrop-blur shadow-md"
            : "-translate-y-full"
          : "bg-transparent shadow-none"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* <Logo className="w-32" /> */}
          <Link className="text-xl font-bold font-serif" href="/">
            {/* Ashin&apos;blog */}
            <Logo className="w-32" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="space-x-4 hidden md:flex">
            {navItems.map((item) => (
              <li
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={clsx(
                  " px-3 py-2 cursor-pointer  rounded-md text-sm font-medium hover:bg-[var(--nav-hover-bg)] transition",
                  pathname === item.path &&
                    "bg-[var(--nav-selected-hover-bg)] font-semibold"
                )}
              >
                {item.label}
              </li>
            ))}
          </ul>
          {/* Mobile Menu Button */}
          <ul className="md:hidden">
            <li
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex cursor-pointer items-center justify-center p-2 rounded-md hover:bg-[var(--nav-hover-bg)] focus:outline-none"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XMarkIcon className="h-6 w-6 text-gray-900" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bars3Icon className="h-6 w-6 text-gray-900" />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu 动画容器 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <MobileNav
              navItems={navItems}
              pathname={pathname}
              onClick={handleNavClick}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
