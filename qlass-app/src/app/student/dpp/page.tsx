"use client";
import { useMemo } from "react";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { FileText, CheckCircle2, Clock } from "lucide-react";

export default function StudentDPPPage() {
  const data = useMemo(() => getSeedData(), []);
  const student = data.students[0];
  const myDPP = data.dpp.filter(d => d.class === student.class);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Daily Practice Problems</h2>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-medium">Completed: 12</span>
          <span className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-sm font-medium">Pending: {student.pendingDPP}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myDPP.map(d => (
          <div key={d.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", d.difficulty === "Easy" ? "bg-emerald-100 text-emerald-700" : d.difficulty === "Medium" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700")}>{d.difficulty}</span>
              {d.status === "Active" ? <Clock className="w-4 h-4 text-amber-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            </div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{d.name}</h4>
            <p className="text-xs text-slate-500 mb-4">{d.subject} · {d.totalQuestions} Questions</p>
            <div className="flex items-center justify-between text-xs mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Due: {d.dueDate}</span>
              <button className={cn("px-3 py-1.5 rounded-lg font-semibold transition-colors", d.status === "Active" ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-slate-100 text-slate-600")}>
                {d.status === "Active" ? "Start" : "Review"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
