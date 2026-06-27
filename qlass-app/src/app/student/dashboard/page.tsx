"use client";

import { useState, useEffect } from "react";
import { DashboardFilters } from "./components/DashboardFilters";
import { SummaryCards } from "./components/SummaryCards";
import { LearningPlanTable } from "./components/LearningPlanTable";
import { PendingTasks } from "./components/PendingTasks";
import { ProgressChart } from "./components/ProgressChart";
import { PerformanceCharts } from "./components/PerformanceCharts";
import { QuickLinks } from "./components/QuickLinks";
import { UpcomingTest } from "./components/UpcomingTest";
import { Announcements } from "./components/Announcements";
import { fetchDashboardData } from "./services/mockApi";
import type { StudentDashboardData, DashboardFilters as FilterType } from "./types";

export default function StudentDashboard() {
  const [filters, setFilters] = useState<FilterType>({
    dateRange: "",
    quickFilter: "weekly",
    subject: "All Subjects",
  });
  
  const [data, setData] = useState<StudentDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data whenever filters change
  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    
    fetchDashboardData(filters)
      .then((res) => {
        if (mounted) {
          setData(res);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard data:", err);
        setIsLoading(false);
      });
      
    return () => { mounted = false; };
  }, [filters]);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 relative z-20">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Your daily learning overview, tasks, progress, and upcoming academic activities.</p>
        </div>
        <DashboardFilters filters={filters} setFilters={setFilters} />
      </div>

      {/* Row 1: Summary Cards */}
      <SummaryCards stats={data?.summary} isLoading={isLoading} />

      {/* Row 2: Learning Plan & Pending Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LearningPlanTable items={data?.learningPlan} isLoading={isLoading} />
        <PendingTasks tasks={data?.pendingTasks} isLoading={isLoading} />
      </div>

      {/* Row 3: Progress Snapshot & Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProgressChart progress={data?.progress} isLoading={isLoading} />
        <PerformanceCharts dppTrend={data?.dppTrend} testTrend={data?.testTrend} isLoading={isLoading} />
      </div>

      {/* Row 4: Quick Links & Upcoming Test */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickLinks />
        <UpcomingTest test={data?.upcomingTest} isLoading={isLoading} />
      </div>

      {/* Row 5: Announcements (Full Width in its container) */}
      <div className="grid grid-cols-1 gap-6">
        <Announcements items={data?.announcements} isLoading={isLoading} />
      </div>
    </div>
  );
}
