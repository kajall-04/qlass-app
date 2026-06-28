"use client";

import { useState } from "react";
import { mockStudentInsightsChart } from "@/lib/dummyData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartCard } from "@/components/teacher/shared/ChartCard";
import { TrendingUp } from "lucide-react";

export function StudentInsightsChart() {
  const [period, setPeriod] = useState("6m");

  const data = period === "3m"
    ? mockStudentInsightsChart.slice(-3)
    : period === "1m"
    ? mockStudentInsightsChart.slice(-1)
    : mockStudentInsightsChart;

  return (
    <ChartCard
      title="Performance Trend"
      subtitle="Average score across all classes"
      icon={<TrendingUp size={16} />}
      legend={[
        { color: "#3B82F6", label: "Avg Score" },
        { color: "#A78BFA", label: "DPP Score" },
        { color: "#10B981", label: "Attendance" },
      ]}
      periodSelector={{
        options: [
          { id: "6m", label: "6M" },
          { id: "3m", label: "3M" },
          { id: "1m", label: "1M" },
        ],
        value: period,
        onChange: setPeriod,
      }}
      height={260}
    >
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorDpp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#A78BFA" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
          dy={8}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#94A3B8', fontSize: 11 }}
          domain={[60, 100]}
        />
        <Tooltip
          contentStyle={{
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            fontSize: '12px',
            fontWeight: 500,
          }}
        />
        <Area
          type="monotone"
          dataKey="attendance"
          stroke="#10B981"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorAtt)"
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="dppScore"
          stroke="#A78BFA"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorDpp)"
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="avgScore"
          stroke="#3B82F6"
          strokeWidth={2.5}
          fillOpacity={1}
          fill="url(#colorScore)"
          dot={{ r: 3, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
          activeDot={{ r: 5, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
        />
      </AreaChart>
    </ChartCard>
  );
}
