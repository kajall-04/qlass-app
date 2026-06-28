"use client";

import { useMemo, useState } from "react";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { Video, Upload, CheckCircle2, XCircle } from "lucide-react";
import { PageHeader } from "@/components/teacher/shared/PageHeader";
import { StatCard } from "@/components/teacher/shared/StatCard";
import { DataTable } from "@/components/teacher/shared/DataTable";
import { StatusBadge, getStatusBadgeVariant } from "@/components/teacher/shared/StatusBadge";
import { createColumnHelper } from "@tanstack/react-table";
import type { Lecture } from "@/types/index";

const columnHelper = createColumnHelper<Lecture>();

export default function TeacherLecturesPage() {
  const data = useMemo(() => getSeedData(), []);
  const teacher = data.teachers[0];
  const myLectures = data.getLecturesByTeacher(teacher.id).slice(0, 100);
  const [search, setSearch] = useState("");

  const totalRecorded = myLectures.filter(l => l.recordingStatus === "Available").length;
  const totalMissing = myLectures.filter(l => l.recordingStatus === "Missing").length;
  const avgCoverage = myLectures.length ? Math.round(myLectures.reduce((a, l) => a + l.topicCoverage, 0) / myLectures.length) : 0;

  const columns = useMemo(() => [
    columnHelper.accessor("title", {
      header: "Lecture",
      cell: info => (
        <div>
          <div className="text-sm font-medium text-slate-900 dark:text-white">{info.getValue()}</div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500">{info.row.original.subject}</div>
        </div>
      ),
    }),
    columnHelper.accessor("class", {
      header: "Class",
      cell: info => <span className="text-xs font-medium bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-600 dark:text-slate-400">{info.getValue()}</span>,
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: info => <span className="text-xs text-slate-500 dark:text-slate-400">{info.getValue()}</span>,
    }),
    columnHelper.accessor("duration", {
      header: "Duration",
      cell: info => <span className="text-xs text-slate-600 dark:text-slate-400 tabular-nums">{info.getValue()}</span>,
    }),
    columnHelper.accessor("recordingStatus", {
      header: "Recording",
      cell: info => <StatusBadge label={info.getValue()} variant={getStatusBadgeVariant(info.getValue())} />,
    }),
    columnHelper.accessor("topicCoverage", {
      header: "Coverage",
      cell: info => {
        const val = info.getValue();
        if (!val) return <span className="text-xs text-slate-400">—</span>;
        return (
          <div className="flex items-center gap-2">
            <div className="w-14 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className={cn("h-full rounded-full", val >= 80 ? "bg-emerald-500" : val >= 60 ? "bg-amber-500" : "bg-red-500")} style={{ width: `${val}%` }} />
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">{val}%</span>
          </div>
        );
      },
    }),
  ], []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      <PageHeader
        title="Lectures & Recordings"
        subtitle={`${myLectures.length} lectures across your classes`}
        search={{ value: search, onChange: setSearch, placeholder: "Search lectures..." }}
        actions={
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 active:scale-95">
            <Upload size={14} /> Upload
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Lectures" value={myLectures.length} icon={<Video size={20} />} iconBg="bg-blue-50 dark:bg-blue-900/20" iconColor="text-blue-600 dark:text-blue-400" delay={0} />
        <StatCard title="Recorded" value={totalRecorded} icon={<CheckCircle2 size={20} />} iconBg="bg-emerald-50 dark:bg-emerald-900/20" iconColor="text-emerald-600 dark:text-emerald-400" trend="up" delay={1} />
        <StatCard title="Missing" value={totalMissing} icon={<XCircle size={20} />} iconBg="bg-red-50 dark:bg-red-900/20" iconColor="text-red-600 dark:text-red-400" trend="down" delay={2} />
        <StatCard title="Avg Coverage" value={`${avgCoverage}%`} icon={<Video size={20} />} iconBg="bg-violet-50 dark:bg-violet-900/20" iconColor="text-violet-600 dark:text-violet-400" trend="up" delay={3} />
      </div>

      <DataTable
        data={myLectures}
        columns={columns}
        searchValue={search}
        pageSize={12}
        emptyIcon={<Video size={28} />}
        emptyTitle="No lectures found"
      />
    </div>
  );
}
