"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { Users, CheckCircle2, XCircle, UserCheck, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/teacher/shared/PageHeader";
import { StatCard } from "@/components/teacher/shared/StatCard";
import { ProgressRing } from "@/components/teacher/shared/ProgressRing";

export default function TeacherAttendancePage() {
  const data = useMemo(() => getSeedData(), []);
  const teacher = data.teachers[0];
  const myStudents = data.students.filter(s => teacher.classes.includes(s.class));
  const [selectedClass, setSelectedClass] = useState(teacher.classes[0] || "");
  const classStudents = myStudents.filter(s => s.class === selectedClass);

  const present = classStudents.filter(s => s.attendance >= 75).length;
  const absent = classStudents.length - present;
  const pct = classStudents.length ? Math.round((present / classStudents.length) * 100) : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      <PageHeader
        title="Attendance"
        subtitle="Mark and track student attendance"
        actions={
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-1">
            {teacher.classes.map(c => (
              <button
                key={c}
                onClick={() => setSelectedClass(c)}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-xs font-semibold transition-all",
                  selectedClass === c
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Students" value={classStudents.length} icon={<Users size={20} />} iconBg="bg-blue-50 dark:bg-blue-900/20" iconColor="text-blue-600 dark:text-blue-400" delay={0} />
        <StatCard title="Present" value={present} icon={<CheckCircle2 size={20} />} iconBg="bg-emerald-50 dark:bg-emerald-900/20" iconColor="text-emerald-600 dark:text-emerald-400" trend="up" delay={1} />
        <StatCard title="Absent" value={absent} icon={<XCircle size={20} />} iconBg="bg-red-50 dark:bg-red-900/20" iconColor="text-red-600 dark:text-red-400" trend="down" delay={2} />
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
          <ProgressRing value={pct} size={70} strokeWidth={6} color="#10B981" label="Today" />
        </div>
      </div>

      {/* Mark Attendance Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Mark Attendance — Class {selectedClass}</h3>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm active:scale-95">
            Submit Attendance
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2.5">
          {classStudents.slice(0, 40).map(s => {
            const isPresent = s.attendance >= 75;
            return (
              <button
                key={s.id}
                className={cn(
                  "p-3 rounded-xl border text-center transition-all hover:shadow-md active:scale-95",
                  isPresent
                    ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-900/10 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                    : "border-red-200 dark:border-red-800 bg-red-50/60 dark:bg-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/20"
                )}
              >
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold mx-auto mb-2 shadow-sm", s.avatarColor)}>
                  {s.initials}
                </div>
                <div className="text-[11px] font-semibold text-slate-800 dark:text-white truncate">{s.name.split(" ")[0]}</div>
                <div className={cn("text-[10px] font-semibold mt-0.5 flex items-center justify-center gap-0.5",
                  isPresent ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                )}>
                  {isPresent ? <><CheckCircle2 size={10} /> P</> : <><XCircle size={10} /> A</>}
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
