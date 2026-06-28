"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { FileText, AlertTriangle, Plus, CheckCircle2, Clock, BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/teacher/shared/PageHeader";
import { StatCard } from "@/components/teacher/shared/StatCard";
import { StatusBadge, getDifficultyBadgeVariant } from "@/components/teacher/shared/StatusBadge";

export default function TeacherDPPPage() {
  const data = useMemo(() => getSeedData(), []);
  const teacher = data.teachers[0];
  const myDPP = data.getDPPByTeacher(teacher.id).slice(0, 24);
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  const filtered = myDPP.filter(d => {
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (difficultyFilter && d.difficulty !== difficultyFilter) return false;
    return true;
  });

  const active = myDPP.filter(d => d.status === "Active").length;
  const pending = myDPP.filter(d => d.status === "Pending").length;
  const avgSubmission = myDPP.length ? Math.round(myDPP.reduce((a, d) => a + d.submissionRate, 0) / myDPP.length) : 0;
  const avgScore = myDPP.length ? Math.round(myDPP.reduce((a, d) => a + d.avgScore, 0) / myDPP.length) : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      <PageHeader
        title="DPP Management"
        subtitle={`${myDPP.length} daily practice papers`}
        search={{ value: search, onChange: setSearch, placeholder: "Search DPP..." }}
        actions={
          <div className="flex items-center gap-2">
            <select
              value={difficultyFilter}
              onChange={e => setDifficultyFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
            >
              <option value="">All Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 active:scale-95">
              <Plus size={14} /> Create DPP
            </button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total DPP" value={myDPP.length} icon={<FileText size={20} />} iconBg="bg-violet-50 dark:bg-violet-900/20" iconColor="text-violet-600 dark:text-violet-400" delay={0} />
        <StatCard title="Active" value={active} icon={<CheckCircle2 size={20} />} iconBg="bg-emerald-50 dark:bg-emerald-900/20" iconColor="text-emerald-600 dark:text-emerald-400" delay={1} />
        <StatCard title="Avg Submission" value={`${avgSubmission}%`} icon={<BarChart3 size={20} />} iconBg="bg-blue-50 dark:bg-blue-900/20" iconColor="text-blue-600 dark:text-blue-400" trend="up" delay={2} />
        <StatCard title="Avg Score" value={`${avgScore}%`} icon={<BarChart3 size={20} />} iconBg="bg-amber-50 dark:bg-amber-900/20" iconColor="text-amber-600 dark:text-amber-400" trend="up" delay={3} />
      </div>

      {/* DPP Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <StatusBadge label={d.difficulty} variant={getDifficultyBadgeVariant(d.difficulty)} />
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded">{d.class}</span>
            </div>
            <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{d.name}</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
              {d.subject} · {d.totalQuestions} Qs · Due: {d.dueDate}
            </p>

            <div className="mb-3">
              <div className="flex justify-between text-[11px] mb-1.5">
                <span className="text-slate-500 dark:text-slate-400">Submissions</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums">{d.submitted}/{d.totalStudents}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    d.submissionRate >= 80 ? "bg-emerald-500" : d.submissionRate >= 60 ? "bg-amber-500" : "bg-red-500"
                  )}
                  style={{ width: `${d.submissionRate}%` }}
                />
              </div>
            </div>

            {d.weakStudents > 5 && (
              <div className="text-[11px] text-red-600 dark:text-red-400 font-medium flex items-center gap-1 mt-2 bg-red-50 dark:bg-red-900/10 px-2 py-1 rounded-lg">
                <AlertTriangle className="w-3 h-3" />{d.weakStudents} need attention
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
