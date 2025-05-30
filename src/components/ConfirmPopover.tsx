"use client";

import { useState, useRef } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useClickOutside } from "@/hooks/useClickOutside";
import { AnimatePresence, motion } from "framer-motion";

interface ConfirmPopoverProps {
  children: React.ReactNode; // 触发器（例如按钮）
  message?: string;
  icon?: React.ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  className?: string;
}

export default function ConfirmPopover({
  children,
  message = "确定执行此操作？",
  icon = <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />,
  onConfirm,
  onCancel,
  confirmText = "确认",
  cancelText = "取消",
  className,
}: ConfirmPopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false)); // 👈 添加点击外部关闭

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  return (
    <div className={clsx("relative inline-block", className)} ref={ref}>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 bottom-full left-0 -translate-x-70 mb-2 w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-xl backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              {icon}
              <p className="text-sm text-gray-800">{message}</p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="rounded-md px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                {cancelText}
              </button>
              <button
                onClick={handleConfirm}
                className="rounded-md px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
