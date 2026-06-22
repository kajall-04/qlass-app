"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { Search, Star, TrendingUp, Video, FileText, Users } from "lucide-react";

export default function AdminTeachersPage() {
  const data = useMemo(() => getSeedData(), []);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    return data.teachers.filter(t => {
      if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (subjectFilter && !t.subjects.includes(subjectFilter)) return false;
      if (statusFilter && t.status !== statusFilter) return false;
      return true;
    });
  }, [data.teachers, search, subjectFilter, statusFilter]);

  const stats = useMemo(() => ({
    total: data.teachers.length,
    active: data.teachers.filter(t => t.status === "Active").length,
    avgAudit: Math.round(data.teachers.reduce((a, t) => a + t.auditScore, 0) / data.teachers.length),
    avgLecture: Math.round(data.teachers.reduce((a, t) => a + t.lectureCompletion, 0) / data.teachers.length),
  }), [data.teachers]);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Teachers", value: stats.total, icon: Users, iconBg: "bg-violet-600" },
          { label: "Active", value: stats.active, icon: Star, iconBg: "bg-emerald-600" },
          { label: "Avg Audit Score", value: stats.avgAudit, icon: TrendingUp, iconBg: "bg-blue-600" },
          { label: "Avg Lecture %", value: `${stats.avgLecture}%`, icon: Video, iconBg: "bg-amber-600" },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-2", s.iconBg)}><s.icon className="w-4 h-4 text-white" /></div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search teachers..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>
          <select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm">
            <option value="">All Subjects</option>
            {["Mathematics","Physics","Chemistry","Biology","English","Hindi","Computer Science"].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm">
            <option value="">All Status</option>
            {["Active","On Leave","Probation"].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Teacher Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md transition-shadow group cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold", t.avatarColor)}>{t.initials}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">{t.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{t.subjects.join(", ")}</div>
              </div>
              <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full shrink-0",
                t.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                t.status === "On Leave" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              )}>{t.status}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "Audit Score", value: t.auditScore, color: t.auditScore >= 80 ? "text-emerald-600" : t.auditScore >= 60 ? "text-blue-600" : "text-red-600" },
                { label: "Lectures", value: `${t.lectureCompletion}%`, color: "text-blue-600" },
                { label: "Students", value: t.totalStudents, color: "text-violet-600" },
                { label: "DPP Rate", value: `${t.dppAssignmentRate}%`, color: "text-amber-600" },
              ].map(s => (
                <div key={s.label}>
                  <div className={cn("text-base font-bold", s.color)}>{s.value}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1">
              {t.classes.map(c => (
                <span key={c} className="text-[10px] font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                  Class {c}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
