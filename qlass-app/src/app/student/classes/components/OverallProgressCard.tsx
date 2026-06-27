"use client";
import { AcademicProgress } from "../types";
import { CheckCircle2, CircleDashed, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

interface OverallProgressCardProps {
  progress?: AcademicProgress;
  isLoading: boolean;
}

export function OverallProgressCard({ progress, isLoading }: OverallProgressCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!progress) return;
    let start = 0;
    const target = progress.overallCompletionPercent;
    const duration = 1000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setDisplayValue(target);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [progress]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-[320px] flex flex-col justify-center items-center shadow-sm">
        <div className="w-32 h-32 rounded-full border-8 border-slate-100 dark:border-slate-800 animate-pulse mb-6" />
        <div className="w-3/4 h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2" />
        <div className="w-1/2 h-3 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
      </div>
    );
  }

  if (!progress) return null;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayValue / 100) * circumference;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-[320px] flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
      
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 self-start absolute top-6 left-6">Overall Progress</h3>
      
      <div className="relative flex items-center justify-center mt-8">
        <svg className="transform -rotate-90 w-36 h-36">
          {/* Background circle */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-100 dark:text-slate-800"
          />
          {/* Progress circle */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-emerald-500 transition-all duration-300 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-slate-900 dark:text-white">{displayValue}%</span>
        </div>
      </div>

      <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-4 text-center px-4">
        {progress.motivationalMessage}
      </p>

      <div className="w-full grid grid-cols-3 gap-2 mt-6 border-t border-slate-100 dark:border-slate-800 pt-4">
        <div className="flex flex-col items-center">
          <span className="text-xs text-slate-500 flex items-center gap-1 mb-1"><BookOpen className="w-3 h-3" /> Total</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">{progress.totalChapters}</span>
        </div>
        <div className="flex flex-col items-center border-l border-r border-slate-100 dark:border-slate-800">
          <span className="text-xs text-emerald-600 flex items-center gap-1 mb-1"><CheckCircle2 className="w-3 h-3" /> Done</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">{progress.completedChapters}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-amber-600 flex items-center gap-1 mb-1"><CircleDashed className="w-3 h-3" /> Pending</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">{progress.pendingChapters}</span>
        </div>
      </div>
    </div>
  );
}
