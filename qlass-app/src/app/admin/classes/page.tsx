"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { Users, BookOpen, TrendingUp, CheckCircle2, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminClassesPage() {
  const data = useMemo(() => getSeedData(), []);

  return (
    <div className="space-y-6">
      {/* Class Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.classes.map((cls, i) => (
          <motion.div key={cls.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-lg transition-shadow cursor-pointer group"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-700 dark:text-blue-400">{cls.fullName}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">{cls.name} — Section {cls.section}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{cls.classTeacher}</div>
                </div>
              </div>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2.5 py-1 rounded-full">{cls.status}</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1"><Users className="w-3.5 h-3.5 text-blue-600" /><span className="text-[10px] text-slate-500 uppercase tracking-wider">Students</span></div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">{cls.totalStudents}</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /><span className="text-[10px] text-slate-500 uppercase tracking-wider">Attendance</span></div>
                <div className="text-lg font-bold text-emerald-600">{cls.attendance}%</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1"><BookOpen className="w-3.5 h-3.5 text-violet-600" /><span className="text-[10px] text-slate-500 uppercase tracking-wider">Syllabus</span></div>
                <div className="text-lg font-bold text-violet-600">{cls.syllabusProgress}%</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1"><TrendingUp className="w-3.5 h-3.5 text-amber-600" /><span className="text-[10px] text-slate-500 uppercase tracking-wider">Performance</span></div>
                <div className="text-lg font-bold text-amber-600">{cls.performance}</div>
              </div>
            </div>

            {/* Subjects Progress */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Subject Progress</div>
              {cls.subjects.slice(0, 4).map(s => (
                <div key={s.name} className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 dark:text-slate-300 w-20 truncate">{s.name}</span>
                  <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${s.progress}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 w-10 text-right">{s.progress}%</span>
                </div>
              ))}
            </div>

            {/* Upcoming Tests */}
            {cls.upcomingTests.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Upcoming Tests</div>
                {cls.upcomingTests.slice(0, 2).map((t, ti) => (
                  <div key={ti} className="flex items-center justify-between py-1">
                    <span className="text-xs text-slate-700 dark:text-slate-300">{t.subject} — {t.type}</span>
                    <span className="text-xs text-slate-400">{t.date}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Comparison Chart */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
      >
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Class Comparison</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data.classes.map(c => ({ name: c.fullName, attendance: c.attendance, performance: c.performance, syllabus: c.syllabusProgress }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94A3B8" }} />
            <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
            <Bar dataKey="attendance" name="Attendance" fill="#2563EB" radius={[4, 4, 0, 0]} />
            <Bar dataKey="performance" name="Performance" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="syllabus" name="Syllabus" fill="#22C55E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
