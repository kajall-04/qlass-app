"use client";
import { CourseSubject } from "../types";
import { Play, FileText, CheckSquare, AlertTriangle, TrendingUp, BookOpen } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";
import Link from "next/link";

interface SubjectCardsGridProps {
  subjects: CourseSubject[];
  isLoading: boolean;
}

function SubjectCard({ subject }: { subject: CourseSubject }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300 group flex flex-col">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {subject.subjectName}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {subject.teacherName}
            </p>
          </div>
        </div>
        <span className={cn("px-2.5 py-1 text-[11px] font-semibold rounded-full border shrink-0", getStatusColor(subject.status))}>
          {subject.status}
        </span>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-600 dark:text-slate-300">Progress</span>
          <span className="font-bold text-slate-900 dark:text-white">{subject.progressPercent}%</span>
        </div>
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={cn("h-full rounded-full transition-all duration-1000",
              subject.progressPercent >= 80 ? "bg-emerald-500" :
              subject.progressPercent >= 40 ? "bg-blue-500" : "bg-amber-500"
            )}
            style={{ width: `${subject.progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2 text-right">
          {subject.completedChapters} / {subject.totalChapters} Chapters
        </p>
      </div>

      {/* Meta Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
        <div>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> DPP Avg
          </p>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{subject.dppAverage}%</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-500" /> Weak Topics
          </p>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{subject.weakTopicsCount}</p>
        </div>
        <div className="col-span-2 mt-1 pt-2 border-t border-slate-200 dark:border-slate-700">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Up Next</p>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate" title={subject.upcomingChapter}>
            {subject.upcomingChapter}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-auto grid grid-cols-3 gap-2">
        <Link href={`/student/classes/${subject.id}`} className="col-span-2 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95">
          <Play className="w-4 h-4 fill-white" /> Continue
        </Link>
        <Link href={`/student/classes/${subject.id}/notes`} className="flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-colors" title="View Notes">
          <FileText className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export function SubjectCardsGrid({ subjects, isLoading }: SubjectCardsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 h-[340px] flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-5 w-1/2 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                <div className="h-4 w-1/3 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
            </div>
            <div className="h-24 w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl animate-pulse mb-auto" />
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="col-span-2 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (subjects.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} subject={subject} />
      ))}
    </div>
  );
}
