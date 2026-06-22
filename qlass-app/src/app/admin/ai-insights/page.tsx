"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { Brain, AlertTriangle, TrendingUp, Users, Lightbulb, Sparkles, Target } from "lucide-react";

export default function AdminAIInsightsPage() {
  const data = useMemo(() => getSeedData(), []);
  const ai = data.aiInsights;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        {[
          { label: "Questions Analysed", value: ai.questionsAnalysed.toLocaleString(), icon: Brain, bg: "bg-violet-600" },
          { label: "Reports Generated", value: ai.reportsGenerated, icon: Target, bg: "bg-blue-600" },
          { label: "Students Improving", value: ai.studentsImproving, icon: TrendingUp, bg: "bg-emerald-600" },
          { label: "High-Risk Students", value: ai.highRiskStudents, icon: AlertTriangle, bg: "bg-red-600" },
        ].map(s => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-2", s.bg)}><s.icon className="w-4 h-4 text-white" /></div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* AI Summary */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-2 mb-3"><Sparkles className="w-5 h-5" /><h3 className="text-base font-bold">AI Summary</h3></div>
        <p className="text-violet-100 text-sm leading-relaxed">{ai.summary}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Predictive Risk */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" /> Predictive Risk Scores
          </h3>
          {ai.predictiveRiskScores.map((s, i) => (
            <div key={i} className="py-3 border-b border-slate-50 dark:border-slate-800 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{s.name}</span>
                  <span className="text-xs text-slate-400 ml-2">Class {s.class}</span>
                </div>
                <span className={cn("text-sm font-bold px-2.5 py-1 rounded-full",
                  s.risk >= 85 ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                )}>{s.risk}%</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {s.factors.map((f, fi) => (
                  <span key={fi} className="text-[10px] bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-md">{f}</span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Recommendations */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" /> AI Recommendations
          </h3>
          <div className="space-y-3">
            {ai.recommendations.map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30">
                <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0 text-xs font-bold text-amber-700 dark:text-amber-400">{i + 1}</span>
                <p className="text-sm text-amber-900 dark:text-amber-200">{r}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Improving Students */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-500" /> Most Improved Students
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ai.improvingStudents.map((s, i) => (
            <div key={i} className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-xl p-4">
              <div className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">{s.name}</div>
              <div className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">Class {s.class} · {s.area}</div>
              <div className="text-xl font-bold text-emerald-600 mt-2">{s.improvement}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
