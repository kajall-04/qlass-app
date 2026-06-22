"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { CheckSquare, Users, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function TeacherAttendancePage() {
  const data = useMemo(() => getSeedData(), []);
  const teacher = data.teachers[0];
  const myStudents = data.students.filter(s => teacher.classes.includes(s.class));
  const [selectedClass, setSelectedClass] = useState(teacher.classes[0] || "");
  const classStudents = myStudents.filter(s => s.class === selectedClass);

  const present = classStudents.filter(s => s.attendance >= 75).length;
  const absent = classStudents.length - present;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {teacher.classes.map(c => (
          <button key={c} onClick={() => setSelectedClass(c)}
            className={cn("px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
              selectedClass === c ? "bg-violet-600 text-white" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50"
            )}>Class {c}</button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-center">
          <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-xl font-bold text-slate-900 dark:text-white">{classStudents.length}</div>
          <div className="text-xs text-slate-500">Total</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-center">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
          <div className="text-xl font-bold text-emerald-600">{present}</div>
          <div className="text-xs text-slate-500">Present</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-center">
          <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
          <div className="text-xl font-bold text-red-600">{absent}</div>
          <div className="text-xs text-slate-500">Absent</div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Mark Attendance — Class {selectedClass}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {classStudents.slice(0, 25).map(s => (
            <button key={s.id} className={cn("p-3 rounded-xl border text-center transition-all hover:shadow-md",
              s.attendance >= 75 ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/10" : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10"
            )}>
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold mx-auto mb-2", s.avatarColor)}>{s.initials}</div>
              <div className="text-xs font-medium text-slate-900 dark:text-white truncate">{s.name.split(" ")[0]}</div>
              <div className={cn("text-[10px] font-semibold mt-0.5", s.attendance >= 75 ? "text-emerald-600" : "text-red-600")}>
                {s.attendance >= 75 ? "Present" : "Absent"}
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
