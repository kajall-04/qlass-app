import { DashboardFilters } from "@/components/teacher/shared/DashboardFilters";
import { KPICards } from "@/components/teacher/dashboard/KPICards";
import { TodaySchedule } from "@/components/teacher/dashboard/TodaySchedule";
import { PerformanceOverview } from "@/components/teacher/dashboard/PerformanceOverview";
import { StudentInsightsChart } from "@/components/teacher/dashboard/StudentInsightsChart";
import { PendingTasks } from "@/components/teacher/dashboard/PendingTasks";
import { WeakStudents } from "@/components/teacher/dashboard/WeakStudents";
import { AiInsights } from "@/components/teacher/dashboard/AiInsights";
import { AttendanceChart } from "@/components/teacher/dashboard/AttendanceChart";
import { QuickActions } from "@/components/teacher/dashboard/QuickActions";
import { RecentAnnouncements } from "@/components/teacher/dashboard/RecentAnnouncements";
import { PageHeader } from "@/components/teacher/shared/PageHeader";

export default function TeacherDashboard() {
  return (
    <div className="flex flex-col min-h-full pb-8">
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <PageHeader
          title="Dashboard"
          subtitle="Your daily overview, tasks, progress, and upcoming academic activities."
          actions={<DashboardFilters showExport />}
        />

        {/* KPI Cards — 4 cols responsive */}
        <KPICards />

        {/* Row 2: Performance Chart + Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="lg:col-span-7">
            <StudentInsightsChart />
          </div>
          <div className="lg:col-span-5">
            <TodaySchedule />
          </div>
        </div>

        {/* Row 3: Class Performance + Attendance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="lg:col-span-7">
            <PerformanceOverview />
          </div>
          <div className="lg:col-span-5">
            <AttendanceChart />
          </div>
        </div>

        {/* Row 4: AI + Tasks + At Risk */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <AiInsights />
          <PendingTasks />
          <WeakStudents />
        </div>

        {/* Row 5: Quick Actions + Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <div className="lg:col-span-7">
            <QuickActions />
          </div>
          <div className="lg:col-span-5">
            <RecentAnnouncements />
          </div>
        </div>
      </div>
    </div>
  );
}
