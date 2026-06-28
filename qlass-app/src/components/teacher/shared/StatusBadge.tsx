"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral" | "purple" | "blue";

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  dot?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
  warning: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  danger: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
  info: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
  neutral: "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  purple: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-400 dark:border-violet-800",
  blue: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
};

const dotColors: Record<BadgeVariant, string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-blue-500",
  neutral: "bg-slate-400",
  purple: "bg-violet-500",
  blue: "bg-blue-500",
};

export function StatusBadge({ label, variant = "neutral", size = "sm", dot, icon, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold border rounded-full whitespace-nowrap",
        size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1",
        variantStyles[variant],
        className
      )}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[variant])} />}
      {icon}
      {label}
    </span>
  );
}

// Convenience helpers
export function getRiskBadgeVariant(risk: string): BadgeVariant {
  switch (risk) {
    case "Critical": return "danger";
    case "High": return "warning";
    case "Medium": return "info";
    case "Low": return "success";
    default: return "neutral";
  }
}

export function getStatusBadgeVariant(status: string): BadgeVariant {
  switch (status) {
    case "Active": case "Completed": case "Available": case "On Track": case "on-track": return "success";
    case "Pending": case "On Leave": case "needs-attention": case "In Progress": return "warning";
    case "Upcoming": case "Ongoing": case "Scheduled": return "info";
    case "Critical": case "at-risk": case "Missing": case "Probation": case "Overdue": return "danger";
    default: return "neutral";
  }
}

export function getDifficultyBadgeVariant(difficulty: string): BadgeVariant {
  switch (difficulty) {
    case "Easy": return "success";
    case "Medium": return "warning";
    case "Hard": return "danger";
    default: return "neutral";
  }
}
