"use client";

import Link from "next/link";
import { DashboardCard } from "./dashboard-card";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { DashboardAnnouncement } from "@/types/dashboard";

interface RecentAnnouncementsProps {
  data: DashboardAnnouncement[];
}

const priorityConfig: Record<string, { bg: string; text: string }> = {
  urgent: { bg: "bg-red-100 dark:bg-red-900/20", text: "text-red-700 dark:text-red-400" },
  high: { bg: "bg-amber-100 dark:bg-amber-900/20", text: "text-amber-700 dark:text-amber-400" },
  medium: { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-400" },
  low: { bg: "bg-slate-100 dark:bg-slate-800", text: "text-slate-600 dark:text-slate-400" },
};

const typeIcons: Record<string, string> = {
  general: "📋",
  exam: "📝",
  holiday: "🎉",
  event: "🎪",
  urgent: "🚨",
};

export function RecentAnnouncements({ data }: RecentAnnouncementsProps) {
  return (
    <DashboardCard
      title="Recent Announcements"
      delay={0.45}
      action={
        <Link
          href="/admin/announcements"
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
        >
          View All
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      }
    >
      <div className="space-y-0">
        {data.map((ann, i) => {
          const pri = priorityConfig[ann.priority] || priorityConfig.low;
          return (
            <div
              key={ann.id}
              className={cn(
                "flex items-start gap-3 py-3",
                i < data.length - 1 && "border-b border-slate-100 dark:border-slate-800"
              )}
            >
              {/* Icon + Unread dot */}
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-base">
                  {typeIcons[ann.type] || "📋"}
                </div>
                {ann.unread && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={cn(
                    "text-sm font-medium truncate",
                    ann.unread ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"
                  )}>
                    {ann.title}
                  </span>
                  <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0", pri.bg, pri.text)}>
                    {ann.priority}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mb-1">
                  {ann.description}
                </p>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">
                  {formatDate(ann.createdDate)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
}
