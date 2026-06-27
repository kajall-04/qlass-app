"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { TrendDataPoint } from "../types";

function ChartWidget({ title, data, linkText, color, delay }: { title: string; data: TrendDataPoint[]; linkText: string; color: string; delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col h-full min-h-[300px]"
    >
      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6">
        {title}
      </h3>
      
      <div className="flex-1 w-full h-[180px] -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`color-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94A3B8" }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94A3B8" }} domain={['dataMin - 10', 'auto']} dx={-5} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: 600 }}
              itemStyle={{ color: '#1e293b' }}
              formatter={(val: number) => [`${val}%`, 'Score']}
            />
            <Area type="monotone" dataKey="value" stroke={color} strokeWidth={3} fill={`url(#color-${title.replace(/\s+/g, '')})`} activeDot={{ r: 6, strokeWidth: 0, fill: color }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors flex items-center gap-1 group self-start mt-6">
        {linkText} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}

export function PerformanceCharts({ dppTrend, testTrend, isLoading }: { dppTrend?: TrendDataPoint[]; testTrend?: TrendDataPoint[]; isLoading: boolean }) {
  if (isLoading || !dppTrend || !testTrend) {
    return (
      <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm min-h-[300px] flex flex-col">
            <div className="h-5 w-1/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-8" />
            <div className="flex-1 bg-slate-100 dark:bg-slate-800/50 rounded-lg animate-pulse" />
            <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mt-6" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
      <ChartWidget 
        title="Avg DPP Score Trend" 
        data={dppTrend} 
        linkText="View DPP Performance" 
        color="#10B981" 
        delay={0.1} 
      />
      <ChartWidget 
        title="Avg Test Score Trend" 
        data={testTrend} 
        linkText="View Test Performance" 
        color="#F59E0B" 
        delay={0.2} 
      />
    </div>
  );
}
