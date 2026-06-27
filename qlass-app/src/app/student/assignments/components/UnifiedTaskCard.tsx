"use client";
import { TaskItem } from "../types";
import { Bookmark, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function UnifiedTaskCard({ task }: { task: TaskItem }) {
  const isDPP = task.taskType === "DPP";
  
  return (
    <div className={cn(
      "bg-white dark:bg-slate-900 border rounded-2xl p-5 flex flex-col relative group transition-all duration-300 hover:shadow-xl",
      task.status === "Overdue" ? "border-red-200 dark:border-red-800/50 hover:border-red-400 dark:hover:border-red-600 shadow-red-500/5" :
      task.status === "Evaluated" || task.status === "Submitted" ? "border-slate-200 dark:border-slate-800 opacity-75 hover:opacity-100" :
      "border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 shadow-emerald-500/5"
    )}>
      
      {/* Header & Badges */}
      <div className="flex justify-between items-start mb-4">
        <span className={cn(
          "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
          isDPP ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
        )}>
          {task.taskType}
        </span>
        <button className={cn("p-1 rounded-md transition-colors", task.bookmarked ? "text-emerald-500" : "text-slate-300 hover:text-slate-500")}>
          <Bookmark className="w-4 h-4" fill={task.bookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Main Info */}
      <div className="flex-1">
        <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
          {task.title}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
          {task.subject} • {task.chapter}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
          {task.teacherName} • {task.estimatedTime} mins
        </p>
      </div>

      {/* Date & Alert */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 mb-4">
        <div className={cn(
          "flex items-center gap-1.5 text-xs font-semibold",
          task.status === "Overdue" ? "text-red-600 dark:text-red-400" : "text-slate-500 dark:text-slate-400"
        )}>
          {task.status === "Overdue" ? <AlertCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
          Due {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </div>
      </div>

      {/* CTA Footer */}
      <Link 
        href={`/student/assignments/${task.id}`}
        className={cn(
          "w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all",
          task.status === "Not Started" ? "border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400" :
          task.status === "In Progress" ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-500/20" :
          task.status === "Overdue" ? "bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/20" :
          task.status === "Submitted" ? "bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-default" :
          "bg-slate-50 dark:bg-slate-800/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
        )}
      >
        {task.status === "Not Started" ? "Start Practice" :
         task.status === "In Progress" || task.status === "Overdue" ? "Continue" :
         task.status === "Submitted" ? "Under Review" :
         <><CheckCircle2 className="w-4 h-4" /> View Feedback</>}
      </Link>
    </div>
  );
}
