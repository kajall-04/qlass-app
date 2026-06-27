"use client";

import { motion } from "framer-motion";
import { CalendarCheck, FileText, CheckSquare, Activity, Target, ListTodo } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SummaryStats } from "../types";

function StatCard({ 
  icon: Icon, 
  title, 
  value, 
  trend, 
  iconBg, 
  iconColor,
  delay
}: { 
  icon: any; 
  title: string; 
  value: string | number; 
  trend: number; 
  iconBg: string; 
  iconColor: string;
  delay: number;
}) {
  const isPositive = trend >= 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
    >
      <div className="flex items-start justify-between">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors", iconBg)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
      </div>
      <div className="mt-4">
        <div className="text-[13px] font-semibold text-slate-500 dark:text-slate-400">{title}</div>
        <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</div>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <span className={cn(
          "text-xs font-bold", 
          isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
        )}>
          {isPositive ? "▲" : "▼"} {Math.abs(trend)}%
        </span>
        <span className="text-[11px] font-medium text-slate-400">vs last week</span>
      </div>
    </motion.div>
  );
}

export function SummaryCards({ stats, isLoading }: { stats?: SummaryStats; isLoading: boolean }) {
  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 h-32 animate-pulse">
            <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl mb-4" />
            <div className="w-1/2 h-3 bg-slate-200 dark:bg-slate-800 rounded mb-2" />
            <div className="w-3/4 h-6 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <StatCard
        icon={CalendarCheck} title="Attendance" value={`${stats.attendance}%`} trend={stats.attendanceTrend}
        iconBg="bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40" iconColor="text-blue-600 dark:text-blue-400" delay={0.0}
      />
      <StatCard
        icon={FileText} title="DPP Submission Rate" value={`${stats.dppSubmissionRate}%`} trend={stats.dppSubmissionTrend}
        iconBg="bg-purple-50 dark:bg-purple-900/20 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40" iconColor="text-purple-600 dark:text-purple-400" delay={0.05}
      />
      <StatCard
        icon={CheckSquare} title="Avg DPP Score" value={`${stats.avgDppScore}%`} trend={stats.avgDppTrend}
        iconBg="bg-emerald-50 dark:bg-emerald-900/20 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40" iconColor="text-emerald-600 dark:text-emerald-400" delay={0.1}
      />
      <StatCard
        icon={Activity} title="Avg Test Score" value={`${stats.avgTestScore}%`} trend={stats.avgTestTrend}
        iconBg="bg-amber-50 dark:bg-amber-900/20 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/40" iconColor="text-amber-600 dark:text-amber-400" delay={0.15}
      />
      <StatCard
        icon={Target} title="Syllabus Progress" value={`${stats.syllabusProgress}%`} trend={stats.syllabusTrend}
        iconBg="bg-violet-50 dark:bg-violet-900/20 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/40" iconColor="text-violet-600 dark:text-violet-400" delay={0.2}
      />
      <StatCard
        icon={ListTodo} title="Pending Tasks" value={stats.pendingTasks} trend={stats.pendingTasksTrend}
        iconBg="bg-rose-50 dark:bg-rose-900/20 group-hover:bg-rose-100 dark:group-hover:bg-rose-900/40" iconColor="text-rose-600 dark:text-rose-400" delay={0.25}
      />
    </div>
  );
}
