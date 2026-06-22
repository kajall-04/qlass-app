"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#2563EB", "#8B5CF6", "#22C55E", "#F59E0B", "#EF4444", "#06B6D4"];

export default function AdminAnalyticsPage() {
  const data = useMemo(() => getSeedData(), []);
  const riskDistribution = [
    { name: "Low", value: data.students.filter(s => s.riskLevel === "Low").length },
    { name: "Medium", value: data.students.filter(s => s.riskLevel === "Medium").length },
    { name: "High", value: data.students.filter(s => s.riskLevel === "High").length },
    { name: "Critical", value: data.students.filter(s => s.riskLevel === "Critical").length },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Student Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                {riskDistribution.map((_, i) => <Cell key={i} fill={[`#22C55E`, `#3B82F6`, `#F59E0B`, `#EF4444`][i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">DPP Submission Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.chartData.dppSubmission}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94A3B8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
              <Bar dataKey="rate" name="Submission %" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Teacher Performance Heatmap</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-slate-100 dark:border-slate-800">
              {["Teacher","Audit","Lectures","DPP Rate","Students","Satisfaction"].map(h => <th key={h} className="text-left text-xs font-semibold text-slate-500 px-3 py-2">{h}</th>)}
            </tr></thead>
            <tbody>
              {data.teachers.slice(0, 10).map(t => (
                <tr key={t.id} className="border-b border-slate-50 dark:border-slate-800/50">
                  <td className="px-3 py-2 text-sm font-medium text-slate-900 dark:text-white">{t.name}</td>
                  {[t.auditScore, t.lectureCompletion, t.dppAssignmentRate, t.studentPerformance, t.studentSatisfaction].map((v, i) => (
                    <td key={i} className="px-3 py-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${v >= 80 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : v >= 60 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>{v}%</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
