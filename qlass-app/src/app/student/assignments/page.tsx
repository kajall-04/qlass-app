"use client";

import { useState, useEffect } from "react";
import { fetchPracticeData } from "./services/mockApi";
import type { TaskItem, PracticeFilters } from "./types";
import { AlertCircle, RefreshCcw } from "lucide-react";

import { FilterBar } from "./components/FilterBar";
import { UrgentTaskBanner } from "./components/UrgentTaskBanner";
import { TaskFeedGrid } from "./components/TaskFeedGrid";

export default function PracticeWorkspace() {
  const [filters, setFilters] = useState<PracticeFilters>({
    search: "",
    view: "All",
    status: "All",
    subject: "All Subjects",
  });
  
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    setError(null);

    fetchPracticeData(filters)
      .then((res) => {
        if (mounted) {
          setTasks(res);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          console.error("Failed to fetch practice data:", err);
          setError("Failed to load your workspace. Please try again.");
          setIsLoading(false);
        }
      });
      
    return () => { mounted = false; };
  }, [filters]);

  const handleRetry = () => {
    setFilters({ ...filters }); 
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 animate-in fade-in duration-500">
      
      {/* Header & Sticky Filter Bar */}
      <section className="space-y-6">
        <div className="px-4 sm:px-6 lg:px-8 pt-4">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
            Practice & Assignments
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl">
            Your centralized workspace for daily problems and weekly assignments.
          </p>
        </div>
        <FilterBar filters={filters} setFilters={setFilters} isLoading={isLoading} />
      </section>

      {/* Main Content Area */}
      <div className="px-4 sm:px-6 lg:px-8 space-y-12">
        {error && !isLoading ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-10 flex flex-col items-center justify-center text-center space-y-4">
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
        ) : (
          <>
            {/* Urgent Task Banner */}
            {!isLoading && tasks.length > 0 && (
              <section className="animate-in slide-in-from-bottom-4 duration-500">
                <UrgentTaskBanner tasks={tasks} />
              </section>
            )}

            {/* Unified Feed */}
            <section className="animate-in slide-in-from-bottom-8 duration-700">
              <TaskFeedGrid tasks={tasks} isLoading={isLoading} />
            </section>
          </>
        )}
      </div>

    </div>
  );
}
