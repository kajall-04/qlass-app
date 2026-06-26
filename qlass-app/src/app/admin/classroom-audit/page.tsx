"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Filter,
  CheckCircle2,
  Users,
  Video,
  BookOpen,
  MessageCircleQuestion,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Info
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { cn } from "@/lib/utils";
import { classroomAuditMockData } from "@/data/mock-classroom-audit";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { TopStats, TeacherPerformance, LectureAuditHighlight, TeacherIntervention } from "@/types/classroom-audit";

// --- Components ---

function StatCard({
  title,
  value,
  trend,
  icon: Icon,
  suffix = "",
}: {
  title: string;
  value: number;
  trend: number;
  icon: React.ElementType;
  suffix?: string;
}) {
  const isPositive = trend >= 0;
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
          <Icon className="w-5 h-5" />
        </div>
        <div
          className={cn(
            "flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full",
            isPositive
              ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
              : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
          )}
        >
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(trend)}% vs last week
        </div>
      </div>
      <div>
        <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
          {title}
        </p>
        <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
          {typeof value === 'number' && value > 1000 ? value.toLocaleString() : value}{suffix}
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ value, colorClass }: { value: number; colorClass: string }) {
  return (
    <div className="flex items-center gap-3 w-full max-w-[120px]">
      <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", colorClass)}
        />
      </div>
      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 w-8">{value}%</span>
    </div>
  );
}

