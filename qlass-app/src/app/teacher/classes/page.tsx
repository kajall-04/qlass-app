"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { Users, BookOpen, CheckCircle2, TrendingUp } from "lucide-react";

export default function TeacherClassesPage() {
  const data = useMemo(() => getSeedData(), []);
  const teacher = data.teachers[0];
  const myClasses = data.classes.filter(c => teacher.classes.includes(c.fullName));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myClasses.length > 0 ? myClasses.map((cls, i) => (
          <motion.div key={cls.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                <span className="text-lg font-bold text-violet-700 dark:text-violet-400">{cls.fullName}</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{cls.name} — Section {cls.section}</div>
                <div className="text-xs text-slate-500">{cls.room}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Users, label: "Students", value: cls.totalStudents, color: "text-blue-600" },
                { icon: CheckCircle2, label: "Attendance", value: `${cls.attendance}%`, color: "text-emerald-600" },
                { icon: BookOpen, label: "Syllabus", value: `${cls.syllabusProgress}%`, color: "text-violet-600" },
                { icon: TrendingUp, label: "Performance", value: cls.performance, color: "text-amber-600" },
              ].map(s => (
                <div key={s.label} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{s.label}</div>
                  <div className={cn("text-lg font-bold", s.color)}>{s.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )) : (
          <div className="col-span-3 text-center py-12 text-slate-500 dark:text-slate-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No classes assigned yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
