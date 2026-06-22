"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { FileText, AlertTriangle } from "lucide-react";

export default function TeacherDPPPage() {
  const data = useMemo(() => getSeedData(), []);
  const teacher = data.teachers[0];
  const myDPP = data.getDPPByTeacher(teacher.id).slice(0, 24);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-bold text-slate-900 dark:text-white">My DPP Assignments</h2><p className="text-sm text-slate-500">{myDPP.length} assignments</p></div>
        <button className="px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-violet-500/25">+ Create DPP</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myDPP.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", d.difficulty === "Easy" ? "bg-emerald-100 text-emerald-700" : d.difficulty === "Medium" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700")}>{d.difficulty}</span>
              <span className="text-xs text-slate-400">{d.class}</span>
            </div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{d.name}</h4>
            <p className="text-xs text-slate-500 mb-3">{d.subject} · {d.totalQuestions} Qs · Due: {d.dueDate}</p>
            <div className="mb-2"><div className="flex justify-between text-xs mb-1"><span className="text-slate-500">Submissions</span><span className="font-semibold text-slate-700 dark:text-slate-300">{d.submitted}/{d.totalStudents}</span></div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full"><div className={cn("h-full rounded-full", d.submissionRate >= 80 ? "bg-emerald-500" : d.submissionRate >= 60 ? "bg-amber-500" : "bg-red-500")} style={{width:`${d.submissionRate}%`}} /></div></div>
            {d.weakStudents > 5 && <div className="text-xs text-red-600 font-medium flex items-center gap-1 mt-2"><AlertTriangle className="w-3 h-3" />{d.weakStudents} need attention</div>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
