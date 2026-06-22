"use client";

import { useState, useMemo } from "react";
import { DashboardCard } from "./dashboard-card";
import { ProgressBar } from "./progress-bar";
import { cn } from "@/lib/utils";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ExternalLink } from "lucide-react";
import type { AcademicProgressRow, ProgressStatus } from "@/types/dashboard";

interface AcademicProgressTableProps {
  data: AcademicProgressRow[];
}

const statusConfig: Record<ProgressStatus, { bg: string; text: string; dot: string }> = {
  "On Track": {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    text: "text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  "Needs Attention": {
    bg: "bg-amber-50 dark:bg-amber-900/20",
    text: "text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  "Behind Schedule": {
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-700 dark:text-red-400",
    dot: "bg-red-500",
  },
};

type SortField = "className" | "subject" | "syllabusProgress" | "courseProgress" | "lectureCompletion" | "status";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 8;

export function AcademicProgressTable({ data }: AcademicProgressTableProps) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("syllabusProgress");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter(
      (r) =>
        r.className.toLowerCase().includes(q) ||
        r.subject.toLowerCase().includes(q)
    );
  }, [data, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filtered, sortField, sortDir]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paged = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
    setPage(0);
  };

  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th
      onClick={() => toggleSort(field)}
      className="text-left text-[11px] font-semibold text-slate-500 dark:text-slate-400 pb-3 pr-3 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 select-none whitespace-nowrap"
    >
      <span className="inline-flex items-center gap-1">
        {children}
        <ArrowUpDown className={cn("w-3 h-3", sortField === field ? "text-blue-600" : "text-slate-300")} />
      </span>
    </th>
  );

  return (
    <DashboardCard
      title="Academic Progress Overview"
      noPadding
      delay={0.2}
      action={
        <button className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors">
          View Detailed Progress
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      }
    >
      {/* Search */}
      <div className="px-5 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by class or subject…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-y border-slate-100 dark:border-slate-800">
              <th className="text-left text-[11px] font-semibold text-slate-500 dark:text-slate-400 pb-3 pt-3 pl-5 pr-3">
                #
              </th>
              <SortHeader field="className">Class</SortHeader>
              <SortHeader field="subject">Subject</SortHeader>
              <SortHeader field="syllabusProgress">Syllabus</SortHeader>
              <SortHeader field="courseProgress">Course</SortHeader>
              <SortHeader field="lectureCompletion">Lectures</SortHeader>
              <th className="text-left text-[11px] font-semibold text-slate-500 dark:text-slate-400 pb-3 pt-3 pr-3 whitespace-nowrap">
                Topics
              </th>
              <SortHeader field="status">Status</SortHeader>
            </tr>
          </thead>
          <tbody>
            {paged.map((row, i) => {
              const cfg = statusConfig[row.status];
              return (
                <tr
                  key={row.id}
                  className="border-b border-slate-50 dark:border-slate-800/50 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-3 pl-5 pr-3 text-xs text-slate-400 tabular-nums">
                    {page * PAGE_SIZE + i + 1}
                  </td>
                  <td className="py-3 pr-3">
                    <span className="text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap">
                      {row.className}
                    </span>
                  </td>
                  <td className="py-3 pr-3">
                    <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-md whitespace-nowrap">
                      {row.subject}
                    </span>
                  </td>
                  <td className="py-3 pr-3 min-w-[120px]">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={row.syllabusProgress} size="sm" className="flex-1" />
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 tabular-nums">
                        {row.syllabusProgress}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-3 min-w-[120px]">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={row.courseProgress} size="sm" className="flex-1" />
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 tabular-nums">
                        {row.courseProgress}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-3 min-w-[120px]">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={row.lectureCompletion} size="sm" className="flex-1" />
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 tabular-nums">
                        {row.lectureCompletion}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-3">
                    <span className="text-sm text-slate-700 dark:text-slate-300 tabular-nums whitespace-nowrap">
                      {row.completedTopics}/{row.totalTopics}
                    </span>
                  </td>
                  <td className="py-3 pr-5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap",
                        cfg.bg,
                        cfg.text
                      )}
                    >
                      <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
                      {row.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, sorted.length)} of{" "}
            {sorted.length} entries
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={cn(
                  "w-7 h-7 rounded-lg text-xs font-medium transition-colors",
                  page === i
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>
      )}
    </DashboardCard>
  );
}
