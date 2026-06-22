"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { Search, Video, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function AdminLecturesPage() {
  const data = useMemo(() => getSeedData(), []);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    return data.lectures.filter(l => {
      if (search && !l.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (classFilter && l.class !== classFilter) return false;
      if (subjectFilter && l.subject !== subjectFilter) return false;
      if (statusFilter && l.status !== statusFilter) return false;
      return true;
    }).slice(0, 50);
  }, [data.lectures, search, classFilter, subjectFilter, statusFilter]);

  const stats = {
    total: data.lectures.length,
    completed: data.lectures.filter(l => l.status === "Completed").length,
    withRecording: data.lectures.filter(l => l.hasRecording).length,
    missing: data.lectures.filter(l => l.recordingStatus === "Missing").length,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Lectures", value: stats.total, icon: Video, bg: "bg-blue-600" },
          { label: "Completed", value: stats.completed, icon: CheckCircle2, bg: "bg-emerald-600" },
          { label: "Recordings Available", value: stats.withRecording, icon: Video, bg: "bg-violet-600" },
          { label: "Recordings Missing", value: stats.missing, icon: XCircle, bg: "bg-red-600" },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-2", s.bg)}><s.icon className="w-4 h-4 text-white" /></div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search lectures..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <select value={classFilter} onChange={e => setClassFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm">
            <option value="">All Classes</option>
            {["8A","8B","9A","9B","10A","10B"].map(c => <option key={c} value={c}>Class {c}</option>)}
          </select>
          <select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm">
            <option value="">All Subjects</option>
            {["Mathematics","Physics","Chemistry","English","Computer Science"].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm">
            <option value="">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                {["Lecture","Subject","Class","Teacher","Date","Recording","Coverage"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="px-4 py-3"><div className="text-sm font-medium text-slate-900 dark:text-white">{l.title}</div></td>
                  <td className="px-4 py-3"><span className="text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-2 py-1 rounded-md">{l.subject}</span></td>
                  <td className="px-4 py-3"><span className="text-xs text-slate-600 dark:text-slate-400">{l.class}</span></td>
                  <td className="px-4 py-3"><span className="text-xs text-slate-600 dark:text-slate-400">{l.teacher}</span></td>
                  <td className="px-4 py-3"><span className="text-xs text-slate-500">{l.date}</span></td>
                  <td className="px-4 py-3">
                    <span className={cn("text-xs font-semibold px-2 py-1 rounded-full",
                      l.recordingStatus === "Available" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                      l.recordingStatus === "Missing" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                      "bg-slate-100 text-slate-600"
                    )}>{l.recordingStatus}</span>
                  </td>
                  <td className="px-4 py-3">
                    {l.topicCoverage > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${l.topicCoverage}%` }} />
                        </div>
                        <span className="text-xs text-slate-500">{l.topicCoverage}%</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
