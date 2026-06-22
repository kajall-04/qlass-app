"use client";

import { useState } from "react";
import { DashboardCard } from "./dashboard-card";
import { CircularProgress } from "./circular-progress";
import { cn } from "@/lib/utils";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import type { AcademicPerformanceData } from "@/types/dashboard";

interface PerformanceInsightsProps {
  data: AcademicPerformanceData;
}

type ViewMode = "class" | "subject" | "month";

export function PerformanceInsights({ data }: PerformanceInsightsProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("class");

  const dppTrendColor = data.dppChange >= 3 ? "text-emerald-600 dark:text-emerald-400" :
    data.dppChange >= 0 ? "text-amber-600 dark:text-amber-400" :
    "text-red-600 dark:text-red-400";

  const testTrendColor = data.testChange >= 3 ? "text-emerald-600 dark:text-emerald-400" :
    data.testChange >= 0 ? "text-amber-600 dark:text-amber-400" :
    "text-red-600 dark:text-red-400";

  return (
    <DashboardCard
      title="Academic Performance Insights"
      delay={0.25}
      action={
        <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
          {(["class", "subject", "month"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={cn(
                "px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",
                viewMode === mode
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
              )}
            >
              {mode === "class" ? "By Class" : mode === "subject" ? "By Subject" : "By Month"}
            </button>
          ))}
        </div>
      }
    >
      {/* Circular Rings */}
      <div className="flex items-center justify-center gap-8 mb-6">
        {/* DPP Score Ring */}
        <div className="flex flex-col items-center">
          <CircularProgress
            value={data.avgDppScore}
            size={110}
            strokeWidth={10}
            label="DPP Score"
            delay={0.3}
          />
          <div className={cn("flex items-center gap-1 mt-2 text-xs font-semibold", dppTrendColor)}>
            {data.dppChange >= 0 ? "↑" : "↓"} {data.dppChange >= 0 ? "+" : ""}{data.dppChange}%
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-24 bg-slate-200 dark:bg-slate-700" />

        {/* Test Score Ring */}
        <div className="flex flex-col items-center">
          <CircularProgress
            value={data.avgTestScore}
            size={110}
            strokeWidth={10}
            label="Test Score"
            delay={0.5}
          />
          <div className={cn("flex items-center gap-1 mt-2 text-xs font-semibold", testTrendColor)}>
            {data.testChange >= 0 ? "↑" : "↓"} {data.testChange >= 0 ? "+" : ""}{data.testChange}%
          </div>
        </div>
      </div>

      {/* Growth Stats */}
      <div className="flex items-center justify-center gap-6 mb-4">
        <div className="text-center">
          <div className="text-xs text-slate-500 dark:text-slate-400">Weekly Growth</div>
          <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">+{data.weeklyGrowth}%</div>
        </div>
        <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
        <div className="text-center">
          <div className="text-xs text-slate-500 dark:text-slate-400">Monthly Growth</div>
          <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">+{data.monthlyGrowth}%</div>
        </div>
      </div>

      {/* Mini Trend Chart */}
      <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={data.trend}>
            <defs>
              <linearGradient id="dppGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="testGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" strokeOpacity={0.5} />
            <XAxis dataKey="period" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={30} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E2E8F0",
                fontSize: 11,
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Area type="monotone" dataKey="dppScore" name="DPP Score" stroke="#2563EB" strokeWidth={2} fill="url(#dppGradient)" />
            <Area type="monotone" dataKey="testScore" name="Test Score" stroke="#8B5CF6" strokeWidth={2} fill="url(#testGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
