"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn, getPercentageColor } from "@/lib/utils";
import { Search, Filter, Eye, Mail, Phone, AlertTriangle, Users, Star, TrendingUp, Video, X, BookOpen, Clock, Calendar, CheckCircle2 } from "lucide-react";

export default function AdminTeachersPage() {
  const data = useMemo(() => getSeedData(), []);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedTeacher, setSelectedTeacher] = useState<any | null>(null);
  
  const perPage = 15;

  const filtered = useMemo(() => {
    return data.teachers.filter(t => {
      if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.id.toLowerCase().includes(search.toLowerCase())) return false;
      if (subjectFilter && !t.subjects.includes(subjectFilter)) return false;
      if (classFilter && !t.classes.includes(classFilter)) return false;
      if (statusFilter && t.status !== statusFilter) return false;
      return true;
    });
  }, [data.teachers, search, subjectFilter, classFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const stats = useMemo(() => ({
    total: data.teachers.length,
    active: data.teachers.filter(t => t.status === "Active").length,
    avgAudit: Math.round(data.teachers.reduce((a, t) => a + t.auditScore, 0) / data.teachers.length),
    avgLecture: Math.round(data.teachers.reduce((a, t) => a + t.lectureCompletion, 0) / data.teachers.length),
  }), [data.teachers]);

  const allClasses = ["8A","8B","9A","9B","10A","10B"];
  const allSubjects = ["Mathematics","Physics","Chemistry","Biology","English","Hindi","Computer Science"];

  return (
    <div className="space-y-6 pb-12">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Teachers", value: stats.total, icon: Users, iconBg: "bg-violet-600" },
          { label: "Active", value: stats.active, icon: Star, iconBg: "bg-emerald-600" },
          { label: "Avg Audit Score", value: stats.avgAudit, icon: TrendingUp, iconBg: "bg-blue-600" },
          { label: "Avg Attendance %", value: `${stats.avgLecture}%`, icon: Video, iconBg: "bg-amber-600" },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", s.iconBg)}>
                <s.icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search by name or Teacher ID..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>
          <select value={subjectFilter} onChange={e => { setSubjectFilter(e.target.value); setPage(1); }}
            className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            <option value="">All Subjects</option>
            {allSubjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={classFilter} onChange={e => { setClassFilter(e.target.value); setPage(1); }}
            className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            <option value="">All Classes</option>
            {allClasses.map(c => <option key={c} value={c}>Class {c}</option>)}
          </select>
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            <option value="">All Status</option>
            {["Active","On Leave","Probation"].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {(search || subjectFilter || classFilter || statusFilter) && (
            <button onClick={() => { setSearch(""); setSubjectFilter(""); setClassFilter(""); setStatusFilter(""); setPage(1); }}
              className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-bold transition-colors">Clear</button>
          )}
        </div>
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-3">{filtered.length} teachers found</div>
      </div>

      {/* Data Table */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                {["Teacher", "Subjects", "Classes", "Audit Score", "Attendance %", "Students", "Status", ""].map(h => (
                  <th key={h} className="text-left text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map(t => (
                <tr key={t.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-sm shrink-0", t.avatarColor)}>{t.initials}</div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</div>
                        <div className="text-[11px] font-semibold text-slate-400">{t.id} &middot; {t.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300">{t.subjects.join(", ")}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {t.classes.slice(0, 3).map((c: string) => (
                        <span key={c} className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded-md">{c}</span>
                      ))}
                      {t.classes.length > 3 && <span className="text-[10px] font-bold text-slate-400">+{t.classes.length - 3}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className={cn("text-sm font-black", getPercentageColor(t.auditScore))}>{t.auditScore}</span></td>
                  <td className="px-4 py-3"><span className={cn("text-sm font-black", getPercentageColor(t.lectureCompletion))}>{t.lectureCompletion}%</span></td>
                  <td className="px-4 py-3"><span className="text-sm font-bold text-slate-600 dark:text-slate-300">{t.totalStudents}</span></td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-full",
                      t.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                      t.status === "On Leave" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    )}>{t.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedTeacher(t)}
                      className="px-2.5 py-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-lg transition-colors inline-flex items-center gap-1.5 text-xs font-bold"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-sm font-medium text-slate-500">No teachers found matching your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500">Page {page} of {totalPages}</span>
            <div className="flex gap-1.5">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 disabled:opacity-50">Prev</button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                return p <= totalPages ? (
                  <button key={p} onClick={() => setPage(p)}
                    className={cn("w-8 h-8 text-xs font-bold rounded-lg", p === page ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200")}>{p}</button>
                ) : null;
              })}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Teacher Details Slide-Over */}
      <AnimatePresence>
        {selectedTeacher && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTeacher(null)}
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
                <h2 className="text-lg font-black text-slate-900 dark:text-white">Teacher Details</h2>
                <button 
                  onClick={() => setSelectedTeacher(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Profile Card */}
                <div className="flex items-center gap-5">
                  <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-xl", selectedTeacher.avatarColor)}>
                    {selectedTeacher.initials}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{selectedTeacher.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-[10px] font-black bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 uppercase tracking-wider rounded-md">
                        {selectedTeacher.id}
                      </span>
                      <span className={cn("text-[10px] font-black px-2 py-1 uppercase tracking-wider rounded-md",
                        selectedTeacher.status === "Active" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" :
                        selectedTeacher.status === "On Leave" ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400" :
                        "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                      )}>
                        {selectedTeacher.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Qualification</div>
                    <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{selectedTeacher.qualification}</div>
                  </div>
                  <div className="w-px bg-slate-200 dark:bg-slate-700" />
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Experience</div>
                    <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{selectedTeacher.experience}</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Details</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Phone className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Phone</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-slate-200">{selectedTeacher.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                      <div className="p-2 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                        <Mail className="w-4 h-4 text-violet-500" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-slate-200">{selectedTeacher.email}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* KPI Snapshot */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance KPIs</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/10 dark:to-blue-900/10 border border-indigo-100 dark:border-indigo-800/30">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-indigo-500" />
                        <span className="text-[10px] font-black text-indigo-700/70 dark:text-indigo-400/70 uppercase tracking-wider">Audit Score</span>
                      </div>
                      <div className="text-3xl font-black text-indigo-700 dark:text-indigo-400">{selectedTeacher.auditScore}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 border border-emerald-100 dark:border-emerald-800/30">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-[10px] font-black text-emerald-700/70 dark:text-emerald-400/70 uppercase tracking-wider">Attendance</span>
                      </div>
                      <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400">{selectedTeacher.lectureCompletion}%</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-100 dark:border-amber-800/30">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-amber-500" />
                        <span className="text-[10px] font-black text-amber-700/70 dark:text-amber-400/70 uppercase tracking-wider">DPP Rate</span>
                      </div>
                      <div className="text-3xl font-black text-amber-700 dark:text-amber-400">{selectedTeacher.dppAssignmentRate}%</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/10 dark:to-fuchsia-900/10 border border-violet-100 dark:border-violet-800/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-violet-500" />
                        <span className="text-[10px] font-black text-violet-700/70 dark:text-violet-400/70 uppercase tracking-wider">Students</span>
                      </div>
                      <div className="text-3xl font-black text-violet-700 dark:text-violet-400">{selectedTeacher.totalStudents}</div>
                    </div>
                  </div>
                </div>

                {/* Today's Schedule */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Today's Schedule</h4>
                  <div className="space-y-0 relative">
                    <div className="absolute top-4 bottom-4 left-4 w-0.5 bg-slate-200 dark:bg-slate-800 z-0" />
                    {selectedTeacher.todayClasses.map((cls: any, i: number) => (
                      <div key={cls.id} className="relative z-10 flex gap-4 p-2">
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-4 border-white dark:border-slate-900",
                          cls.status === "Completed" ? "bg-emerald-500" :
                          cls.status === "Ongoing" ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-700"
                        )}>
                          {cls.status === "Completed" ? <CheckCircle2 className="w-4 h-4 text-white" /> :
                           cls.status === "Ongoing" ? <Clock className="w-4 h-4 text-white" /> :
                           <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />}
                        </div>
                        <div className="flex-1 bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-bold text-sm text-slate-900 dark:text-white">{cls.subject}</div>
                            <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                              cls.status === "Completed" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                              cls.status === "Ongoing" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 animate-pulse" : 
                              "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                            )}>
                              {cls.status}
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-slate-500 flex items-center gap-2">
                            <Clock className="w-3 h-3" /> {cls.time}
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md">Class {cls.class}</span>
                            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md">{cls.room}</span>
                          </div>
                        </div>
                      </div>
                    ))}
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
