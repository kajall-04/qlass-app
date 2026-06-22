"use client";

import { useState } from "react";
import { DashboardCard } from "./dashboard-card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, ChevronDown } from "lucide-react";
import type { WeakTopicRow, TopicTrend, SuggestedAction } from "@/types/dashboard";

interface WeakTopicsProps {
  data: WeakTopicRow[];
}

const trendConfig: Record<TopicTrend, { icon: React.ElementType; color: string; label: string }> = {
  Improving: { icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400", label: "↑ Improving" },
  Declining: { icon: TrendingDown, color: "text-red-600 dark:text-red-400", label: "↓ Declining" },
  Stable: { icon: Minus, color: "text-slate-500 dark:text-slate-400", label: "→ Stable" },
};

const actionColors: Record<SuggestedAction, string> = {
  "Assign DPP": "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
  "Revision Session": "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400",
  "Lecture Recording": "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
};

export function WeakTopics({ data }: WeakTopicsProps) {
  const [openAction, setOpenAction] = useState<string | null>(null);

  return (
    <DashboardCard title="Weak Topics" delay={0.4}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <th className="text-left text-[11px] font-semibold text-slate-500 dark:text-slate-400 pb-3 pr-3">
                Topic
              </th>
              <th className="text-left text-[11px] font-semibold text-slate-500 dark:text-slate-400 pb-3 pr-3">
                Subject
              </th>
              <th className="text-left text-[11px] font-semibold text-slate-500 dark:text-slate-400 pb-3 pr-3">
                Avg Score
              </th>
              <th className="text-left text-[11px] font-semibold text-slate-500 dark:text-slate-400 pb-3 pr-3">
                Attempts
              </th>
              <th className="text-left text-[11px] font-semibold text-slate-500 dark:text-slate-400 pb-3 pr-3">
                Trend
              </th>
              <th className="text-left text-[11px] font-semibold text-slate-500 dark:text-slate-400 pb-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const trend = trendConfig[row.trend];
              const scoreColor =
                row.avgScore >= 60
                  ? "text-emerald-600 dark:text-emerald-400"
                  : row.avgScore >= 40
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-red-600 dark:text-red-400";

              return (
                <tr
                  key={row.id}
                  className="border-b border-slate-50 dark:border-slate-800/50 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-3 pr-3">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {row.topic}
                    </span>
                  </td>
                  <td className="py-3 pr-3">
                    <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-md whitespace-nowrap">
                      {row.subject}
                    </span>
                  </td>
                  <td className="py-3 pr-3">
                    <span className={cn("text-sm font-bold tabular-nums", scoreColor)}>
                      {row.avgScore}%
                    </span>
                  </td>
                  <td className="py-3 pr-3">
                    <span className="text-sm text-slate-700 dark:text-slate-300 tabular-nums">
                      {row.attempts}
                    </span>
                  </td>
                  <td className="py-3 pr-3">
                    <span className={cn("text-xs font-semibold", trend.color)}>
                      {trend.label}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="relative">
                      <button
                        onClick={() => setOpenAction(openAction === row.id ? null : row.id)}
                        className={cn(
                          "inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors",
                          actionColors[row.suggestedAction]
                        )}
                      >
                        {row.suggestedAction}
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      {openAction === row.id && (
                        <div className="absolute right-0 top-8 z-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden min-w-[160px]">
                          {(["Assign DPP", "Revision Session", "Lecture Recording"] as SuggestedAction[]).map(
                            (action) => (
                              <button
                                key={action}
                                onClick={() => setOpenAction(null)}
                                className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                              >
                                {action}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}
