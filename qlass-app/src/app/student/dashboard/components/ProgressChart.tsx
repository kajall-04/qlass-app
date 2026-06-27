"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { ProgressSnapshot } from "../types";

export function ProgressChart({ progress, isLoading }: { progress?: ProgressSnapshot; isLoading: boolean }) {
  if (isLoading || !progress) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm col-span-1 h-full min-h-[300px]">
        <div className="h-6 w-2/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-6" />
        <div className="flex items-center gap-6">
          <div className="w-[120px] h-[120px] rounded-full border-[12px] border-slate-100 dark:border-slate-800 animate-pulse shrink-0" />
          <div className="space-y-4 flex-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                <div className="h-4 w-8 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const data = [
    { name: "Completed", value: progress.completed, color: "#10B981" },
    { name: "In Progress", value: progress.inProgress, color: "#F59E0B" },
    { name: "Not Started", value: progress.notStarted, color: "#E2E8F0" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm col-span-1 flex flex-col h-full min-h-[300px]">
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">
        My Progress Snapshot
      </h3>

      <div className="flex flex-col sm:flex-row items-center gap-6 flex-1 mb-4">
        <div className="relative w-[140px] h-[140px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 2 ? "currentColor" : entry.color} className={index === 2 ? "text-slate-100 dark:text-slate-800" : ""} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: 600 }}
                itemStyle={{ color: '#1e293b' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.span 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-2xl font-black text-slate-900 dark:text-white leading-none"
            >
              {progress.overall}%
            </motion.span>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Overall</span>
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col gap-3 justify-center">
          {data.map((item, i) => (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i + 0.2 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.name === "Not Started" ? "#94A3B8" : item.color }} />
                <span className="text-[13px] font-medium text-slate-600 dark:text-slate-400">{item.name}</span>
              </div>
              <span className="text-[13px] font-bold text-slate-900 dark:text-white">{item.value}%</span>
            </motion.div>
          ))}
        </div>
      </div>

      <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors flex items-center gap-1 group self-start mt-auto">
        View detailed progress <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
