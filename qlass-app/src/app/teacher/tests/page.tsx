"use client";
import { useMemo } from "react";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";

export default function TeacherTestsPage() {
  const data = useMemo(() => getSeedData(), []);
  const teacher = data.teachers[0];
  const myTests = data.getTestsByTeacher(teacher.id).slice(0, 20);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-bold text-slate-900 dark:text-white">My Tests</h2><p className="text-sm text-slate-500">{myTests.length} tests</p></div>
        <button className="px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-violet-500/25">+ Create Test</button>
      </div>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full">
          <thead><tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            {["Test","Class","Subject","Type","Date","Avg","Pass %","Status"].map(h => <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>)}
          </tr></thead>
          <tbody>{myTests.map(t => (
            <tr key={t.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
              <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">{t.name}</td>
              <td className="px-4 py-3"><span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{t.class}</span></td>
              <td className="px-4 py-3 text-xs text-slate-600">{t.subject}</td>
              <td className="px-4 py-3"><span className="text-xs bg-violet-50 dark:bg-violet-900/20 text-violet-600 px-2 py-1 rounded-md">{t.type}</span></td>
              <td className="px-4 py-3 text-xs text-slate-500">{t.date}</td>
              <td className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">{t.avgScore}/{t.maxMarks}</td>
              <td className="px-4 py-3"><span className={cn("text-sm font-semibold", t.passPercentage >= 80 ? "text-emerald-600" : t.passPercentage >= 60 ? "text-blue-600" : "text-red-600")}>{t.passPercentage}%</span></td>
              <td className="px-4 py-3"><span className={cn("text-xs font-semibold px-2 py-1 rounded-full", t.status === "Completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400")}>{t.status}</span></td>
            </tr>))}
          </tbody>
        </table></div>
      </div>
    </div>
  );
}
