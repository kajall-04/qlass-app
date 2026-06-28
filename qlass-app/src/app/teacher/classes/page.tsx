"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { Users, BookOpen, CheckCircle2, TrendingUp, ChevronRight, BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/teacher/shared/PageHeader";
import { StatCard } from "@/components/teacher/shared/StatCard";
import { ProgressRing } from "@/components/teacher/shared/ProgressRing";

export default function TeacherClassesPage() {
  const data = useMemo(() => getSeedData(), []);
  const teacher = data.teachers[0];
  const myClasses = data.classes.filter(c => teacher.classes.includes(c.fullName));

  const totalStudents = myClasses.reduce((acc, c) => acc + c.totalStudents, 0);
  const avgAttendance = myClasses.length ? Math.round(myClasses.reduce((acc, c) => acc + c.attendance, 0) / myClasses.length) : 0;
  const avgPerformance = myClasses.length ? Math.round(myClasses.reduce((acc, c) => acc + c.performance, 0) / myClasses.length) : 0;
  const avgSyllabus = myClasses.length ? Math.round(myClasses.reduce((acc, c) => acc + c.syllabusProgress, 0) / myClasses.length) : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      <PageHeader
        title="My Classes"
        subtitle={`${myClasses.length} classes assigned to you`}
        badge={{ label: `${totalStudents} students`, variant: "default" }}
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Students" value={totalStudents} icon={<Users size={20} />} iconBg="bg-blue-50 dark:bg-blue-900/20" iconColor="text-blue-600 dark:text-blue-400" trend="up" trendValue="+8" delay={0} />
        <StatCard title="Avg Attendance" value={`${avgAttendance}%`} icon={<CheckCircle2 size={20} />} iconBg="bg-emerald-50 dark:bg-emerald-900/20" iconColor="text-emerald-600 dark:text-emerald-400" trend="up" trendValue="+2%" delay={1} />
        <StatCard title="Avg Performance" value={`${avgPerformance}%`} icon={<TrendingUp size={20} />} iconBg="bg-violet-50 dark:bg-violet-900/20" iconColor="text-violet-600 dark:text-violet-400" trend="up" trendValue="+3%" delay={2} />
        <StatCard title="Syllabus Progress" value={`${avgSyllabus}%`} icon={<BookOpen size={20} />} iconBg="bg-amber-50 dark:bg-amber-900/20" iconColor="text-amber-600 dark:text-amber-400" trend="neutral" trendValue="On track" delay={3} />
      </div>

      {/* Class Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myClasses.length > 0 ? myClasses.map((cls, i) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                  <span className="text-sm font-bold text-white">{cls.fullName}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">{cls.name} — Sec {cls.section}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{cls.room}</div>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors" />
            </div>

            <div className="flex items-center justify-between mb-4">
              <ProgressRing value={cls.syllabusProgress} size={64} strokeWidth={5} color="#8B5CF6" label="Syllabus" />
              <ProgressRing value={cls.attendance} size={64} strokeWidth={5} color="#10B981" label="Attend." />
              <ProgressRing value={cls.performance} size={64} strokeWidth={5} color="#3B82F6" label="Score" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Users, label: "Students", value: cls.totalStudents, color: "text-blue-600 dark:text-blue-400" },
                { icon: CheckCircle2, label: "Attendance", value: `${cls.attendance}%`, color: "text-emerald-600 dark:text-emerald-400" },
                { icon: BookOpen, label: "Syllabus", value: `${cls.syllabusProgress}%`, color: "text-violet-600 dark:text-violet-400" },
                { icon: TrendingUp, label: "Performance", value: cls.performance, color: "text-amber-600 dark:text-amber-400" },
              ].map(s => (
                <div key={s.label} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-2.5">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">{s.label}</div>
                  <div className={cn("text-base font-bold tabular-nums", s.color)}>{s.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )) : (
          <div className="col-span-3 text-center py-16 text-slate-500 dark:text-slate-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">No classes assigned yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
