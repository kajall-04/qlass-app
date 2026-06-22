"use client";
import { useMemo } from "react";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { BookOpen, Users, CheckCircle2, Clock } from "lucide-react";

export default function StudentClassesPage() {
  const data = useMemo(() => getSeedData(), []);
  const student = data.students[0];
  const myClass = data.getClassByName(student.class);

  return (
    <div className="space-y-6">
      {myClass && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <span className="text-xl font-bold text-emerald-700 dark:text-emerald-400">{myClass.fullName}</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{myClass.name} — Section {myClass.section}</h2>
              <p className="text-sm text-slate-500">Class Teacher: {myClass.classTeacher} · {myClass.room}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: Users, label: "Classmates", value: myClass.totalStudents, color: "text-blue-600" },
              { icon: CheckCircle2, label: "Attendance", value: `${myClass.attendance}%`, color: "text-emerald-600" },
              { icon: BookOpen, label: "Syllabus", value: `${myClass.syllabusProgress}%`, color: "text-violet-600" },
              { icon: Clock, label: "Performance", value: myClass.performance, color: "text-amber-600" },
            ].map(s => (
              <div key={s.label} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{s.label}</div>
                <div className={cn("text-lg font-bold", s.color)}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timetable */}
      {myClass && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Weekly Timetable</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="text-left text-xs font-semibold text-slate-500 px-3 py-2">Day</th>
                {myClass.timetable[0]?.periods.slice(0, 6).map((_, i) => <th key={i} className="text-left text-xs font-semibold text-slate-500 px-3 py-2">Period {i + 1}</th>)}
              </tr></thead>
              <tbody>
                {myClass.timetable.map(day => (
                  <tr key={day.day} className="border-b border-slate-50 dark:border-slate-800/50">
                    <td className="px-3 py-2.5 text-sm font-medium text-slate-900 dark:text-white">{day.day}</td>
                    {day.periods.slice(0, 6).map((p, pi) => (
                      <td key={pi} className="px-3 py-2.5">
                        <div className="text-xs font-medium text-slate-700 dark:text-slate-300">{p.subject}</div>
                        <div className="text-[10px] text-slate-400">{p.teacher.split(" ").pop()}</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
