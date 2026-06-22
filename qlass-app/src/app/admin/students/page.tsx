"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn, getPercentageColor } from "@/lib/utils";
import { Search, Filter, ChevronDown, Eye, Mail, Phone, AlertTriangle } from "lucide-react";

export default function AdminStudentsPage() {
  const data = useMemo(() => getSeedData(), []);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 15;

  const filtered = useMemo(() => {
    return data.students.filter(s => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.id.toLowerCase().includes(search.toLowerCase())) return false;
      if (classFilter && s.class !== classFilter) return false;
      if (riskFilter && s.riskLevel !== riskFilter) return false;
      return true;
    });
  }, [data.students, search, classFilter, riskFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const stats = useMemo(() => ({
    total: data.students.length,
    active: data.students.filter(s => s.status === "Active").length,
    atRisk: data.students.filter(s => s.riskLevel === "High" || s.riskLevel === "Critical").length,
    avgAttendance: Math.round(data.students.reduce((a, s) => a + s.attendance, 0) / data.students.length),
  }), [data.students]);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: stats.total, color: "text-blue-600" },
          { label: "Active", value: stats.active, color: "text-emerald-600" },
          { label: "At-Risk", value: stats.atRisk, color: "text-red-600" },
          { label: "Avg Attendance", value: `${stats.avgAttendance}%`, color: "text-violet-600" },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
            <div className={cn("text-2xl font-bold", s.color)}>{s.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search by name or ID..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>
          <select value={classFilter} onChange={e => { setClassFilter(e.target.value); setPage(1); }}
            className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none">
            <option value="">All Classes</option>
            {["8A","8B","9A","9B","10A","10B"].map(c => <option key={c} value={c}>Class {c}</option>)}
          </select>
          <select value={riskFilter} onChange={e => { setRiskFilter(e.target.value); setPage(1); }}
            className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none">
            <option value="">All Risk Levels</option>
            {["Low","Medium","High","Critical"].map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          {(search || classFilter || riskFilter) && (
            <button onClick={() => { setSearch(""); setClassFilter(""); setRiskFilter(""); setPage(1); }}
              className="px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-medium">Clear</button>
          )}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">{filtered.length} students found</div>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                {["Student", "Class", "Attendance", "Avg Score", "Pending DPP", "Risk", "Status"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map(s => (
                <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0", s.avatarColor)}>{s.initials}</div>
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">{s.name}</div>
                        <div className="text-xs text-slate-400">{s.id} · {s.email.split("@")[0]}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-md">{s.class}</span></td>
                  <td className="px-4 py-3"><span className={cn("text-sm font-semibold", getPercentageColor(s.attendance))}>{s.attendance}%</span></td>
                  <td className="px-4 py-3"><span className={cn("text-sm font-semibold", getPercentageColor(s.avgScore))}>{s.avgScore}</span></td>
                  <td className="px-4 py-3"><span className={cn("text-sm font-semibold", s.pendingDPP > 5 ? "text-red-600" : "text-slate-700 dark:text-slate-300")}>{s.pendingDPP}</span></td>
                  <td className="px-4 py-3">
                    <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full",
                      s.riskLevel === "Critical" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                      s.riskLevel === "High" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                      s.riskLevel === "Medium" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    )}>{s.riskLevel}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full",
                      s.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    )}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-500">Page {page} of {totalPages}</span>
          <div className="flex gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 disabled:opacity-50">Prev</button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
              return p <= totalPages ? (
                <button key={p} onClick={() => setPage(p)}
                  className={cn("w-8 h-8 text-xs font-medium rounded-lg", p === page ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200")}>{p}</button>
              ) : null;
            })}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 disabled:opacity-50">Next</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
