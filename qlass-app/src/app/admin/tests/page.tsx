"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { Search, ClipboardCheck, TrendingUp, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminTestsPage() {
  const data = useMemo(() => getSeedData(), []);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filtered = useMemo(() => {
    return data.tests.filter(t => {
      if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (classFilter && t.class !== classFilter) return false;
      if (subjectFilter && t.subject !== subjectFilter) return false;
      if (statusFilter && t.status !== statusFilter) return false;
      if (typeFilter && t.type !== typeFilter) return false;
      return true;
    }).slice(0, 36);
  }, [data.tests, search, classFilter, subjectFilter, statusFilter, typeFilter]);

  const avgPass = Math.round(data.tests.reduce((a, t) => a + t.passPercentage, 0) / data.tests.length);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center mb-2"><ClipboardCheck className="w-4 h-4 text-white" /></div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{data.tests.length}</div>
          <div className="text-xs text-slate-500 mt-1">Total Tests</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center mb-2"><TrendingUp className="w-4 h-4 text-white" /></div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{avgPass}%</div>
          <div className="text-xs text-slate-500 mt-1">Avg Pass Rate</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center mb-2"><BarChart3 className="w-4 h-4 text-white" /></div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{data.tests.filter(t => t.status === "Completed").length}</div>
          <div className="text-xs text-slate-500 mt-1">Completed</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
          <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center mb-2"><ClipboardCheck className="w-4 h-4 text-white" /></div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{data.tests.filter(t => t.status === "Upcoming").length}</div>
          <div className="text-xs text-slate-500 mt-1">Upcoming</div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tests..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>
          <select value={classFilter} onChange={e => setClassFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none">
            <option value="">All Classes</option>
            {["8A","8B","9A","9B","10A","10B"].map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none">
            <option value="">All Subjects</option>
            {["Mathematics","Physics","Chemistry","Biology","English","Computer Science"].map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none">
            <option value="">All Types</option>
            {["Unit Test", "Monthly Exam", "Surprise Quiz", "Mid-Term"].map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none">
            <option value="">All Status</option>
            {["Completed","Upcoming"].map(s => <option key={s}>{s}</option>)}
          </select>
          {(search || classFilter || subjectFilter || typeFilter || statusFilter) && (
            <button onClick={() => { setSearch(""); setClassFilter(""); setSubjectFilter(""); setTypeFilter(""); setStatusFilter(""); }}
              className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-bold transition-colors">Clear</button>
          )}
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              {["Test","Class","Subject","Type","Date","Avg","Highest","Pass %","Status"].map(h => <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>)}
            </tr></thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">{t.name}</td>
                  <td className="px-4 py-3"><span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{t.class}</span></td>
                  <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">{t.subject}</td>
                  <td className="px-4 py-3"><span className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-2 py-1 rounded-md">{t.type}</span></td>
                  <td className="px-4 py-3 text-xs text-slate-500">{t.date}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">{t.avgScore}/{t.maxMarks}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-emerald-600">{t.highestScore}</td>
                  <td className="px-4 py-3"><span className={cn("text-sm font-semibold", t.passPercentage >= 80 ? "text-emerald-600" : t.passPercentage >= 60 ? "text-blue-600" : "text-red-600")}>{t.passPercentage}%</span></td>
                  <td className="px-4 py-3"><span className={cn("text-xs font-semibold px-2 py-1 rounded-full", t.status === "Completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400")}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
