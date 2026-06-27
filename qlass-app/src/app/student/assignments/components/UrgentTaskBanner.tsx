"use client";
import { TaskItem } from "../types";
import { AlertCircle, Play, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function UrgentTaskBanner({ tasks }: { tasks: TaskItem[] }) {
  // Find the most urgent task:
  // 1. Overdue
  // 2. In Progress
  // 3. Nearest Due Date (Not Started)
  
  const pendingTasks = tasks.filter(t => t.status !== "Evaluated" && t.status !== "Submitted");
  if (pendingTasks.length === 0) return null;

  const overdue = pendingTasks.find(t => t.status === "Overdue");
  const inProgress = pendingTasks.find(t => t.status === "In Progress");
  
  // Tasks already sorted by due date in mock API
  const urgentTask = overdue || inProgress || pendingTasks[0];

  const isOverdue = urgentTask.status === "Overdue";
  const isInProgress = urgentTask.status === "In Progress";

  return (
    <div className={cn(
      "rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden group",
      isOverdue ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50" :
      isInProgress ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50" :
      "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50"
    )}>
      
      {/* Decorative background blur */}
      <div className={cn(
        "absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 transition-transform duration-700 group-hover:scale-110",
        isOverdue ? "bg-red-400" : isInProgress ? "bg-amber-400" : "bg-emerald-400"
      )} />

      <div className="relative z-10 flex-1">
        <div className="flex items-center gap-2 mb-3">
          {isOverdue ? <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" /> : <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          <span className={cn(
            "text-sm font-bold uppercase tracking-wider",
            isOverdue ? "text-red-700 dark:text-red-400" : 
            isInProgress ? "text-amber-700 dark:text-amber-400" : 
            "text-emerald-700 dark:text-emerald-400"
          )}>
            {isOverdue ? "Priority Focus: Overdue" : isInProgress ? "Resume Learning" : "Up Next"}
          </span>
        </div>

        <h3 className={cn(
          "text-2xl sm:text-3xl font-black mb-2",
          isOverdue ? "text-red-950 dark:text-red-100" : "text-slate-900 dark:text-white"
        )}>
          {urgentTask.title}
        </h3>
        
        <p className={cn(
          "text-sm font-medium",
          isOverdue ? "text-red-800/80 dark:text-red-200/70" : "text-slate-600 dark:text-slate-400"
        )}>
          {urgentTask.subject} • {urgentTask.chapter} • Due {new Date(urgentTask.dueDate).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
        </p>
      </div>

      <div className="relative z-10 shrink-0 w-full sm:w-auto">
        <Link 
          href={`/student/assignments/${urgentTask.id}`}
          className={cn(
            "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all hover:shadow-lg focus:ring-4 focus:outline-none",
            isOverdue ? "bg-red-600 hover:bg-red-700 focus:ring-red-600/20 shadow-red-600/20" : 
            isInProgress ? "bg-amber-600 hover:bg-amber-700 focus:ring-amber-600/20 shadow-amber-600/20" : 
            "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-600/20 shadow-emerald-600/20"
          )}
        >
          {isInProgress ? (
            <><Play className="w-5 h-5 fill-current" /> Continue Practice</>
          ) : (
            <>Start Now <ArrowRight className="w-5 h-5" /></>
          )}
        </Link>
      </div>
    </div>
  );
}
