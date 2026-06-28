"use client";

import { mockAiInsights } from "@/lib/dummyData";
import { BrainCircuit, AlertTriangle, Lightbulb, TrendingUp, Sparkles, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AiInsights() {
  const getInsightConfig = (type: string) => {
    switch (type) {
      case "warning": return { icon: <AlertTriangle size={14} />, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/30" };
      case "suggestion": return { icon: <Lightbulb size={14} />, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30" };
      case "positive": return { icon: <TrendingUp size={14} />, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/30" };
      default: return { icon: <Sparkles size={14} />, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-900/20 border-violet-100 dark:border-violet-900/30" };
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden shadow-sm">
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-violet-500/20">
            <BrainCircuit size={16} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-white tracking-tight">AI Insights</h2>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Powered by QLASS AI</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
        <div className="flex flex-col gap-2">
          {mockAiInsights.map((insight, index) => {
            const config = getInsightConfig(insight.type);
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn("p-3 rounded-xl border transition-all hover:shadow-sm", config.bg)}
              >
                <div className="flex items-start gap-2.5">
                  <div className={cn("mt-0.5 p-1 bg-white dark:bg-slate-800 rounded-md shadow-sm", config.color)}>
                    {config.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] font-medium text-slate-700 dark:text-slate-300 leading-snug">
                      {insight.message}
                    </p>
                    <button className="mt-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors">
                      {insight.actionText} <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
