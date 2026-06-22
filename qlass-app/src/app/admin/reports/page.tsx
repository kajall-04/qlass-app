"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { BarChart3, TrendingUp, Users, BookOpen } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

export default function AdminReportsPage() {
  const data = useMemo(() => getSeedData(), []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Monthly Performance Overview</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data.chartData.monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94A3B8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="avg" name="Average" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="highest" name="Highest" stroke="#22C55E" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="lowest" name="Lowest" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Subject-wise Average Scores</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.chartData.subjectScores}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
              <Bar dataKey="score" name="Avg Score" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Attendance Trend — All Classes</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data.chartData.attendanceTrend}>
            <defs>
              <linearGradient id="rpColorOverall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} /><stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94A3B8" }} />
            <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} domain={[70, 100]} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey="Overall" stroke="#2563EB" strokeWidth={2.5} fill="url(#rpColorOverall)" />
            <Area type="monotone" dataKey="Class 10" stroke="#8B5CF6" strokeWidth={2} fill="transparent" />
            <Area type="monotone" dataKey="Class 9" stroke="#22C55E" strokeWidth={2} fill="transparent" />
            <Area type="monotone" dataKey="Class 8" stroke="#F59E0B" strokeWidth={2} fill="transparent" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
