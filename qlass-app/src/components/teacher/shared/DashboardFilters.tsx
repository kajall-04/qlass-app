"use client";

import { useTeacherStore } from "@/store/teacherStore";
import { mockTeacherProfile } from "@/lib/dummyData";
import { Calendar, BookOpen, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardFiltersProps {
  showExport?: boolean;
}

export function DashboardFilters({ showExport = false }: DashboardFiltersProps) {
  const {
    selectedClass, setSelectedClass,
    selectedSubject, setSelectedSubject,
    dateRange, setDateRange,
  } = useTeacherStore();

  return (
    <div className="flex items-center gap-3">
      {/* Date Range Pills */}
      <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-200 dark:border-slate-700/50">
        {[
          { id: "today", label: "Today" },
          { id: "this-week", label: "Weekly" },
          { id: "this-month", label: "Monthly" },
        ].map(range => (
          <button
            key={range.id}
            onClick={() => setDateRange(range.id)}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
              dateRange === range.id
                ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Class Dropdown */}
      <div className="relative">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="appearance-none pl-9 pr-8 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
        >
          <option value="all">All Classes</option>
          {mockTeacherProfile.assignedClasses.map(c => (
            <option key={c} value={c}>Class {c}</option>
          ))}
        </select>
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>

      {/* Subject Dropdown */}
      <div className="relative hidden sm:block">
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="appearance-none pl-9 pr-8 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
        >
          <option value="all">All Subjects</option>
          {mockTeacherProfile.assignedSubjects.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>

      {showExport && (
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
          <Download size={14} />
          Export
        </button>
      )}
    </div>
  );
}
