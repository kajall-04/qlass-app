"use client";
import { useState } from "react";
import { CourseSubject } from "../types";
import { Play, FileText, ArrowRight, ArrowDownUp } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";
import Link from "next/link";

interface SubjectsTableProps {
  subjects: CourseSubject[];
  isLoading: boolean;
}

export function SubjectsTable({ subjects, isLoading }: SubjectsTableProps) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof CourseSubject; direction: 'asc' | 'desc' } | null>(null);

  const sortedSubjects = [...subjects];
  if (sortConfig !== null) {
    sortedSubjects.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const requestSort = (key: keyof CourseSubject) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="w-32 h-5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
        <div className="p-4 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="w-1/4 h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              </div>
              <div className="w-20 h-8 bg-slate-200 dark:bg-slate-800 rounded animate-pulse shrink-0" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center shadow-sm">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <BookOpen className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No subjects found</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm">Try adjusting your filters to see results.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold cursor-pointer hover:text-emerald-600 transition-colors" onClick={() => requestSort('subjectName')}>
                <div className="flex items-center gap-1">Subject <ArrowDownUp className="w-3 h-3" /></div>
              </th>
              <th scope="col" className="px-6 py-4 font-semibold cursor-pointer hover:text-emerald-600 transition-colors hidden md:table-cell" onClick={() => requestSort('teacherName')}>
                <div className="flex items-center gap-1">Teacher <ArrowDownUp className="w-3 h-3" /></div>
              </th>
              <th scope="col" className="px-6 py-4 font-semibold cursor-pointer hover:text-emerald-600 transition-colors hidden sm:table-cell text-center" onClick={() => requestSort('completedChapters')}>
                <div className="flex items-center justify-center gap-1">Chapters <ArrowDownUp className="w-3 h-3" /></div>
              </th>
              <th scope="col" className="px-6 py-4 font-semibold cursor-pointer hover:text-emerald-600 transition-colors" onClick={() => requestSort('progressPercent')}>
                <div className="flex items-center gap-1">Progress <ArrowDownUp className="w-3 h-3" /></div>
              </th>
              <th scope="col" className="px-6 py-4 font-semibold cursor-pointer hover:text-emerald-600 transition-colors hidden lg:table-cell" onClick={() => requestSort('status')}>
                <div className="flex items-center gap-1">Status <ArrowDownUp className="w-3 h-3" /></div>
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedSubjects.map((subject) => (
              <tr key={subject.id} className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  <div className="flex flex-col">
                    <span className="group-hover:text-emerald-600 transition-colors">{subject.subjectName}</span>
                    <span className="text-xs text-slate-500 md:hidden mt-1">{subject.teacherName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell text-slate-600 dark:text-slate-300">
                  {subject.teacherName}
                </td>
                <td className="px-6 py-4 hidden sm:table-cell text-center text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-white">{subject.completedChapters}</span>
                  <span className="text-slate-400 mx-1">/</span>
                  <span className="text-slate-500">{subject.totalChapters}</span>
                </td>
                <td className="px-6 py-4 w-48">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full transition-all duration-500", 
                          subject.progressPercent >= 80 ? "bg-emerald-500" :
                          subject.progressPercent >= 40 ? "bg-blue-500" : "bg-amber-500"
                        )} 
                        style={{ width: `${subject.progressPercent}%` }} 
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 w-8">{subject.progressPercent}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className={cn("px-2.5 py-1 text-[11px] font-semibold rounded-full border", getStatusColor(subject.status))}>
                    {subject.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <Link href={`/student/classes/${subject.id}/notes`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="View Notes">
                      <FileText className="w-4 h-4" />
                    </Link>
                    <Link href={`/student/classes/${subject.id}`} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors" title="Continue Learning">
                      <Play className="w-4 h-4" />
                    </Link>
                    <Link href={`/student/classes/${subject.id}`} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="View Subject">
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Ensure BookOpen is imported for the empty state
import { BookOpen } from "lucide-react";
