"use client";
import { PracticeFilters } from "../types";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  filters: PracticeFilters;
  setFilters: (filters: PracticeFilters) => void;
  isLoading: boolean;
}

export function FilterBar({ filters, setFilters, isLoading }: FilterBarProps) {
  const views = ["All", "Assignments Only", "DPPs Only"] as const;
  const statuses = ["All", "Pending", "In Progress", "Completed"] as const;
  const subjects = ["All Subjects", "Physics", "Chemistry", "Mathematics", "Biology", "English"] as const;

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 px-4 sm:px-6 lg:px-8 space-y-4 sticky top-0 z-20">
      
      {/* Search Bar */}
      <div className="relative max-w-md w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search by topic, chapter, or title..." 
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          disabled={isLoading}
          className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white placeholder:text-slate-400 disabled:opacity-50"
        />
      </div>

      {/* Pill Filters */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
        
        {/* View Toggles */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">View:</span>
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
            {views.map(v => (
              <button
                key={v}
                disabled={isLoading}
                onClick={() => setFilters({ ...filters, view: v })}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-medium transition-colors disabled:opacity-50",
                  filters.view === v 
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Status Toggles */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Status:</span>
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
            {statuses.map(s => (
              <button
                key={s}
                disabled={isLoading}
                onClick={() => setFilters({ ...filters, status: s })}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-medium transition-colors disabled:opacity-50",
                  filters.status === s 
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Dropdown/Pills */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Subject:</span>
          <select 
            value={filters.subject}
            onChange={(e) => setFilters({ ...filters, subject: e.target.value as any })}
            disabled={isLoading}
            className="appearance-none bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-xs font-medium px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-700 dark:text-slate-300 cursor-pointer disabled:opacity-50"
          >
            {subjects.map(s => (
              <option key={s} value={s}>{s === "All Subjects" ? "All" : s}</option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
}
