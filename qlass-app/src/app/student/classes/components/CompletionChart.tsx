"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CourseSubject } from "../types";

interface CompletionChartProps {
  subjects: CourseSubject[];
  isLoading: boolean;
}

export function CompletionChart({ subjects, isLoading }: CompletionChartProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-[320px] flex flex-col shadow-sm">
        <div className="w-48 h-6 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-6" />
        <div className="flex-1 flex items-end justify-around gap-4 px-4 pb-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-12 bg-slate-100 dark:bg-slate-800 rounded-t-md animate-pulse" style={{ height: `${Math.random() * 60 + 20}%` }} />
          ))}
        </div>
      </div>
    );
  }

  const chartData = subjects.map(s => ({
    name: s.subjectName.length > 10 ? s.subjectName.substring(0, 10) + '...' : s.subjectName,
    fullName: s.subjectName,
    completion: s.progressPercent
  }));

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-[320px] flex flex-col shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Subject-wise Completion</h3>
      <div className="flex-1 min-h-0 relative">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#64748b' }} 
                dy={10} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#64748b' }} 
              />
              <Tooltip 
                cursor={{ fill: 'rgba(226, 232, 240, 0.4)' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#fff', color: '#0f172a' }}
                labelStyle={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}
                formatter={(value: number) => [`${value}%`, 'Completion']}
                labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName || label}
              />
              <Bar 
                dataKey="completion" 
                fill="#3b82f6" // blue-500
                radius={[4, 4, 0, 0]} 
                maxBarSize={48}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
            No data available for current filters
          </div>
        )}
      </div>
    </div>
  );
}
