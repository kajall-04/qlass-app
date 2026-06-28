"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { useEffect, useState } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  delay?: number;
  sparkData?: number[];
}

function AnimatedCounter({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{count}</>;
}

function MiniSparkline({ data, color = "#3B82F6" }: { data: number[]; color?: string }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 28;
  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * height,
  }));
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg width={width} height={height} className="opacity-60 group-hover:opacity-100 transition-opacity">
      <defs>
        <linearGradient id={`spark-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#spark-${color.replace("#", "")})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StatCard({
  title,
  value,
  trend = "neutral",
  trendValue,
  icon,
  iconBg = "bg-blue-100 dark:bg-blue-900/30",
  iconColor = "text-blue-600 dark:text-blue-400",
  delay = 0,
  sparkData,
}: StatCardProps) {
  const isNumeric = typeof value === "number";
  const displayValue = typeof value === "string" && value.endsWith("%")
    ? value
    : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: delay * 0.06, duration: 0.4, type: "spring", stiffness: 120 }}
      className="group bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`h-11 w-11 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg ${
          trend === "up" ? "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/20" :
          trend === "down" ? "text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-900/20" :
          "text-slate-500 bg-slate-50 dark:text-slate-400 dark:bg-slate-800"
        }`}>
          {trend === "up" && <ArrowUpRight size={14} strokeWidth={2.5} />}
          {trend === "down" && <ArrowDownRight size={14} strokeWidth={2.5} />}
          {trend === "neutral" && <Minus size={14} strokeWidth={2.5} />}
          {trendValue && <span className="hidden sm:inline">{trendValue}</span>}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white tracking-tight tabular-nums">
            {isNumeric ? <AnimatedCounter value={value as number} /> : displayValue}
          </div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
            {title}
          </div>
        </div>
        {sparkData && <MiniSparkline data={sparkData} color={trend === "up" ? "#10B981" : trend === "down" ? "#F43F5E" : "#3B82F6"} />}
      </div>
    </motion.div>
  );
}
