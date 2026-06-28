"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useTeacherStore } from "@/store/teacherStore";
import { mockClassPerformance } from "@/lib/dummyData";
import { StatusBadge, getStatusBadgeVariant } from "@/components/teacher/shared/StatusBadge";
import { BarChart3, ChevronRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function PerformanceOverview() {
  const { selectedClass } = useTeacherStore();

  const filteredPerformance = useMemo(() => {
    return mockClassPerformance.filter(item => {
      return selectedClass === "all" || item.classId === selectedClass;
    });
  }, [selectedClass]);

  const getBarColor = (val: number) => {
    if (val >= 90) return "bg-emerald-500";
    if (val >= 80) return "bg-blue-500";
    if (val >= 70) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden shadow-sm">
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <BarChart3 size={16} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-white tracking-tight">Class Performance</h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Overview of assigned classes</p>
          </div>
        </div>
        <Link
          href="/teacher/classes"
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
        >
          Details <ChevronRight size={14} />
        </Link>
      </div>

      <div className="overflow-x-auto">
        {filteredPerformance.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400 dark:text-slate-600">
            <BarChart3 size={32} className="mb-2 opacity-30" />
            <p className="text-xs font-medium">No data for selected filters</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                {["Class", "Students", "Attendance", "Avg Marks", "DPP Rate", "Status"].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPerformance.map(row => (
                <tr key={row.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-semibold text-slate-800 dark:text-white">{row.classId}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                      <Users size={13} className="text-slate-400 dark:text-slate-500" />
                      {row.totalStudents}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 w-10 tabular-nums">{row.attendancePct}%</span>
                      <div className="h-1.5 w-16 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full transition-all duration-500", getBarColor(row.attendancePct))} style={{ width: `${row.attendancePct}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 tabular-nums">{row.avgMarks}%</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 tabular-nums">{row.dppCompletionPct}%</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge
                      label={row.status === "on-track" ? "On Track" : row.status === "needs-attention" ? "Attention" : "At Risk"}
                      variant={getStatusBadgeVariant(row.status)}
                      size="sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
