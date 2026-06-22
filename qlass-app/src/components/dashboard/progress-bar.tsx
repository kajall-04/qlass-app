"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;           // 0-100
  size?: "sm" | "md";
  className?: string;
  showLabel?: boolean;
  color?: string;          // override auto color
  delay?: number;
}

function getAutoColor(value: number): string {
  if (value >= 80) return "bg-emerald-500";
  if (value >= 60) return "bg-blue-500";
  if (value >= 40) return "bg-amber-500";
  return "bg-red-500";
}

export function ProgressBar({
  value,
  size = "sm",
  className,
  showLabel = false,
  color,
  delay = 0,
}: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));
  const barColor = color || getAutoColor(clampedValue);
  const height = size === "sm" ? "h-1.5" : "h-2.5";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden",
          height
        )}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ delay, duration: 0.8, ease: "easeOut" }}
          className={cn("h-full rounded-full", barColor)}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 tabular-nums min-w-[2.5rem] text-right">
          {clampedValue}%
        </span>
      )}
    </div>
  );
}
