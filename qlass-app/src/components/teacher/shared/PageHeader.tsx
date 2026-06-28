"use client";

import { usePathname } from "next/navigation";
import { Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  badge?: {
    label: string;
    variant?: "default" | "success" | "warning" | "danger";
  };
}

const badgeVariants = {
  default: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
  warning: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  danger: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
};

export function PageHeader({ title, subtitle, actions, search, badge }: PageHeaderProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 sm:mb-8"
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs font-medium text-slate-400 dark:text-slate-500 mb-3">
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;
          const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
          return (
            <span key={segment} className="flex items-center gap-1">
              {!isLast ? (
                <>
                  <Link
                    href={href}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {label}
                  </Link>
                  <ChevronRight size={12} className="text-slate-300 dark:text-slate-600" />
                </>
              ) : (
                <span className="text-slate-600 dark:text-slate-300">{label}</span>
              )}
            </span>
          );
        })}
      </nav>

      {/* Title Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-[#081C45] dark:text-white tracking-tight">
                {title}
              </h1>
              {badge && (
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeVariants[badge.variant || "default"]}`}>
                  {badge.label}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {search && (
            <div className="relative min-w-[200px] sm:min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search.value}
                onChange={(e) => search.onChange(e.target.value)}
                placeholder={search.placeholder || "Search..."}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 dark:focus:border-blue-600 transition-all shadow-sm"
              />
            </div>
          )}
          {actions}
        </div>
      </div>
    </motion.div>
  );
}
