"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn, getPercentageColor } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function StudentSubjectsPage() {
  const data = useMemo(() => getSeedData(), []);
  const student = data.students[0];
  const subjects = Object.entries(student.marks);
  const chartData = subjects.map(([name, score]) => ({ name: name.length > 8 ? name.slice(0, 8) + "." : name, score }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjects.map(([name, score], i) => (
          <motion.div key={name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:shadow-md transition-shadow">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">{name}</h4>
            <div className={cn("text-2xl font-bold", getPercentageColor(score))}>{score}%</div>
            <div className="mt-2 w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className={cn("h-full rounded-full", score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-blue-500" : score >= 40 ? "bg-amber-500" : "bg-red-500")} style={{ width: `${score}%` }} />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Subject-wise Performance</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} />
            <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} domain={[0, 100]} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
            <Bar dataKey="score" name="Score" fill="#10B981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
