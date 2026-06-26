"use client";

import { useState, useMemo } from "react";
import { getDashboardData } from "@/services/dashboard.service";
import { ProgressBar } from "@/components/dashboard/progress-bar";
import { cn } from "@/lib/utils";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, BookOpen, AlertTriangle, CheckCircle2, Filter } from "lucide-react";
import type { SortField, SortDir } from "@/components/dashboard/academic-progress-table"; // Actually, I'll just define them here so it's self-contained

type SortFieldLocal = "className" | "subject" | "syllabusProgress" | "courseProgress" | "lectureCompletion" | "status";
type SortDirLocal = "asc" | "desc";

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  "On Track": { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-500" },
  "Needs Attention": { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-700 dark:text-amber-400", dot: "bg-amber-500" },
  "Behind Schedule": { bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-700 dark:text-red-400", dot: "bg-red-500" },
};

const PAGE_SIZE = 15;

export default function DetailedAcademicProgressPage() {
  const data = useMemo(() => getDashboardData({}).academicProgress, []);
  
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  const [sortField, setSortField] = useState<SortFieldLocal>("className");
  const [sortDir, setSortDir] = useState<SortDirLocal>("asc");
  const [page, setPage] = useState(0);

  // Stats calculation
  const stats = useMemo(() => {
    const total = data.length;
    const onTrack = data.filter(d => d.status === "On Track").length;
    const needsAttention = data.filter(d => d.status === "Needs Attention").length;
    const behindSchedule = data.filter(d => d.status === "Behind Schedule").length;
    
    const avgSyllabus = Math.round(data.reduce((acc, curr) => acc + curr.syllabusProgress, 0) / total);
    
    return { total, onTrack, needsAttention, behindSchedule, avgSyllabus };
  }, [data]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter(r => {
      if (q && !r.className.toLowerCase().includes(q) && !r.subject.toLowerCase().includes(q)) return false;
      if (classFilter && !r.className.includes(classFilter)) return false;
      if (subjectFilter && r.subject !== subjectFilter) return false;
      if (statusFilter && r.status !== statusFilter) return false;
      return true;
    });
  }, [data, search, classFilter, subjectFilter, statusFilter]);

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

  const toggleSort = (field: SortFieldLocal) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
    setPage(0);
  };

  const SortHeader = ({ field, children }: { field: SortFieldLocal; children: React.ReactNode }) => (
    <th onClick={() => toggleSort(field)}
      className="text-left text-xs font-bold text-slate-500 dark:text-slate-400 py-4 pr-4 cursor-pointer hover:text-slate-900 dark:hover:text-white select-none whitespace-nowrap transition-colors uppercase tracking-wider">
      <span className="inline-flex items-center gap-1.5">
        {children}
        <ArrowUpDown className={cn("w-3.5 h-3.5", sortField === field ? "text-blue-600" : "text-slate-300")} />
      </span>
    </th>
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Detailed Academic Progress</h1>
        <p className="text-sm font-semibold text-slate-500 mt-2">Comprehensive tracking of syllabus, course, and lecture completion across all classes.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center mb-3"><BookOpen className="w-5 h-5 text-white" /></div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{stats.avgSyllabus}%</div>
          <div className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Avg Syllabus Progress</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center mb-3"><CheckCircle2 className="w-5 h-5 text-white" /></div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{stats.onTrack}</div>
          <div className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Classes On Track</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center mb-3"><AlertTriangle className="w-5 h-5 text-white" /></div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{stats.needsAttention}</div>
          <div className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Needs Attention</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center mb-3"><AlertTriangle className="w-5 h-5 text-white" /></div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{stats.behindSchedule}</div>
          <div className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Behind Schedule</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-500">
            <Filter className="w-4 h-4" /> Filters
          </div>
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" value={search} onChange={e => {setSearch(e.target.value); setPage(0);}} placeholder="Search class or subject..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>
          <select value={classFilter} onChange={e => {setClassFilter(e.target.value); setPage(0);}} className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            <option value="">All Classes</option>
            {["8", "9", "10"].map(c => <option key={c} value={`Class ${c}`}>Class {c}</option>)}
          </select>
          <select value={subjectFilter} onChange={e => {setSubjectFilter(e.target.value); setPage(0);}} className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            <option value="">All Subjects</option>
            {["Mathematics","Physics","Chemistry","Biology","English","Hindi"].map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={statusFilter} onChange={e => {setStatusFilter(e.target.value); setPage(0);}} className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            <option value="">All Statuses</option>
            {["On Track","Needs Attention","Behind Schedule"].map(s => <option key={s}>{s}</option>)}
          </select>
          {(search || classFilter || subjectFilter || statusFilter) && (
            <button onClick={() => { setSearch(""); setClassFilter(""); setSubjectFilter(""); setStatusFilter(""); setPage(0); }}
              className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-bold transition-colors">Clear</button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="text-left text-xs font-bold text-slate-500 dark:text-slate-400 py-4 pl-6 pr-4 uppercase tracking-wider w-16">#</th>
                <SortHeader field="className">Class</SortHeader>
                <SortHeader field="subject">Subject</SortHeader>
                <SortHeader field="syllabusProgress">Syllabus Progress</SortHeader>
                <SortHeader field="courseProgress">Course Progress</SortHeader>
                <SortHeader field="lectureCompletion">Lectures</SortHeader>
                <th className="text-left text-xs font-bold text-slate-500 dark:text-slate-400 py-4 pr-4 uppercase tracking-wider whitespace-nowrap">Topics</th>
                <SortHeader field="status">Status</SortHeader>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr><td colSpan={8} className="py-12 text-center text-slate-500 font-semibold">No progress data found matching filters.</td></tr>
              ) : paged.map((row, i) => {
                const cfg = statusConfig[row.status];
                return (
                  <tr key={row.id} className="border-b border-slate-100 dark:border-slate-800/50 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 pl-6 pr-4 text-xs font-bold text-slate-400 tabular-nums">
                      {page * PAGE_SIZE + i + 1}
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-sm font-black text-slate-900 dark:text-white whitespace-nowrap">
                        {row.className}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-md whitespace-nowrap">
                        {row.subject}
                      </span>
                    </td>
                    <td className="py-4 pr-6 min-w-[160px]">
                      <div className="flex items-center gap-3">
                        <ProgressBar value={row.syllabusProgress} size="md" className="flex-1" />
                        <span className="text-sm font-black text-slate-700 dark:text-slate-300 tabular-nums w-10 text-right">
                          {row.syllabusProgress}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 pr-6 min-w-[160px]">
                      <div className="flex items-center gap-3">
                        <ProgressBar value={row.courseProgress} size="md" className="flex-1" />
                        <span className="text-sm font-black text-slate-700 dark:text-slate-300 tabular-nums w-10 text-right">
                          {row.courseProgress}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 pr-6 min-w-[160px]">
                      <div className="flex items-center gap-3">
                        <ProgressBar value={row.lectureCompletion} size="md" className="flex-1" />
                        <span className="text-sm font-black text-slate-700 dark:text-slate-300 tabular-nums w-10 text-right">
                          {row.lectureCompletion}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 pr-6">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300 tabular-nums whitespace-nowrap">
                        {row.completedTopics} / {row.totalTopics}
                      </span>
                    </td>
                    <td className="py-4 pr-6">
                      <span className={cn("inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full whitespace-nowrap uppercase tracking-wider", cfg.bg, cfg.text)}>
                        <span className={cn("w-2 h-2 rounded-full", cfg.dot)} />
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
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800/20 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Showing {page * PAGE_SIZE + 1} to {Math.min((page + 1) * PAGE_SIZE, sorted.length)} of {sorted.length} entries
            </span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-600 dark:text-slate-400">
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i)}
                  className={cn("w-9 h-9 rounded-xl text-xs font-bold transition-colors", page === i ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700")}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
                className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-600 dark:text-slate-400">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
