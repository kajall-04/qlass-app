"use client";
import { useMemo } from "react";
import { getSeedData } from "@/data/seed";
import { TrendingUp, Award, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

export default function StudentPerformancePage() {
  const data = useMemo(() => getSeedData(), []);
  const student = data.students[0];

  const chartData = [
    { name: "Jan", score: 75 },
    { name: "Feb", score: 82 },
    { name: "Mar", score: 78 },
    { name: "Apr", score: 85 },
    { name: "May", score: student.avgScore },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center"><TrendingUp className="w-5 h-5" /></div>
            <div><div className="text-sm font-semibold text-slate-900 dark:text-white">Avg Score</div><div className="text-2xl font-bold text-blue-600">{student.avgScore}%</div></div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center"><Award className="w-5 h-5" /></div>
            <div><div className="text-sm font-semibold text-slate-900 dark:text-white">Rank</div><div className="text-2xl font-bold text-amber-600">#{student.rank}</div></div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center"><AlertTriangle className="w-5 h-5" /></div>
            <div><div className="text-sm font-semibold text-slate-900 dark:text-white">Risk Level</div><div className={cn("text-2xl font-bold", student.riskLevel === "Low" ? "text-emerald-600" : "text-red-600")}>{student.riskLevel}</div></div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Performance Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94A3B8" }} />
            <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} domain={[0, 100]} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
            <Bar dataKey="score" fill="#3B82F6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
