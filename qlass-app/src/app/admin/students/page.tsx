"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn, getPercentageColor } from "@/lib/utils";
import { Search, Filter, ChevronDown, Eye, Mail, Phone, AlertTriangle, X, User, MapPin, GraduationCap } from "lucide-react";

export default function AdminStudentsPage() {
  const data = useMemo(() => getSeedData(), []);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
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
                {["Student", "Class", "Attendance", "Avg Score", "Pending DPP", "Risk", "Status", ""].map(h => (
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
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedStudent(s)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-lg transition-colors inline-flex items-center gap-1.5 text-xs font-semibold"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
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

      {/* Student Details Slide-Over */}
      <AnimatePresence>
        {selectedStudent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStudent(null)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Student Details</h2>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Profile Card */}
                <div className="flex items-center gap-5">
                  <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg", selectedStudent.avatarColor)}>
                    {selectedStudent.initials}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">{selectedStudent.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2.5 py-1 rounded-md">
                        {selectedStudent.id}
                      </span>
                      <span className="text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 px-2.5 py-1 rounded-md">
                        Class {selectedStudent.class}
                      </span>
                      <span className="text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 px-2.5 py-1 rounded-md">
                        Roll: {selectedStudent.rollNumber}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Badges row */}
                <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-6">
                  <div className={cn("px-4 py-2 rounded-xl text-sm font-bold flex-1 text-center",
                    selectedStudent.status === "Active" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-slate-50 text-slate-600"
                  )}>
                    {selectedStudent.status} Student
                  </div>
                  <div className={cn("px-4 py-2 rounded-xl text-sm font-bold flex-1 text-center",
                    selectedStudent.riskLevel === "Critical" ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400" :
                    selectedStudent.riskLevel === "High" ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400" :
                    selectedStudent.riskLevel === "Medium" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" :
                    "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                  )}>
                    {selectedStudent.riskLevel} Risk
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Student Contact</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <Phone className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone</div>
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{selectedStudent.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <Mail className="w-4 h-4 text-violet-500" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</div>
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{selectedStudent.email}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parent Details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Parent Details</h4>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/10 dark:to-blue-900/10 border border-indigo-100 dark:border-indigo-900/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center">
                        <User className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{selectedStudent.parentName}</div>
                        <div className="text-xs font-medium text-slate-500">Primary Contact</div>
                      </div>
                    </div>
                    <div className="space-y-3 pl-1">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{selectedStudent.parentPhone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{selectedStudent.parentEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Snapshot */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Academic Snapshot</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
                      <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-1">{selectedStudent.attendance}%</div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance</div>
                    </div>
                    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
                      <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-1">{selectedStudent.avgScore}%</div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Score</div>
                    </div>
                    <div className="col-span-2 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Weak Topics</span>
                        <span className="text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-md">
                          {selectedStudent.weakTopics.length} detected
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedStudent.weakTopics.length > 0 ? (
                          selectedStudent.weakTopics.map((wt: string) => (
                            <span key={wt} className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full">
                              {wt}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-slate-400">No weak topics detected.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
