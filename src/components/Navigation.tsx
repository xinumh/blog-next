// app/components/Navigation.tsx
"use client"; // 必须加这个

import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
  { label: "rss_entries", path: "/rss_entries" },
  { label: "rss_source", path: "/rss_source" },
];

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-xl font-bold">✨星星之火</div>
          <div className="space-x-4 hidden md:flex">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={clsx(
                  "text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition",
                  pathname === item.path && "bg-gray-200 font-semibold"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
