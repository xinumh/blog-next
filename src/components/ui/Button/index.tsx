"use client";

import { clsx } from "clsx"; // Tailwind 工具函数，用于合并 className
import { Loader2 } from "lucide-react"; // loading icon
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export const Button = ({
  children,
  variant = "default",
  size = "md",
  className,
  disabled = false,
  loading = false,
  onClick,
  type = "button",
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    ghost: "text-gray-600 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        base,
        variants[variant],
        sizes[size],
        disabled || loading ? "opacity-60 cursor-not-allowed" : "",
        className
      )}
      onClick={onClick}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};
