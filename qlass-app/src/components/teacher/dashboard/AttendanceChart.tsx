"use client";

import { mockAttendanceTrend } from "@/lib/dummyData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from "recharts";
import { ChartCard } from "@/components/teacher/shared/ChartCard";
import { CheckSquare } from "lucide-react";

export function AttendanceChart() {
  return (
    <ChartCard
      title="Attendance Trend"
      subtitle="This week's attendance breakdown"
      icon={<CheckSquare size={16} />}
      legend={[
        { color: "#10B981", label: "Present" },
        { color: "#F43F5E", label: "Absent" },
        { color: "#3B82F6", label: "%" },
      ]}
      height={260}
    >
      <ComposedChart data={mockAttendanceTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
          dy={8}
        />
        <YAxis
          yAxisId="left"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#94A3B8', fontSize: 11 }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#94A3B8', fontSize: 11 }}
          domain={[80, 100]}
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
        <Bar yAxisId="left" dataKey="present" fill="#10B981" radius={[4, 4, 0, 0]} barSize={20} opacity={0.8} />
        <Bar yAxisId="left" dataKey="absent" fill="#F43F5E" radius={[4, 4, 0, 0]} barSize={20} opacity={0.6} />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="percentage"
          stroke="#3B82F6"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
        />
      </ComposedChart>
    </ChartCard>
  );
}
