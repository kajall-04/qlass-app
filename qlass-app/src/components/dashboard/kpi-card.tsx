"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Users, BookOpen, GraduationCap, FileText, ClipboardCheck,
  TrendingUp, BarChart3, UserCheck,
} from "lucide-react";
import type { KPIItem } from "@/types/dashboard";

const iconMap: Record<string, React.ElementType> = {
  Users,
  BookOpen,
  GraduationCap,
  FileText,
  ClipboardCheck,
  TrendingUp,
  BarChart3,
  UserCheck,
};

/** Animated counter hook */
function useAnimatedCounter(target: number, duration: number = 1200): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === 0) { setCount(0); return; }
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
}

interface KPICardProps {
  data: KPIItem;
  index: number;
}

export function KPICard({ data, index }: KPICardProps) {
  const Icon = iconMap[data.iconName] || Users;
  const trendColor =
    data.trend === "up"
      ? "text-emerald-600 dark:text-emerald-400"
      : data.trend === "down"
        ? "text-red-500 dark:text-red-400"
        : "text-slate-400 dark:text-slate-500";
  const arrow = data.trend === "up" ? "↑" : data.trend === "down" ? "↓" : "→";

  // Parse numeric value for animation
  const numericValue =
    typeof data.value === "number"
      ? data.value
      : parseInt(String(data.value).replace(/[^0-9]/g, ""), 10) || 0;
  const animatedValue = useAnimatedCounter(numericValue);
  const displayValue =
    typeof data.value === "string" && data.value.includes("%")
      ? `${animatedValue}%`
      : animatedValue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
      className={cn(
        "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5",
        "hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50",
        "hover:-translate-y-0.5 transition-all duration-300 cursor-default"
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
          data.iconBg
        )}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
        {displayValue}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
        {data.label}
      </div>
      <div className={cn("text-xs font-semibold mt-2", trendColor)}>
        {arrow} {data.change}
      </div>
    </motion.div>
  );
}

/** Skeleton placeholder for KPI cards during loading */
export function KPICardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
      <div className="skeleton w-10 h-10 rounded-xl mb-3" />
      <div className="skeleton h-7 w-16 mb-2" />
      <div className="skeleton h-3 w-24 mb-2" />
      <div className="skeleton h-3 w-20" />
    </div>
  );
}
