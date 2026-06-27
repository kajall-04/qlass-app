"use client";

import { useState } from "react";
import { Calendar, ChevronDown, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardFilters } from "../types";

interface Props {
  filters: DashboardFilters;
  setFilters: React.Dispatch<React.SetStateAction<DashboardFilters>>;
}

const subjects = [
  "All Subjects",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Biology",
  "English",
  "Computer Science",
];

export function DashboardFilters({ filters, setFilters }: Props) {
  const [openSubject, setOpenSubject] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  const timeOptions = [
    { label: "Today", value: "today" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
    { label: "Custom Range", value: "custom" },
  ];

  const currentTimeLabel = timeOptions.find((t) => t.value === filters.quickFilter)?.label || "Date Range";

  return (
    <div className="flex flex-wrap items-center gap-3 relative z-30">
      {/* Time Filter */}
      <div className="relative">
        <button
          onClick={() => { setOpenTime(!openTime); setOpenSubject(false); }}
          className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm"
        >
          <Calendar className="w-4 h-4 text-slate-500" />
          <span className="text-slate-700 dark:text-slate-300">{currentTimeLabel}</span>
          <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", openTime && "rotate-180")} />
        </button>
        {openTime && (
          <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 origin-top-right">
            {timeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setFilters((prev) => ({ ...prev, quickFilter: opt.value as any }));
                  setOpenTime(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-2.5 text-sm transition-colors",
                  filters.quickFilter === opt.value
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Subject Filter */}
      <div className="relative">
        <button
          onClick={() => { setOpenSubject(!openSubject); setOpenTime(false); }}
          className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm"
        >
          <BookOpen className="w-4 h-4 text-slate-500" />
          <span className="text-slate-700 dark:text-slate-300">{filters.subject}</span>
          <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", openSubject && "rotate-180")} />
        </button>
        {openSubject && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 origin-top-right max-h-[300px] overflow-y-auto custom-scrollbar">
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => {
                  setFilters((prev) => ({ ...prev, subject: sub }));
                  setOpenSubject(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-2.5 text-sm transition-colors",
                  filters.subject === sub
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Click outside overlay */}
      {(openSubject || openTime) && (
        <div className="fixed inset-0 z-[-1]" onClick={() => { setOpenSubject(false); setOpenTime(false); }} />
      )}
    </div>
  );
}
