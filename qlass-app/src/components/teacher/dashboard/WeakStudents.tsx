"use client";

import { mockWeakStudents } from "@/lib/dummyData";
import { useTeacherStore } from "@/store/teacherStore";
import { TrendingDown, MessageSquare, ShieldAlert, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function WeakStudents() {
  const { selectedClass } = useTeacherStore();

  const filteredStudents = mockWeakStudents.filter(student => {
    return selectedClass === "all" || student.classId === selectedClass;
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden shadow-sm">
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <ShieldAlert size={16} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-white tracking-tight">At Risk Students</h2>
            <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">{filteredStudents.length} need attention</span>
          </div>
        </div>
        <Link
          href="/teacher/students"
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
        >
          All <ChevronRight size={14} />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 min-h-[180px]">
        {filteredStudents.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 py-6">
            <ShieldAlert size={32} className="mb-2 opacity-30" />
            <p className="text-xs font-medium">No at-risk students</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredStudents.map(student => (
              <div
                key={student.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    {student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {student.name}
                    </h4>
                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded shrink-0">
                      {student.classId}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-red-600 dark:text-red-400">
                      <TrendingDown size={10} /> {student.performanceScore}%
                    </span>
                    {student.weakTopics[0] && (
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                        {student.weakTopics[0]}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors shrink-0"
                  title="Message"
                >
                  <MessageSquare size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
