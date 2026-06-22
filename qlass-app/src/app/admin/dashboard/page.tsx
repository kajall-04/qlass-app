"use client";

import { Suspense, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDashboardFilterStore } from "@/store/filter-store";
import { getDashboardData } from "@/services/dashboard.service";

// Components
import { KPICard, KPICardSkeleton } from "@/components/dashboard/kpi-card";
import { GlobalFilterBar } from "@/components/dashboard/global-filter-bar";
import { AcademicProgressTable } from "@/components/dashboard/academic-progress-table";
import { PerformanceInsights } from "@/components/dashboard/performance-insights";
import { StudentEngagement } from "@/components/dashboard/student-engagement";
import { AttentionRequired } from "@/components/dashboard/attention-required";
import { WeakTopics } from "@/components/dashboard/weak-topics";
import { RecentAnnouncements } from "@/components/dashboard/recent-announcements";
import { TopClassLeaderboard, LowClassLeaderboard } from "@/components/dashboard/class-leaderboard";

/** Loading skeleton for the dashboard */
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
        {Array.from({ length: 8 }, (_, i) => (
          <KPICardSkeleton key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <div className="skeleton h-4 w-48 mb-4" />
          <div className="skeleton h-64 w-full" />
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <div className="skeleton h-4 w-48 mb-4" />
          <div className="skeleton h-64 w-full" />
        </div>
      </div>
    </div>
  );
}

/** Inner component that uses useSearchParams */
function DashboardContent() {
  const searchParams = useSearchParams();
  const { classFilter, subjectFilter, timePeriod, initFromURL } =
    useDashboardFilterStore();

  // Initialize filters from URL on mount
  useEffect(() => {
    initFromURL(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Compute all dashboard data based on current filters
  const data = useMemo(
    () =>
      getDashboardData({
        classFilter,
        subjectFilter,
        timePeriod,
      }),
    [classFilter, subjectFilter, timePeriod]
  );

  return (
    <div className="space-y-6">
      {/* ═══════════════════════════════════════
           SECTION 1 — KPI ROW (8 Cards)
           ═══════════════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
        {data.kpis.map((kpi, i) => (
          <KPICard key={kpi.id} data={kpi} index={i} />
        ))}
      </div>

      {/* ═══════════════════════════════════════
           GLOBAL FILTER BAR
           ═══════════════════════════════════════ */}
      <div className="sticky top-16 z-20 bg-slate-50/90 dark:bg-[#0B1120]/90 backdrop-blur-md -mx-4 sm:-mx-6 px-4 sm:px-6 border-b border-slate-200/60 dark:border-slate-800/60">
        <GlobalFilterBar />
      </div>

      {/* ═══════════════════════════════════════
           SECTION 2 — DASHBOARD GRID
           ═══════════════════════════════════════ */}

      {/* Row 1: Academic Progress (wide) + Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AcademicProgressTable data={data.academicProgress} />
        <PerformanceInsights data={data.performanceInsights} />
      </div>

      {/* Row 2: Student Engagement + Attention Required */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StudentEngagement data={data.studentEngagement} />
        <AttentionRequired data={data.alerts} />
      </div>

      {/* Row 3: Weak Topics + Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WeakTopics data={data.weakTopics} />
        <RecentAnnouncements data={data.announcements} />
      </div>

      {/* Row 4: Top Classes + Low Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopClassLeaderboard data={data.topClasses} />
        <LowClassLeaderboard data={data.lowClasses} />
      </div>
    </div>
  );
}

/** Page export — wraps in Suspense for useSearchParams */
export default function AdminDashboard() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
