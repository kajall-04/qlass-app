"use client";

import { useMemo, useState } from "react";
import { getSeedData } from "@/data/seed";
import { cn, getPercentageColor } from "@/lib/utils";
import { Search } from "lucide-react";

export default function TeacherStudentsPage() {
  const data = useMemo(() => getSeedData(), []);
  const teacher = data.teachers[0];
  const myStudents = data.students.filter(s => teacher.classes.includes(s.class));
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");

  const filtered = myStudents.filter(s => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (classFilter && s.class !== classFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
        <select value={classFilter} onChange={e => setClassFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm">
          <option value="">All My Classes</option>
          {teacher.classes.map(c => <option key={c} value={c}>Class {c}</option>)}
        </select>
        <div className="text-xs text-slate-500 self-center">{filtered.length} students</div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              {["Student","Class","Attendance","Avg Score","Pending DPP","Risk"].map(h => <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>)}
            </tr></thead>
            <tbody>
              {filtered.slice(0, 30).map(s => (
                <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold", s.avatarColor)}>{s.initials}</div>
                      <div><div className="text-sm font-medium text-slate-900 dark:text-white">{s.name}</div><div className="text-xs text-slate-400">{s.id}</div></div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{s.class}</span></td>
                  <td className="px-4 py-3"><span className={cn("text-sm font-semibold", getPercentageColor(s.attendance))}>{s.attendance}%</span></td>
                  <td className="px-4 py-3"><span className={cn("text-sm font-semibold", getPercentageColor(s.avgScore))}>{s.avgScore}</span></td>
                  <td className="px-4 py-3"><span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{s.pendingDPP}</span></td>
                  <td className="px-4 py-3"><span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full",
                    s.riskLevel === "Critical" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                    s.riskLevel === "High" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                    s.riskLevel === "Medium" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  )}>{s.riskLevel}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
