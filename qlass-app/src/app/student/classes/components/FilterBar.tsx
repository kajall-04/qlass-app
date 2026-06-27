"use client";
import { Search, RotateCcw, ChevronDown } from "lucide-react";
import { CourseFilterState } from "../types";

interface FilterBarProps {
  filters: CourseFilterState;
  setFilters: (filters: CourseFilterState) => void;
  isLoading: boolean;
}

export function FilterBar({ filters, setFilters, isLoading }: FilterBarProps) {
  
  const handleReset = () => {
    setFilters({
      search: "",
      academicYear: "2024-25",
      subject: "All Subjects",
      teacher: "All Teachers",
      status: "All",
      sortBy: "Subject Name"
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow-sm relative z-20">
      {/* Search Bar */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search subjects, teachers, chapters..." 
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          disabled={isLoading}
          className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white placeholder:text-slate-400 disabled:opacity-50"
        />
      </div>

      {/* Dropdowns */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Academic Year */}
        <div className="relative min-w-[120px]">
          <select 
            value={filters.academicYear}
            onChange={(e) => setFilters({ ...filters, academicYear: e.target.value })}
            disabled={isLoading}
            className="w-full appearance-none bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="2024-25">2024-25</option>
            <option value="2025-26">2025-26</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Subject */}
        <div className="relative min-w-[130px]">
          <select 
            value={filters.subject}
            onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
            disabled={isLoading}
            className="w-full appearance-none bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="All Subjects">All Subjects</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Biology">Biology</option>
            <option value="English">English</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Teacher */}
        <div className="relative min-w-[140px]">
          <select 
            value={filters.teacher}
            onChange={(e) => setFilters({ ...filters, teacher: e.target.value })}
            disabled={isLoading}
            className="w-full appearance-none bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="All Teachers">All Teachers</option>
            <option value="Mr. Rohan Verma">Mr. Rohan Verma</option>
            <option value="Ms. Neha Sharma">Ms. Neha Sharma</option>
            <option value="Mr. Amit Jain">Mr. Amit Jain</option>
            <option value="Dr. Priyanka Nair">Dr. Priyanka Nair</option>
            <option value="Ms. Kavita Das">Ms. Kavita Das</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Status */}
        <div className="relative min-w-[120px]">
          <select 
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            disabled={isLoading}
            className="w-full appearance-none bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="All">All Status</option>
            <option value="On Track">On Track</option>
            <option value="Behind">Behind</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Sort By */}
        <div className="relative min-w-[120px]">
          <select 
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            disabled={isLoading}
            className="w-full appearance-none bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="Subject Name">Sort: Subject Name</option>
            <option value="Progress %">Sort: Progress %</option>
            <option value="Chapters Completed">Sort: Chapters Completed</option>
            <option value="Teacher Name">Sort: Teacher Name</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Reset Button */}
        <button 
          onClick={handleReset}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-transparent"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden xl:inline">Reset</span>
        </button>
      </div>
    </div>
  );
}
