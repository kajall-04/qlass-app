"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { Video, Search } from "lucide-react";

export default function TeacherLecturesPage() {
  const data = useMemo(() => getSeedData(), []);
  const teacher = data.teachers[0];
  const myLectures = data.getLecturesByTeacher(teacher.id).slice(0, 30);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              {["Lecture","Class","Date","Duration","Recording","Coverage"].map(h => <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>)}
            </tr></thead>
            <tbody>
              {myLectures.map(l => (
                <tr key={l.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="px-4 py-3"><div className="text-sm font-medium text-slate-900 dark:text-white">{l.title}</div><div className="text-xs text-slate-400">{l.subject}</div></td>
                  <td className="px-4 py-3"><span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{l.class}</span></td>
                  <td className="px-4 py-3 text-xs text-slate-500">{l.date}</td>
                  <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">{l.duration}</td>
                  <td className="px-4 py-3"><span className={cn("text-xs font-semibold px-2 py-1 rounded-full",
                    l.recordingStatus === "Available" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                    l.recordingStatus === "Missing" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-slate-100 text-slate-600"
                  )}>{l.recordingStatus}</span></td>
                  <td className="px-4 py-3">{l.topicCoverage > 0 && <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-violet-500 rounded-full" style={{width:`${l.topicCoverage}%`}} /></div>
                    <span className="text-xs text-slate-500">{l.topicCoverage}%</span></div>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
