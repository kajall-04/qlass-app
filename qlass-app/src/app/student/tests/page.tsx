"use client";
import { useMemo } from "react";
import { getSeedData } from "@/data/seed";
import { cn, getPercentageColor } from "@/lib/utils";

export default function StudentTestsPage() {
  const data = useMemo(() => getSeedData(), []);
  const student = data.students[0];
  const myTests = student.testScores;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Tests & Results</h2>
        <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-medium">Avg Score: {student.avgScore}%</span>
      </div>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                {["Test Name", "Subject", "Date", "Score", "Percentage"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {myTests.map((t, i) => (
                <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">{t.name}</td>
                  <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">{t.subject}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{t.date}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">{t.obtainedMarks} / {t.maxMarks}</td>
                  <td className="px-4 py-3"><span className={cn("text-sm font-bold", getPercentageColor(t.percentage))}>{t.percentage}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
