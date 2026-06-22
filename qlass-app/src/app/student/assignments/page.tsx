"use client";
import { useMemo } from "react";
import { getSeedData } from "@/data/seed";
import { ClipboardCheck, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudentAssignmentsPage() {
  const data = useMemo(() => getSeedData(), []);
  const student = data.students[0];
  const assignments = data.dpp.filter(d => d.class === student.class);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Assignments</h2>
      </div>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <div className="space-y-4">
          {assignments.map(a => (
            <div key={a.id} className="flex items-start gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", a.status === "Active" ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600")}>
                {a.status === "Active" ? <Clock className="w-5 h-5" /> : <ClipboardCheck className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{a.name}</h4>
                <p className="text-xs text-slate-500 mt-1">{a.subject} · Due: {a.dueDate}</p>
              </div>
              <button className={cn("px-4 py-2 rounded-lg text-sm font-semibold transition-colors", a.status === "Active" ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-slate-100 text-slate-600")}>
                {a.status === "Active" ? "Submit" : "View"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
