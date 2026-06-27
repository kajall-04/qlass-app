"use client";

import { useState, useEffect } from "react";
import { FilterBar } from "./components/FilterBar";
import { SummaryCards } from "./components/SummaryCards";
import { SubjectsTable } from "./components/SubjectsTable";
import { CompletionChart } from "./components/CompletionChart";
import { OverallProgressCard } from "./components/OverallProgressCard";
import { SubjectCardsGrid } from "./components/SubjectCardsGrid";
import { fetchClassData } from "./services/mockApi";
import type { MyClassesData, CourseFilterState } from "./types";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function StudentClassesPage() {
  const [filters, setFilters] = useState<CourseFilterState>({
    search: "",
    academicYear: "2024-25",
    subject: "All Subjects",
    teacher: "All Teachers",
    status: "All",
    sortBy: "Subject Name"
  });
  
  const [data, setData] = useState<MyClassesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    setError(null);

    fetchClassData(filters)
      .then((res) => {
        if (mounted) {
          setData(res);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          console.error("Failed to fetch class data:", err);
          setError("Failed to load classes data. Please try again.");
          setIsLoading(false);
        }
      });
      
    return () => { mounted = false; };
  }, [filters]);

  const handleRetry = () => {
    setFilters({ ...filters }); // Trigger re-fetch
  };

  return (
    <div className="max-w-[1920px] mx-auto space-y-8 pb-12 animate-in fade-in duration-500 px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          My Classes / Courses
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          View your enrolled class, subjects, teachers and academic progress.
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar filters={filters} setFilters={setFilters} isLoading={isLoading} />

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Something went wrong</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{error}</p>
          </div>
          <button 
            onClick={handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" /> Try Again
          </button>
        </div>
      )}

      {!error && (
        <>
          {/* Section 1: Summary Cards */}
          <section>
            <SummaryCards summary={data?.summary} isLoading={isLoading} />
          </section>

          {/* Middle Row: Chart & Overall Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2">
              <CompletionChart subjects={data?.subjects || []} isLoading={isLoading} />
            </section>
            <section className="lg:col-span-1">
              <OverallProgressCard progress={data?.overallProgress} isLoading={isLoading} />
            </section>
          </div>

          {/* Section 2: Subjects Overview Table */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Subjects Overview</h2>
            <div className="hidden md:block">
              <SubjectsTable subjects={data?.subjects || []} isLoading={isLoading} />
            </div>
            
            {/* Show grid on mobile/tablet instead of table if preferred, or just let table handle it.
                Given the requirement "Tables become cards on mobile", we can show SubjectCardsGrid on small screens and SubjectsTable on large screens. */}
            <div className="block md:hidden">
              <SubjectCardsGrid subjects={data?.subjects || []} isLoading={isLoading} />
            </div>
          </section>

          {/* Section 5: Subject Cards (Detailed Grid) */}
          <section className="space-y-4 hidden md:block">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8">Subject Cards</h2>
            <SubjectCardsGrid subjects={data?.subjects || []} isLoading={isLoading} />
          </section>
        </>
      )}
    </div>
  );
}
