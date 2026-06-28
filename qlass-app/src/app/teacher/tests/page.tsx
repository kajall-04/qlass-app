"use client";

import { useMemo, useState } from "react";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { ClipboardList, Plus, CheckCircle2, Calendar, BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/teacher/shared/PageHeader";
import { StatCard } from "@/components/teacher/shared/StatCard";
import { DataTable } from "@/components/teacher/shared/DataTable";
import { StatusBadge, getStatusBadgeVariant } from "@/components/teacher/shared/StatusBadge";
import { createColumnHelper } from "@tanstack/react-table";
import type { Test } from "@/types/index";

const columnHelper = createColumnHelper<Test>();

export default function TeacherTestsPage() {
  const data = useMemo(() => getSeedData(), []);
  const teacher = data.teachers[0];
  const myTests = data.getTestsByTeacher(teacher.id).slice(0, 40);
  const [search, setSearch] = useState("");

  const upcoming = myTests.filter(t => t.status === "Upcoming").length;
  const avgScore = myTests.length ? Math.round(myTests.reduce((a, t) => a + t.avgScore, 0) / myTests.length) : 0;
  const avgPass = myTests.length ? Math.round(myTests.reduce((a, t) => a + t.passPercentage, 0) / myTests.length) : 0;

  const columns = useMemo(() => [
    columnHelper.accessor("name", {
      header: "Test",
      cell: info => <span className="text-sm font-medium text-slate-900 dark:text-white">{info.getValue()}</span>,
    }),
    columnHelper.accessor("class", {
      header: "Class",
      cell: info => <span className="text-xs font-medium bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-600 dark:text-slate-400">{info.getValue()}</span>,
    }),
    columnHelper.accessor("subject", {
      header: "Subject",
      cell: info => <span className="text-xs text-slate-600 dark:text-slate-400">{info.getValue()}</span>,
    }),
    columnHelper.accessor("type", {
      header: "Type",
      cell: info => <StatusBadge label={info.getValue()} variant="purple" />,
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: info => <span className="text-xs text-slate-500 dark:text-slate-400">{info.getValue()}</span>,
    }),
    columnHelper.accessor("avgScore", {
      header: "Avg",
      cell: info => (
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
          {info.getValue()}/{info.row.original.maxMarks}
        </span>
      ),
    }),
    columnHelper.accessor("passPercentage", {
      header: "Pass %",
      cell: info => {
        const val = info.getValue();
        return (
          <span className={cn("text-sm font-semibold tabular-nums", val >= 80 ? "text-emerald-600" : val >= 60 ? "text-blue-600" : "text-red-600")}>
            {val}%
          </span>
        );
      },
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: info => <StatusBadge label={info.getValue()} variant={getStatusBadgeVariant(info.getValue())} />,
    }),
  ], []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      <PageHeader
        title="Tests & Exams"
        subtitle={`${myTests.length} tests across your classes`}
        search={{ value: search, onChange: setSearch, placeholder: "Search tests..." }}
        actions={
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 active:scale-95">
            <Plus size={14} /> Create Test
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Tests" value={myTests.length} icon={<ClipboardList size={20} />} iconBg="bg-blue-50 dark:bg-blue-900/20" iconColor="text-blue-600 dark:text-blue-400" delay={0} />
        <StatCard title="Upcoming" value={upcoming} icon={<Calendar size={20} />} iconBg="bg-amber-50 dark:bg-amber-900/20" iconColor="text-amber-600 dark:text-amber-400" delay={1} />
        <StatCard title="Avg Score" value={avgScore} icon={<BarChart3 size={20} />} iconBg="bg-violet-50 dark:bg-violet-900/20" iconColor="text-violet-600 dark:text-violet-400" trend="up" delay={2} />
        <StatCard title="Avg Pass %" value={`${avgPass}%`} icon={<CheckCircle2 size={20} />} iconBg="bg-emerald-50 dark:bg-emerald-900/20" iconColor="text-emerald-600 dark:text-emerald-400" trend="up" delay={3} />
      </div>

      <DataTable
        data={myTests}
        columns={columns}
        searchValue={search}
        pageSize={12}
        emptyIcon={<ClipboardList size={28} />}
        emptyTitle="No tests found"
      />
    </div>
  );
}