function PerformanceTable({ data }: { data: TeacherPerformance[] }) {
  const getRiskBadge = (status: string) => {
    switch (status) {
      case "Low Risk":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
      case "Medium Risk":
        return "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800";
      case "High Risk":
        return "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <DashboardCard title="Teacher Performance Overview" action={<button className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:text-blue-700 transition-colors">View full report <ChevronRight className="w-3 h-3"/></button>}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400">Teacher</th>
              <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400">Classes</th>
              <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400">Avg Audit Score</th>
              <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400">Topic Coverage</th>
              <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400">DPP Assignment Rate</th>
              <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400">Student Avg Score</th>
              <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400">Recordings Uploaded</th>
              <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400">Risk Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">
                      {row.teacher.initials}
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{row.teacher.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-300">{row.classesCount}</td>
                <td className="py-3 px-4"><ProgressBar value={row.avgAuditScore} colorClass="bg-blue-500" /></td>
                <td className="py-3 px-4"><ProgressBar value={row.topicCoverage} colorClass="bg-amber-500" /></td>
                <td className="py-3 px-4"><ProgressBar value={row.dppAssignmentRate} colorClass="bg-emerald-500" /></td>
                <td className="py-3 px-4"><span className="text-sm font-bold text-slate-700 dark:text-slate-300">{row.studentAvgScore}%</span></td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-xs font-bold", (row.recordingsUploaded.uploaded/row.recordingsUploaded.total) < 0.7 ? "text-red-500" : "text-emerald-500")}>
                      {Math.round((row.recordingsUploaded.uploaded/row.recordingsUploaded.total)*100)}%
                    </span>
                    <span className="text-[11px] text-slate-400">({row.recordingsUploaded.uploaded}/{row.recordingsUploaded.total})</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={cn("px-2.5 py-1 rounded-md text-[10px] font-bold border", getRiskBadge(row.riskStatus))}>
                    {row.riskStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}

// --- Main Page Component ---

export default function ClassroomAuditPage() {
  const [selectedClass, setSelectedClass] = useState<string>("10-A");

  const classesList = [
    { id: "All", label: "All Classes" },
    { id: "10-A", label: "10 - A" },
    { id: "10-B", label: "10 - B" },
  ];

  const data = classroomAuditMockData[selectedClass];

  if (!data) return <div className="p-8 text-center text-slate-500">Data not found for selected class.</div>;

  return (
    <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Classroom Audit & Teacher Analytics</h1>
            <span className="px-2.5 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-md text-xs font-bold border border-red-200 dark:border-red-800/50">
              {data.className}
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Teaching quality, audit coverage and teacher effectiveness</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-xl pl-4 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
            >
              {classesList.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
            <Filter className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl transition-all shadow-sm">
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Avg Classroom Audit Score" value={data.stats.avgAuditScore.value} trend={data.stats.avgAuditScore.trend} icon={CheckCircle2} suffix="%" />
        <StatCard title="Lectures Audited" value={data.stats.lecturesAudited.value} trend={data.stats.lecturesAudited.trend} icon={Users} />
        <StatCard title="Recording Upload Compliance" value={data.stats.recordingCompliance.value} trend={data.stats.recordingCompliance.trend} icon={Video} suffix="%" />
        <StatCard title="Topic Coverage %" value={data.stats.topicCoverage.value} trend={data.stats.topicCoverage.trend} icon={BookOpen} suffix="%" />
        <StatCard title="Doubt Session Detection Rate" value={data.stats.doubtDetectionRate.value} trend={data.stats.doubtDetectionRate.trend} icon={MessageCircleQuestion} suffix="%" />
        <StatCard title="Teachers Requiring Support" value={data.stats.teachersRequiringSupport.value} trend={data.stats.teachersRequiringSupport.trend} icon={AlertTriangle} />
      </div>

      {/* Main Table */}
      <PerformanceTable data={data.performanceOverview} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Teacher-wise Audit Score (Bar Chart) */}
        <DashboardCard title="Teacher-wise Audit Score (%)" action={<button className="text-[10px] font-bold px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">By Class <ChevronRight className="w-3 h-3 inline-block"/></button>}>
          <div className="h-[250px] mt-4 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.auditScoreChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <RechartsTooltip cursor={{ fill: 'rgba(148, 163, 184, 0.05)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="score" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-right">
             <button className="text-[11px] font-semibold text-blue-600 hover:underline">View full report &rarr;</button>
          </div>
        </DashboardCard>

        {/* Recording Upload Compliance (Horizontal Bar) */}
        <DashboardCard title="Recording Upload Compliance (%)" action={<button className="text-[10px] font-bold px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">By Class <ChevronRight className="w-3 h-3 inline-block"/></button>}>
          <div className="h-[250px] mt-4 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.complianceChart} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} hide />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#64748B", fontWeight: 600 }} axisLine={false} tickLine={false} width={80} />
                <RechartsTooltip cursor={{ fill: 'rgba(148, 163, 184, 0.05)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="compliance" fill="#2563EB" radius={[0, 4, 4, 0]} maxBarSize={16}>
                  {/* Add labels at the end of the bar */}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-left">
             <button className="text-[11px] font-semibold text-blue-600 hover:underline">View compliance report &rarr;</button>
          </div>
        </DashboardCard>

        {/* Audit Status Distribution (Donut) */}
        <DashboardCard title="Audit Status Distribution">
          <div className="h-[250px] mt-4 w-full flex items-center justify-between">
            <div className="w-[160px] h-[160px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    stroke="none"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums">{data.stats.lecturesAudited.value}</span>
                <span className="text-[10px] font-bold text-slate-400">Total Lectures</span>
              </div>
            </div>
            {/* Custom Legend */}
            <div className="flex-1 pl-6 space-y-3">
              {data.statusDistribution.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">{item.name}</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-900 dark:text-white tabular-nums">
                    {item.value} <span className="text-slate-400 font-medium">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 text-right">
             <button className="text-[11px] font-semibold text-blue-600 hover:underline">View distribution report &rarr;</button>
          </div>
        </DashboardCard>

      </div>

      {/* Bottom Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Lecture Audit Highlights */}
        <DashboardCard title="Lecture Audit Highlights (Recent)">
           <div className="overflow-x-auto mt-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="py-2.5 px-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Date</th>
                  <th className="py-2.5 px-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Teacher</th>
                  <th className="py-2.5 px-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Chapter / Topic</th>
                  <th className="py-2.5 px-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Audit Score</th>
                  <th className="py-2.5 px-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Missing Topics</th>
                  <th className="py-2.5 px-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Feedback Summary</th>
                </tr>
              </thead>
              <tbody>
                {data.recentHighlights.map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="py-3 px-2 text-xs font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">{row.date}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                          {row.teacher.initials}
                        </div>
                        <span className="text-xs font-semibold text-slate-900 dark:text-white whitespace-nowrap">{row.teacher.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-xs font-medium text-slate-700 dark:text-slate-300">{row.chapterTopic}</td>
                    <td className="py-3 px-2">
                      <span className={cn("text-xs font-bold", row.auditScore >= 70 ? "text-emerald-500" : row.auditScore >= 50 ? "text-amber-500" : "text-red-500")}>
                        {row.auditScore}%
                      </span>
                    </td>
                    <td className="py-3 px-2 text-xs font-bold text-slate-700 dark:text-slate-300 text-center">{row.missingTopicsCount}</td>
                    <td className="py-3 px-2 text-[11px] text-slate-500 dark:text-slate-400 leading-tight max-w-[200px] truncate" title={row.feedbackSummary}>
                      {row.feedbackSummary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-left">
             <button className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1">View all lecture audits <ChevronRight className="w-3 h-3"/></button>
          </div>
        </DashboardCard>

        {/* Teachers Needing Intervention */}
        <DashboardCard title="Teachers Needing Intervention">
           <div className="overflow-x-auto mt-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="py-2.5 px-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Teacher</th>
                  <th className="py-2.5 px-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Risk Reasons</th>
                  <th className="py-2.5 px-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Last Audit Score</th>
                  <th className="py-2.5 px-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Trend</th>
                </tr>
              </thead>
              <tbody>
                {data.interventionNeeded.map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                          {row.teacher.initials}
                        </div>
                        <span className="text-xs font-semibold text-slate-900 dark:text-white whitespace-nowrap">{row.teacher.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-[11px] font-medium text-slate-600 dark:text-slate-400 max-w-[180px] leading-tight">
                      {row.riskReasons}
                    </td>
                    <td className="py-3 px-2">
                      <span className={cn("text-xs font-bold", row.lastAuditScore >= 70 ? "text-emerald-500" : row.lastAuditScore >= 50 ? "text-amber-500" : "text-red-500")}>
                        {row.lastAuditScore}%
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="w-16 h-6">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={row.trend.map((val, idx) => ({ name: idx, value: val }))}>
                            <Line type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={2} dot={false} isAnimationActive={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-left">
             <button className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1">View all teachers needing support <ChevronRight className="w-3 h-3"/></button>
          </div>
        </DashboardCard>

      </div>

    </div>
  );
}
