"use client";

import { motion } from "framer-motion";

interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  sublabel?: string;
  showValue?: boolean;
}

export function ProgressRing({
  value,
  size = 80,
  strokeWidth = 6,
  color = "#2563EB",
  trackColor = "#E2E8F0",
  label,
  sublabel,
  showValue = true,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
            className="dark:opacity-20"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-slate-800 dark:text-white tabular-nums">
              {Math.round(value)}%
            </span>
          </div>
        )}
      </div>
      {label && (
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400 text-center">{label}</span>
      )}
      {sublabel && (
        <span className="text-[10px] text-slate-400 dark:text-slate-500 text-center">{sublabel}</span>
      )}
    </div>
  );
}
