"use client";

import Link from "next/link";
import { mockAnnouncements } from "@/lib/dummyData";
import { Megaphone, Bell, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function RecentAnnouncements() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Megaphone size={16} />
          </div>
          <h2 className="text-sm font-semibold text-slate-800 dark:text-white tracking-tight">Announcements</h2>
        </div>
        <Link
          href="/teacher/announcements"
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
        >
          All <ChevronRight size={14} />
        </Link>
      </div>
      <div className="divide-y divide-slate-50 dark:divide-slate-800">
        {mockAnnouncements.slice(0, 3).map(ann => (
          <div
            key={ann.id}
            className={cn(
              "p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer",
              !ann.isRead && "bg-blue-50/30 dark:bg-blue-900/5"
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "mt-0.5 w-2 h-2 rounded-full shrink-0",
                ann.priority === "high" ? "bg-red-500" : "bg-slate-300 dark:bg-slate-600"
              )} />
              <div className="flex-1 min-w-0">
                <h4 className={cn(
                  "text-xs leading-snug",
                  ann.isRead
                    ? "text-slate-600 dark:text-slate-400 font-medium"
                    : "text-slate-800 dark:text-white font-semibold"
                )}>
                  {ann.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{ann.description}</p>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">{ann.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
