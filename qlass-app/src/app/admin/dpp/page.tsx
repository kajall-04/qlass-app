"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { Search, FileText, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function AdminDPPPage() {
  const data = useMemo(() => getSeedData(), []);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  const filtered = useMemo(() => {
    return data.dpp.filter(d => {
      if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (classFilter && d.class !== classFilter) return false;
      if (subjectFilter && d.subject !== subjectFilter) return false;
      if (statusFilter && d.status !== statusFilter) return false;
      if (difficultyFilter && d.difficulty !== difficultyFilter) return false;
      return true;
    }).slice(0, 40);
  }, [data.dpp, search, classFilter, subjectFilter, statusFilter, difficultyFilter]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total DPP", value: data.dpp.length, icon: FileText, bg: "bg-blue-600" },
          { label: "Active", value: data.dpp.filter(d => d.status === "Active").length, icon: CheckCircle2, bg: "bg-emerald-600" },
          { label: "Pending", value: data.dpp.filter(d => d.status === "Pending").length, icon: Clock, bg: "bg-amber-600" },
          { label: "Low Submission", value: data.dpp.filter(d => d.submissionRate < 60).length, icon: AlertTriangle, bg: "bg-red-600" },
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
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search DPP..." className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <select value={classFilter} onChange={e => setClassFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none">
            <option value="">All Classes</option>
            {["8A","8B","9A","9B","10A","10B"].map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none">
            <option value="">All Subjects</option>
            {["Mathematics","Physics","Chemistry","English","Computer Science"].map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={difficultyFilter} onChange={e => setDifficultyFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none">
            <option value="">All Difficulties</option>
            {["Easy","Medium","Hard"].map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none">
            <option value="">All Status</option>
            {["Active","Pending"].map(s => <option key={s}>{s}</option>)}
          </select>
          {(search || classFilter || subjectFilter || difficultyFilter || statusFilter) && (
            <button onClick={() => { setSearch(""); setClassFilter(""); setSubjectFilter(""); setDifficultyFilter(""); setStatusFilter(""); }}
              className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-bold transition-colors">Clear</button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full",
                d.difficulty === "Easy" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                d.difficulty === "Medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              )}>{d.difficulty}</span>
              <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full",
                d.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
              )}>{d.status}</span>
            </div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{d.name}</h4>
            <p className="text-xs text-slate-500 mb-3">{d.subject} · Class {d.class} · {d.totalQuestions} questions</p>
            
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500">Submission</span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{d.submitted}/{d.totalStudents} ({d.submissionRate}%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full", d.submissionRate >= 80 ? "bg-emerald-500" : d.submissionRate >= 60 ? "bg-amber-500" : "bg-red-500")} style={{ width: `${d.submissionRate}%` }} />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Avg: {d.avgScore}%</span>
              <span>Due: {d.dueDate}</span>
            </div>
            {d.weakStudents > 5 && <div className="mt-2 text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{d.weakStudents} weak students</div>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
