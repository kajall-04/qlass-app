"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  noPadding?: boolean;
  loading?: boolean;
}

export function DashboardCard({
  title,
  action,
  children,
  className,
  delay = 0,
  noPadding = false,
  loading = false,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className={cn(
        "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl",
        "hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50",
        "transition-shadow duration-300",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h3>
        {action && <div>{action}</div>}
      </div>

      {/* Content */}
      {loading ? (
        <div className="px-5 pb-5 space-y-3">
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-4 w-1/2" />
          <div className="skeleton h-32 w-full" />
          <div className="skeleton h-4 w-2/3" />
        </div>
      ) : (
        <div className={cn(!noPadding && "px-5 pb-5")}>{children}</div>
      )}
    </motion.div>
  );
}

/** Empty state for cards with no data */
export function CardEmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
        <svg
          className="w-6 h-6 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
    </div>
  );
}
