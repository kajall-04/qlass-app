"use client";

import { useMemo } from "react";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { Mail, Phone, BookOpen, Award, Users, BarChart3, GraduationCap, Briefcase, Calendar, MapPin } from "lucide-react";
import { PageHeader } from "@/components/teacher/shared/PageHeader";
import { StatCard } from "@/components/teacher/shared/StatCard";
import { ProgressRing } from "@/components/teacher/shared/ProgressRing";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const performanceData = [
  { month: "Jan", score: 78, satisfaction: 80 },
  { month: "Feb", score: 82, satisfaction: 82 },
  { month: "Mar", score: 80, satisfaction: 79 },
  { month: "Apr", score: 85, satisfaction: 84 },
  { month: "May", score: 88, satisfaction: 87 },
  { month: "Jun", score: 90, satisfaction: 89 },
];

export default function TeacherProfilePage() {
  const data = useMemo(() => getSeedData(), []);
  const teacher = data.teachers[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      <PageHeader title="My Profile" subtitle="View and manage your profile information" />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#081C45] via-blue-900 to-indigo-900 rounded-2xl overflow-hidden mb-6 shadow-lg">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23fff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        <div className="relative px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-xl ring-4 ring-white/20">
            {teacher.initials}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-white">{teacher.name}</h2>
            <p className="text-sm text-blue-200 mt-0.5">{teacher.qualification} · {teacher.experience}</p>
            <div className="flex items-center gap-3 mt-3 flex-wrap justify-center sm:justify-start">
              {teacher.subjects.map(s => (
                <span key={s} className="text-[10px] font-semibold text-blue-100 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Audit Score" value={teacher.auditScore} icon={<Award size={20} />} iconBg="bg-violet-50 dark:bg-violet-900/20" iconColor="text-violet-600 dark:text-violet-400" trend="up" trendValue="+5" delay={0} />
        <StatCard title="Lecture Completion" value={`${teacher.lectureCompletion}%`} icon={<BarChart3 size={20} />} iconBg="bg-blue-50 dark:bg-blue-900/20" iconColor="text-blue-600 dark:text-blue-400" trend="up" trendValue="+3%" delay={1} />
        <StatCard title="Total Students" value={teacher.totalStudents} icon={<Users size={20} />} iconBg="bg-emerald-50 dark:bg-emerald-900/20" iconColor="text-emerald-600 dark:text-emerald-400" delay={2} />
        <StatCard title="Satisfaction" value={`${teacher.studentSatisfaction}%`} icon={<GraduationCap size={20} />} iconBg="bg-amber-50 dark:bg-amber-900/20" iconColor="text-amber-600 dark:text-amber-400" trend="up" trendValue="+2%" delay={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Info Card */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-5">Personal Information</h3>
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: teacher.email },
                { icon: Phone, label: "Phone", value: teacher.phone },
                { icon: Briefcase, label: "Status", value: teacher.status },
                { icon: Calendar, label: "Joined", value: teacher.joinDate },
                { icon: GraduationCap, label: "Qualification", value: teacher.qualification },
                { icon: BookOpen, label: "Classes", value: teacher.classes.join(", ") },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                    <item.icon size={15} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">{item.label}</div>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Performance Rings */}
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-4 uppercase tracking-wider">Performance Metrics</h4>
              <div className="flex items-center justify-around">
                <ProgressRing value={teacher.auditScore} size={72} color="#8B5CF6" label="Audit" />
                <ProgressRing value={teacher.lectureCompletion} size={72} color="#3B82F6" label="Lectures" />
                <ProgressRing value={teacher.topicCoverage} size={72} color="#10B981" label="Coverage" />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-5">Monthly Performance Trend</h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="profileScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="profileSat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} domain={[70, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2.5} fill="url(#profileScore)" dot={{ r: 3, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }} />
                  <Area type="monotone" dataKey="satisfaction" stroke="#10B981" strokeWidth={2} fill="url(#profileSat)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /><span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Performance</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Satisfaction</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
