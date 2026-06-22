"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;         // 0-100
  size?: number;         // px
  strokeWidth?: number;  // px
  color?: string;        // stroke color
  trackColor?: string;
  className?: string;
  label?: string;        // center text (e.g. "DPP Score")
  delay?: number;
}

function getAutoStrokeColor(value: number): string {
  if (value >= 75) return "#10B981"; // emerald-500
  if (value >= 55) return "#2563EB"; // blue-600
  if (value >= 40) return "#F59E0B"; // amber-500
  return "#EF4444";                  // red-500
}

export function CircularProgress({
  value,
  size = 120,
  strokeWidth = 10,
  color,
  trackColor,
  className,
  label,
  delay = 0,
}: CircularProgressProps) {
  const clampedValue = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedValue / 100) * circumference;
  const strokeColor = color || getAutoStrokeColor(clampedValue);
  const track = trackColor || "rgba(148, 163, 184, 0.15)"; // slate-400/15

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={track}
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ delay, duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
          {clampedValue}%
        </span>
        {label && (
          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
