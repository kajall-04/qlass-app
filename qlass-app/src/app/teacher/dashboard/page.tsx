"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn, getPercentageColor } from "@/lib/utils";
import {
  BookOpen, Users, CheckCircle2, Clock, FileText, ClipboardCheck,
  AlertTriangle, TrendingUp, Video
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line, Legend
} from "recharts";

function KPICard({ icon: Icon, iconBg, value, label, subtitle }: {
  icon: React.ElementType; iconBg: string; value: string | number; label: string; subtitle?: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md transition-shadow"
    >
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", iconBg)}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</div>
      {subtitle && <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">{subtitle}</div>}
    </motion.div>
  );
}

export default function TeacherDashboard() {
  const data = useMemo(() => getSeedData(), []);
  const teacher = data.teachers[0]; // Dr. Priya Sharma (logged in teacher)
  const myStudents = data.students.filter(s => teacher.classes.includes(s.class));
  const myAtRisk = myStudents.filter(s => s.riskLevel === "High" || s.riskLevel === "Critical");
  const myLectures = data.getLecturesByTeacher(teacher.id);
  const myDPP = data.getDPPByTeacher(teacher.id);
  const myTests = data.getTestsByTeacher(teacher.id);
  const upcomingLectures = myLectures.filter(l => l.status === "Upcoming").slice(0, 5);
  const pendingDPP = myDPP.filter(d => d.status === "Pending" || d.submissionRate < 80).slice(0, 5);
  const avgAttendance = Math.round(myStudents.reduce((a, s) => a + s.attendance, 0) / (myStudents.length || 1));

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold">Good Morning, {teacher.name.replace(/Dr\.\s|Prof\.\s/, "")} 👋</h2>
        <p className="text-violet-200 text-sm mt-1">You have {teacher.todayClasses.filter(c => c.status === "Upcoming").length} classes remaining today</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        <KPICard icon={BookOpen} iconBg="bg-violet-600" value={teacher.classes.length} label="My Classes" subtitle={`${teacher.subjects.join(", ")}`} />
        <KPICard icon={Users} iconBg="bg-blue-600" value={myStudents.length} label="Total Students" />
        <KPICard icon={CheckCircle2} iconBg="bg-emerald-600" value={`${avgAttendance}%`} label="Avg Attendance" />
        <KPICard icon={AlertTriangle} iconBg="bg-amber-600" value={myAtRisk.length} label="At-Risk Students" />
      </div>

      {/* Today's Schedule */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
      >
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-violet-600" /> Today&apos;s Schedule
        </h3>
        <div className="space-y-2">
          {teacher.todayClasses.map((cls) => (
            <div key={cls.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className={cn("w-2 h-full min-h-[40px] rounded-full", cls.status === "Completed" ? "bg-emerald-500" : cls.status === "Ongoing" ? "bg-blue-500 animate-pulse" : "bg-slate-300 dark:bg-slate-600")} />
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">{cls.subject} — {cls.class}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{cls.time} · {cls.room}</div>
                </div>
              </div>
              <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full",
                cls.status === "Completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                cls.status === "Ongoing" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
              )}>{cls.status}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
        >
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Performance Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={teacher.monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} domain={[40, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="auditScore" name="Audit" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="studentPerformance" name="Student Perf" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="lectureCompletion" name="Lectures" stroke="#22C55E" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
        >
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">DPP Submission Rate</h3>
          <ResponsiveContainer width="100%" height={220}>
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

      {/* At-Risk + Pending DPP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
        >
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">At-Risk Students</h3>
          {myAtRisk.slice(0, 5).map(s => (
            <div key={s.id} className="flex items-center justify-between py-2.5 border-b border-slate-50 dark:border-slate-800 last:border-0">
              <div className="flex items-center gap-2.5">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold", s.avatarColor)}>{s.initials}</div>
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">{s.name}</div>
                  <div className="text-xs text-slate-400">Class {s.class} · Att: {s.attendance}%</div>
                </div>
              </div>
              <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full",
                s.riskLevel === "Critical" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
              )}>{s.riskLevel}</span>
            </div>
          ))}
          {myAtRisk.length === 0 && <p className="text-sm text-slate-500 dark:text-slate-400 py-4 text-center">No at-risk students 🎉</p>}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
        >
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Pending DPP Reviews</h3>
          {pendingDPP.map(d => (
            <div key={d.id} className="flex items-center justify-between py-2.5 border-b border-slate-50 dark:border-slate-800 last:border-0">
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-white">{d.name}</div>
                <div className="text-xs text-slate-400">Class {d.class} · Due: {d.dueDate}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">{d.submitted}/{d.totalStudents}</div>
                <div className="text-xs text-slate-400">submitted</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
