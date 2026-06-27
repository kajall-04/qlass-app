"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bell, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Announcement } from "../types";

export function Announcements({ items, isLoading }: { items?: Announcement[]; isLoading: boolean }) {
  if (isLoading || !items) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm col-span-1 lg:col-span-3">
        <div className="h-5 w-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-6" />
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-4 items-center pb-4 border-b border-slate-100 dark:border-slate-800/50 last:border-0">
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              </div>
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm col-span-1 lg:col-span-3">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Recent Announcements
        </h3>
        <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors flex items-center gap-1 group">
          View all announcements <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="flex flex-col">
        {items.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="flex items-center gap-4 py-3 border-b border-slate-50 dark:border-slate-800/50 last:border-0 last:pb-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors -mx-2 px-2 rounded-xl group cursor-pointer"
          >
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
              item.priority === "high" 
                ? "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 group-hover:bg-rose-100" 
                : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100"
            )}>
              {item.priority === "high" ? <AlertTriangle className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
            </div>
            
            <div className="flex-1">
              <h4 className={cn(
                "text-sm font-bold transition-colors",
                item.priority === "high" ? "text-rose-700 dark:text-rose-400" : "text-slate-900 dark:text-white"
              )}>
                {item.title}
              </h4>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {item.date}
              </span>
            </div>
          </motion.div>
        ))}
        
        {items.length === 0 && (
          <div className="py-6 text-center text-slate-500 dark:text-slate-400 text-sm">
            No recent announcements.
          </div>
        )}
      </div>
    </div>
  );
}
