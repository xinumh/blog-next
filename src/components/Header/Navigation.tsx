"use client";

import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import MobileNav from "./MobileNav";

const navItems = [
  { label: "posts", path: "/posts" },
  { label: "shortnews", path: "/shortnews" },
  { label: "rss sources", path: "/rss_source" },
];

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-gray-100/80 shadow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link className="text-xl font-bold font-serif" href="/">
            Ashin&apos;blog
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
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <MobileNav
          navItems={navItems}
          pathname={pathname}
          onClick={handleNavClick}
        />
      )}
    </nav>
  );
}
