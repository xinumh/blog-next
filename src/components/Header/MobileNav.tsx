import clsx from "clsx";
import React from "react";

type Props = {
  pathname: string;
  navItems: { path: string; label: string }[];
  onClick: (path: string) => void;
};

const MobileNav = ({ navItems, pathname, onClick }: Props) => {
  return (
    <div className="md:hidden bg-[var(--background)] shadow-lg absolute w-full z-10">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => onClick(item.path)}
            className={clsx(
              "block w-full text-left px-3 py-2  rounded-md text-base font-medium",
              pathname === item.path
                ? " font-semibold"
                : " hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
