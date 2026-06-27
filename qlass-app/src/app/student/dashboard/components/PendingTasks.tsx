"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, Activity, PlaySquare, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PendingTask } from "../types";

export function PendingTasks({ tasks, isLoading }: { tasks?: PendingTask[]; isLoading: boolean }) {
  if (isLoading || !tasks) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="h-6 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-6" />
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getIcon = (type: PendingTask["type"], colorClass?: string) => {
    const baseClass = cn("w-5 h-5", colorClass?.split(" ")[0]);
    switch (type) {
      case "dpp": return <FileText className={baseClass} />;
      case "test": return <Activity className={baseClass} />;
      case "recording": return <PlaySquare className={baseClass} />;
      case "review": return <AlertCircle className={baseClass} />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          Pending Tasks
        </h3>
        <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors flex items-center gap-1 group">
          View all <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {tasks.map((task, i) => (
          <motion.div 
            key={task.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="group flex items-center justify-between p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", task.colorClass?.split(" ")[1])}>
                {getIcon(task.type, task.colorClass)}
              </div>
              <div>
                <div className="text-[13px] font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {task.title}
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  {task.subtitle}
                </div>
              </div>
            </div>
            {task.count !== undefined && (
              <span className="text-[13px] font-bold text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 group-hover:text-blue-600 group-hover:border-blue-200 dark:group-hover:border-blue-900/50 transition-colors shadow-sm">
                {task.count}
              </span>
            )}
          </motion.div>
        ))}
        
        {tasks.length === 0 && (
          <div className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
            You're all caught up! 🎉
          </div>
        )}
      </div>
    </div>
  );
}
