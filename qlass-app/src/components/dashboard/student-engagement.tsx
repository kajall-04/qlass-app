"use client";

import { DashboardCard } from "./dashboard-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, UserCheck, UserX, TrendingUp } from "lucide-react";
import type { StudentEngagementData } from "@/types/dashboard";

interface StudentEngagementProps {
  data: StudentEngagementData;
}

export function StudentEngagement({ data }: StudentEngagementProps) {
  // Donut chart calculations
  const size = 180;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const activePercRaw = data.totalStudents ? (data.activeStudents / data.totalStudents) * 100 : 0;
  const inactivePercRaw = data.totalStudents ? (data.inactiveStudents / data.totalStudents) * 100 : 0;

  // Add a small visual gap between segments if both exist
  const gap = activePercRaw > 0 && inactivePercRaw > 0 ? 1.5 : 0;
  const scale = (100 - 2 * gap) / 100;
  
  const activePerc = activePercRaw * scale;
  const inactivePerc = inactivePercRaw * scale;

  const activeOffset = circumference - (activePerc / 100) * circumference;
  const inactiveOffset = circumference - (inactivePerc / 100) * circumference;

  const inactiveRotation = ((activePerc + gap) / 100) * 360;

  return (
    <DashboardCard title="Student Engagement Overview" delay={0.3}>
      <div className="flex flex-col items-center">
        {/* Donut Chart */}
        <div className="relative mb-4">
          <svg width={size} height={size} className="-rotate-90">
            {/* Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(148, 163, 184, 0.1)"
              strokeWidth={strokeWidth}
            />
            {/* Active segment (green) */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#10B981"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: activeOffset }}
              transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
            />
            {/* Inactive segment (red) */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#EF4444"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: inactiveOffset }}
              transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
              style={{ transform: `rotate(${inactiveRotation}deg)`, transformOrigin: "center" }}
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
              {data.totalStudents}
            </span>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Students
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-5 mb-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Active ({data.activeStudents})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Inactive ({data.inactiveStudents})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Attendance {data.avgAttendance}%
            </span>
          </div>
        </div>

        {/* Mini Stats */}
        <div className="grid grid-cols-3 gap-3 w-full border-t border-slate-100 dark:border-slate-800 pt-4 mb-4">
          <div className="flex flex-col items-center p-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/10">
            <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-1" />
            <span className="text-sm font-bold text-slate-900 dark:text-white">{data.presentToday}</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Present Today</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-xl bg-red-50 dark:bg-red-900/10">
            <UserX className="w-4 h-4 text-red-600 dark:text-red-400 mb-1" />
            <span className="text-sm font-bold text-slate-900 dark:text-white">{data.absentToday}</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Absent Today</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-xl bg-blue-50 dark:bg-blue-900/10">
            <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-1" />
            <span className="text-sm font-bold text-slate-900 dark:text-white">{data.avgAttendance}%</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Att. Trend</span>
          </div>
        </div>

        {/* 7-Day Attendance Trend */}
        <div className="w-full">
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-2">
            7-Day Attendance Trend
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={data.attendanceTrend}>
              <defs>
                <linearGradient id="attGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 11 }}
                formatter={(value) => [`${value}%`, "Attendance"]}
              />
              <Area type="monotone" dataKey="percentage" stroke="#2563EB" strokeWidth={2} fill="url(#attGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardCard>
  );
}
