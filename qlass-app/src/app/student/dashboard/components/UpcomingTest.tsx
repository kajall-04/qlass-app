"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, CalendarDays } from "lucide-react";
import type { UpcomingTest } from "../types";

export function UpcomingTest({ test, isLoading }: { test?: UpcomingTest | null; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm col-span-1 h-full">
        <div className="h-5 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-6" />
        <div className="flex gap-4">
          <div className="w-14 h-14 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm col-span-1 h-full flex flex-col items-center justify-center text-center">
        <CalendarDays className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">No Upcoming Tests</h3>
        <p className="text-xs text-slate-500 mt-1">You don't have any tests scheduled soon.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm col-span-1 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Upcoming Test
        </h3>
        <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors flex items-center gap-1 group">
          View all <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col justify-center"
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 flex flex-col items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase leading-none mb-1">
              {test.date.split(' ')[1]}
            </span>
            <span className="text-lg font-black text-blue-700 dark:text-blue-300 leading-none">
              {test.date.split(' ')[0]}
            </span>
          </div>
          
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              {test.title}
            </h4>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <Clock className="w-3 h-3" />
              {test.time}
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="inline-flex items-center justify-center px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-[10px] font-bold rounded-lg border border-amber-200/50 dark:border-amber-800/50 uppercase tracking-wider">
              {test.daysLeft} Days Left
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
