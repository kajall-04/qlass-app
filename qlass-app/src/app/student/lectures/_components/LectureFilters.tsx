"use client";
import { Search, Filter as FilterIcon, ChevronDown, Calendar, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface FilterState {
  search: string;
  subject: string;
  status: string;
  sort: string;
}

interface LectureFiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  subjects: string[];
}

export function LectureFilters({ filters, setFilters, subjects }: LectureFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-4">
      {/* Primary Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search lectures, teachers, or chapters..." 
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select 
              value={filters.subject}
              onChange={(e) => setFilters({...filters, subject: e.target.value})}
              className="appearance-none bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white cursor-pointer"
            >
              <option value="">All Subjects</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <button 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border",
              showAdvanced 
                ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800/50 dark:text-emerald-400" 
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            )}
          >
            <FilterIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</label>
            <select 
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:text-white"
            >
              <option value="">Any Status</option>
              <option value="Watched">Watched</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Watched">Not Watched</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sort By</label>
            <select 
              value={filters.sort}
              onChange={(e) => setFilters({...filters, sort: e.target.value})}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:text-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="duration-long">Duration (Longest)</option>
              <option value="duration-short">Duration (Shortest)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Range</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:text-white">
                <option>All Time</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
          </div>

          <div className="flex items-end">
            <button 
              onClick={() => setFilters({ search: "", subject: "", status: "", sort: "newest" })}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
            >
              <RefreshCcw className="w-4 h-4" /> Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
