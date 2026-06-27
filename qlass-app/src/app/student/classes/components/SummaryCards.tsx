"use client";
import { GraduationCap, Users, BookOpen, UserCheck, Calendar, Bookmark } from "lucide-react";
import { ClassSummary } from "../types";
import { cn } from "@/lib/utils";

interface SummaryCardsProps {
  summary?: ClassSummary;
  isLoading: boolean;
}

export function SummaryCards({ summary, isLoading }: SummaryCardsProps) {
  
  const cards = [
    {
      title: "Current Class",
      value: summary?.currentClass,
      icon: <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Batch",
      value: summary?.batch,
      icon: <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
      title: "Stream",
      value: summary?.stream,
      icon: <Bookmark className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Subjects Enrolled",
      value: summary?.subjectsEnrolled,
      icon: <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      title: "Teachers Assigned",
      value: summary?.teachersAssigned,
      icon: <UserCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      title: "Academic Year",
      value: summary?.academicYear,
      icon: <Calendar className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
      bg: "bg-rose-50 dark:bg-rose-900/20",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-3 h-[116px]">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="w-20 h-3 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              <div className="w-16 h-5 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, idx) => (
        <div 
          key={idx} 
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:shadow-md hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300 group cursor-default flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-2">
            <div className={cn("p-2.5 rounded-xl transition-colors", card.bg)}>
              {card.icon}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              {card.title}
            </p>
            <p className="text-lg font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {card.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
