"use client";

import { useMemo, useState } from "react";
import { getSeedData } from "@/data/seed";
import { cn, getPercentageColor } from "@/lib/utils";
import { Search, Users, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/teacher/shared/PageHeader";
import { StatCard } from "@/components/teacher/shared/StatCard";
import { StatusBadge, getRiskBadgeVariant } from "@/components/teacher/shared/StatusBadge";
import { DataTable } from "@/components/teacher/shared/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import type { Student } from "@/types/student";

const columnHelper = createColumnHelper<Student>();

export default function TeacherStudentsPage() {
  const data = useMemo(() => getSeedData(), []);
  const teacher = data.teachers[0];
  const myStudents = data.students.filter(s => teacher.classes.includes(s.class));
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");

  const filtered = myStudents.filter(s => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (classFilter && s.class !== classFilter) return false;
    return true;
  });

  const atRisk = myStudents.filter(s => s.riskLevel === "Critical" || s.riskLevel === "High").length;
  const avgAtt = myStudents.length ? Math.round(myStudents.reduce((a, s) => a + s.attendance, 0) / myStudents.length) : 0;
  const avgScore = myStudents.length ? Math.round(myStudents.reduce((a, s) => a + s.avgScore, 0) / myStudents.length) : 0;

  const columns = useMemo(() => [
    columnHelper.accessor("name", {
      header: "Student",
      cell: info => (
        <div className="flex items-center gap-2.5">
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0", info.row.original.avatarColor)}>
            {info.row.original.initials}
          </div>
          <div>
            <div className="text-sm font-medium text-slate-900 dark:text-white">{info.getValue()}</div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500">{info.row.original.id}</div>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("class", {
      header: "Class",
      cell: info => <span className="text-xs font-medium bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-600 dark:text-slate-400">{info.getValue()}</span>,
    }),
    columnHelper.accessor("attendance", {
      header: "Attendance",
      cell: info => <span className={cn("text-sm font-semibold tabular-nums", getPercentageColor(info.getValue()))}>{info.getValue()}%</span>,
    }),
    columnHelper.accessor("avgScore", {
      header: "Avg Score",
      cell: info => <span className={cn("text-sm font-semibold tabular-nums", getPercentageColor(info.getValue()))}>{info.getValue()}</span>,
    }),
    columnHelper.accessor("pendingDPP", {
      header: "Pending DPP",
      cell: info => <span className="text-sm font-medium text-slate-700 dark:text-slate-300 tabular-nums">{info.getValue()}</span>,
    }),
    columnHelper.accessor("riskLevel", {
      header: "Risk",
      cell: info => <StatusBadge label={info.getValue()} variant={getRiskBadgeVariant(info.getValue())} />,
    }),
  ], []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      <PageHeader
        title="Students"
        subtitle={`${myStudents.length} students across your classes`}
        search={{ value: search, onChange: setSearch, placeholder: "Search students..." }}
        actions={
          <select
            value={classFilter}
            onChange={e => setClassFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">All Classes</option>
            {teacher.classes.map(c => <option key={c} value={c}>Class {c}</option>)}
          </select>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Students" value={myStudents.length} icon={<Users size={20} />} iconBg="bg-blue-50 dark:bg-blue-900/20" iconColor="text-blue-600 dark:text-blue-400" trend="up" trendValue="+12" delay={0} />
        <StatCard title="At Risk" value={atRisk} icon={<AlertTriangle size={20} />} iconBg="bg-red-50 dark:bg-red-900/20" iconColor="text-red-600 dark:text-red-400" trend="down" trendValue="-3" delay={1} />
        <StatCard title="Avg Attendance" value={`${avgAtt}%`} icon={<CheckCircle2 size={20} />} iconBg="bg-emerald-50 dark:bg-emerald-900/20" iconColor="text-emerald-600 dark:text-emerald-400" trend="up" trendValue="+2%" delay={2} />
        <StatCard title="Avg Score" value={avgScore} icon={<TrendingUp size={20} />} iconBg="bg-violet-50 dark:bg-violet-900/20" iconColor="text-violet-600 dark:text-violet-400" trend="up" trendValue="+1.5" delay={3} />
      </div>

      {/* Table */}
      <DataTable
        data={filtered}
        columns={columns}
        searchValue={search}
        pageSize={15}
        emptyIcon={<Users size={28} />}
        emptyTitle="No students found"
        emptyDescription="Try adjusting your search or filters"
      />
    </div>
  );
}
