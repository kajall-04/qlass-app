"use client";

import { DashboardCard } from "./dashboard-card";
import { ProgressBar } from "./progress-bar";
import { cn } from "@/lib/utils";
import { Trophy, TrendingUp, AlertTriangle, BookOpen, FileText, UserCheck } from "lucide-react";
import type { TopClassRow, LowClassRow } from "@/types/dashboard";

// ═══════════════════════════════════════
// TOP PERFORMING CLASSES
// ═══════════════════════════════════════

interface TopClassLeaderboardProps {
  data: TopClassRow[];
}

const rankEmojis = ["🥇", "🥈", "🥉"];

export function TopClassLeaderboard({ data }: TopClassLeaderboardProps) {
  return (
    <DashboardCard
      title="Top Performing Classes"
      delay={0.5}
      action={
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20">
          <Trophy className="w-3 h-3 text-emerald-500" />
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
            Top {data.length}
          </span>
        </div>
      }
    >
      <div className="space-y-0">
        {data.map((row, i) => (
          <div
            key={row.rank}
            className={cn(
              "flex items-center gap-3 py-3",
              i < data.length - 1 && "border-b border-slate-100 dark:border-slate-800"
            )}
          >
            {/* Rank */}
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-base">
              {i < 3 ? (
                <span>{rankEmojis[i]}</span>
              ) : (
                <span className="text-sm font-bold text-slate-400">#{row.rank}</span>
              )}
            </div>

            {/* Class info */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-900 dark:text-white">
                {row.className}
              </div>
              <div className="flex items-center gap-3 mt-1.5">
                <ProgressBar value={row.avgScore} size="sm" className="flex-1" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 tabular-nums shrink-0">
                  {row.avgScore}%
                </span>
              </div>
            </div>

            {/* Growth */}
            <div className={cn(
              "text-xs font-bold tabular-nums shrink-0",
              row.growth >= 0
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400"
            )}>
              <TrendingUp className={cn("w-3.5 h-3.5 inline mr-0.5", row.growth < 0 && "rotate-180")} />
              {row.growth >= 0 ? "+" : ""}{row.growth}%
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}

// ═══════════════════════════════════════
// LOW PERFORMING CLASSES
// ═══════════════════════════════════════

interface LowClassLeaderboardProps {
  data: LowClassRow[];
}

const riskConfig: Record<string, { bg: string; text: string }> = {
  Low: { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-700 dark:text-emerald-400" },
  Medium: { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-700 dark:text-amber-400" },
  High: { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-700 dark:text-orange-400" },
  Critical: { bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-700 dark:text-red-400" },
};

const suggestedActions = [
  { icon: BookOpen, label: "Schedule Revision", color: "text-violet-600 dark:text-violet-400" },
  { icon: FileText, label: "Assign DPP", color: "text-blue-600 dark:text-blue-400" },
  { icon: UserCheck, label: "Teacher Review", color: "text-amber-600 dark:text-amber-400" },
];

export function LowClassLeaderboard({ data }: LowClassLeaderboardProps) {
  return (
    <DashboardCard
      title="Low Performing Classes"
      delay={0.55}
      action={
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-900/20">
          <AlertTriangle className="w-3 h-3 text-red-500" />
          <span className="text-[11px] font-bold text-red-600 dark:text-red-400">
            Needs Attention
          </span>
        </div>
      }
    >
      <div className="space-y-0">
        {data.map((row, i) => {
          const risk = riskConfig[row.riskLevel] || riskConfig.Medium;
          return (
            <div
              key={row.rank}
              className={cn(
                "py-3",
                i < data.length - 1 && "border-b border-slate-100 dark:border-slate-800"
              )}
            >
              <div className="flex items-center gap-3">
                {/* Rank */}
                <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-red-600 dark:text-red-400">#{row.rank}</span>
                </div>

                {/* Class info */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-900 dark:text-white">
                    {row.className}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <ProgressBar
                      value={row.avgScore}
                      size="sm"
                      className="flex-1"
                      color="bg-red-500"
                    />
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 tabular-nums shrink-0">
                      {row.avgScore}%
                    </span>
                  </div>
                </div>

                {/* Risk badge */}
                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0", risk.bg, risk.text)}>
                  {row.riskLevel}
                </span>
              </div>

              {/* Suggested actions */}
              <div className="flex items-center gap-2 mt-2.5 pl-11">
                {suggestedActions.map((action) => (
                  <button
                    key={action.label}
                    className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                  >
                    <action.icon className={cn("w-3 h-3", action.color)} />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
}
