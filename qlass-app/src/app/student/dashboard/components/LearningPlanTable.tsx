"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, FileText, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LearningPlanItem } from "../types";

export function LearningPlanTable({ items, isLoading }: { items?: LearningPlanItem[]; isLoading: boolean }) {
  if (isLoading || !items) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 col-span-1 lg:col-span-2 shadow-sm">
        <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-6" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4 p-2 border-b border-slate-100 dark:border-slate-800/50">
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: LearningPlanItem["status"]) => {
    switch (status) {
      case "Completed":
        return "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 ring-1 ring-emerald-600/20";
      case "Upcoming":
        return "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 ring-1 ring-amber-600/20";
      case "Scheduled":
        return "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-600/20";
      case "Cancelled":
        return "text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 ring-1 ring-rose-600/20";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 col-span-1 lg:col-span-2 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          Today's Learning Plan
        </h3>
        <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors flex items-center gap-1 group">
          View full plan <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 pr-4 font-semibold whitespace-nowrap">Time</th>
              <th className="pb-3 px-4 font-semibold">Subject</th>
              <th className="pb-3 px-4 font-semibold min-w-[150px]">Topic</th>
              <th className="pb-3 px-4 font-semibold whitespace-nowrap">Teacher</th>
              <th className="pb-3 px-4 font-semibold">Type</th>
              <th className="pb-3 pl-4 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <motion.tr 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
              >
                <td className="py-3.5 pr-4 text-[13px] text-slate-500 dark:text-slate-400 whitespace-nowrap tabular-nums">
                  {item.time}
                </td>
                <td className="py-3.5 px-4 text-[13px] font-semibold text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {item.subject}
                </td>
                <td className="py-3.5 px-4 text-[13px] text-slate-700 dark:text-slate-300">
                  {item.topic}
                </td>
                <td className="py-3.5 px-4 text-[13px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  {item.teacher}
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-md">
                    {item.type}
                  </span>
                </td>
                <td className="py-3.5 pl-4 text-right">
                  <span className={cn(
                    "inline-flex items-center justify-center text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap",
                    getStatusBadge(item.status)
                  )}>
                    {item.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        
        {items.length === 0 && (
          <div className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
            No classes scheduled for today.
          </div>
        )}
      </div>
    </div>
  );
}
