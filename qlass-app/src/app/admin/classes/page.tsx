"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import {
  Users,
  BookOpen,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Filter,
  MoreVertical,
  MessageSquare,
  FileEdit,
  BarChart3,
  Sparkles,
  AlertCircle
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { useToastStore } from "@/store/toast-store";
import { DashboardCard } from "@/components/dashboard/dashboard-card";

type TimePeriod = "Daily" | "Weekly" | "Monthly" | "Yearly";

// Generate an AI insight based on the class's data
function getAiInsight(cls: any, period: TimePeriod, subjectFilter: string) {
  const isAllSubjects = subjectFilter === "All Subjects";
  const attendance = cls.attendance;
  const performance = cls.performance;
  
  if (attendance < 75) {
    return { text: `Attendance dropped significantly this ${period.toLowerCase()}. Intervention needed.`, type: "warning" };
  }
  if (performance < 70) {
    if (!isAllSubjects) {
      return { text: `Students are struggling with ${subjectFilter} concepts. Review recommended.`, type: "warning" };
    }
    return { text: `Overall performance is below average. Consider remedial sessions.`, type: "warning" };
  }
  if (performance > 88 && attendance > 90) {
    return { text: `Excellent engagement! Top performing class this ${period.toLowerCase()}.`, type: "success" };
  }
  if (!isAllSubjects) {
    return { text: `${subjectFilter} syllabus is on track. Normal progression.`, type: "neutral" };
  }
  return { text: `Steady progress. No critical issues detected this ${period.toLowerCase()}.`, type: "neutral" };
}

export default function AdminClassesPage() {
  const seedData = useMemo(() => getSeedData(), []);
  const { addToast } = useToastStore();
  
  const [period, setPeriod] = useState<TimePeriod>("Monthly");
  const [subject, setSubject] = useState<string>("All Subjects");
  const [classFilter, setClassFilter] = useState<string>("All Classes");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const periods: TimePeriod[] = ["Daily", "Weekly", "Monthly", "Yearly"];
  const allSubjects = ["All Subjects", "Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"];
  const allClasses = ["All Classes", "8A", "8B", "9A", "9B", "10A", "10B"];

  // Helper to simulate data changing based on time period
  const getMultiplier = (p: TimePeriod) => {
    switch (p) {
      case "Daily": return 0.85;
      case "Weekly": return 0.92;
      case "Monthly": return 1;
      case "Yearly": return 0.98;
    }
  };

  const multiplier = getMultiplier(period);

  const processedClasses = useMemo(() => {
    let filteredData = seedData.classes;
    if (classFilter !== "All Classes") {
      filteredData = filteredData.filter(cls => cls.fullName === classFilter);
    }

    return filteredData.map(cls => {
      // Filter subjects
      let displaySubjects = cls.subjects;
      if (subject !== "All Subjects") {
        const found = displaySubjects.find(s => s.name === subject);
        if (found) {
          displaySubjects = [found];
        } else {
          // If the class doesn't explicitly have it in the mock, fake it for the demo
          displaySubjects = [{ name: subject, teacher: cls.classTeacher, progress: Math.max(30, cls.syllabusProgress - 15), avgScore: Math.max(40, cls.performance - 10) }];
        }
      } else {
        displaySubjects = displaySubjects.slice(0, 4);
      }

      // Calculate aggregated performance based on the selected subjects
      const avgSubjectScore = displaySubjects.reduce((acc, curr) => acc + curr.avgScore, 0) / displaySubjects.length;
      const basePerformance = subject === "All Subjects" ? cls.performance : avgSubjectScore;

      return {
        ...cls,
        displaySubjects,
        adjustedAttendance: Math.min(100, Math.round(cls.attendance * multiplier)),
        adjustedPerformance: Math.min(100, Math.round(basePerformance * multiplier)),
        adjustedSyllabus: Math.min(100, Math.round(cls.syllabusProgress * (period === "Daily" ? 0.9 : 1))),
        insight: getAiInsight(cls, period, subject)
      };
    });
  }, [seedData, period, subject, multiplier]);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm relative z-20">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Active Classes</h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Manage and monitor class performance</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
          {/* Class Filter */}
          <div className="relative w-full sm:w-auto">
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl pl-10 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
            >
              {allClasses.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <Users className="w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <Filter className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Subject Filter */}
          <div className="relative w-full sm:w-auto">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl pl-10 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
            >
              {allSubjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <BookOpen className="w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <Filter className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Time Filter */}
          <div className="relative w-full sm:w-auto">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as TimePeriod)}
              className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl pl-10 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
            >
              {periods.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <Calendar className="w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <Filter className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {classFilter !== "All Classes" && processedClasses.length === 1 ? (
        <div className="space-y-6">
          {/* Detailed Class View */}
          {(() => {
            const cls = processedClasses[0];
            return (
              <>
                {/* AI Health Insight */}
                <div className={cn(
                  "p-4 rounded-xl border flex items-start gap-3 transition-colors",
                  cls.insight.type === "warning" ? "bg-red-50 border-red-100 text-red-800 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-300" :
                  cls.insight.type === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-900/30 dark:text-emerald-300" :
                  "bg-blue-50/50 border-blue-100/50 text-blue-800 dark:bg-blue-900/20 dark:border-blue-900/30 dark:text-blue-300"
                )}>
                  {cls.insight.type === "warning" ? <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" /> : <Sparkles className="w-5 h-5 mt-0.5 shrink-0" />}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">Qlass AI Analysis</h4>
                    <p className="text-sm font-medium leading-relaxed">{cls.insight.text}</p>
                  </div>
                </div>

                {/* Big Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-2"><Users className="w-5 h-5 text-blue-500" /><span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Students</span></div>
                    <div className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{cls.totalStudents}</div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance</span></div>
                    <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">{cls.adjustedAttendance}%</div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-2"><BookOpen className="w-5 h-5 text-violet-500" /><span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Syllabus Progress</span></div>
                    <div className="text-3xl font-black text-violet-600 dark:text-violet-400 tabular-nums">{cls.adjustedSyllabus}%</div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-5 h-5 text-amber-500" /><span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Performance</span></div>
                    <div className="text-3xl font-black text-amber-600 dark:text-amber-400 tabular-nums">{cls.adjustedPerformance}</div>
                  </div>
                </div>

                {/* Detailed Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Subject Performance Bar Chart */}
                  <DashboardCard title="Subject Performance">
                    <div className="h-[280px] w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={cls.displaySubjects} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                          <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748B", fontWeight: 600 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                          <RechartsTooltip cursor={{ fill: 'rgba(148, 163, 184, 0.05)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                          <Bar dataKey="avgScore" name="Avg Score" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={40} animationDuration={1000} />
                          <Bar dataKey="progress" name="Syllabus" fill="#8B5CF6" radius={[4, 4, 0, 0]} maxBarSize={40} animationDuration={1000} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </DashboardCard>

                  {/* Upcoming Assessments */}
                  <DashboardCard title="Upcoming Assessments">
                    <div className="overflow-x-auto mt-2">
                      {cls.upcomingTests.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800">
                              <th className="py-2.5 px-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Subject</th>
                              <th className="py-2.5 px-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Type</th>
                              <th className="py-2.5 px-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Date</th>
                              <th className="py-2.5 px-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Max Marks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cls.upcomingTests.map((t, ti) => (
                              <tr key={ti} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                                <td className="py-3 px-2 text-xs font-bold text-slate-900 dark:text-white">{t.subject}</td>
                                <td className="py-3 px-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                                  <span className="px-2 py-1 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-md">{t.type}</span>
                                </td>
                                <td className="py-3 px-2 text-xs font-semibold text-slate-600 dark:text-slate-400">{t.date}</td>
                                <td className="py-3 px-2 text-xs font-bold text-slate-500 dark:text-slate-500">{t.maxMarks}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="py-8 text-center text-slate-500 text-sm">No upcoming assessments scheduled.</div>
                      )}
                    </div>
                  </DashboardCard>
                </div>
              </>
            );
          })()}
        </div>
      ) : (
        <>
          {/* Class Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedClasses.map((cls, i) => (
              <motion.div 
                key={cls.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:shadow-xl hover:shadow-blue-900/5 dark:hover:shadow-blue-900/20 transition-all duration-300 relative group"
              >
                {/* Quick Actions Dropdown */}
                <div className="absolute top-5 right-5 z-10">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === cls.id ? null : cls.id)}
                    className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === cls.id && (
                      <>
                        <div className="fixed inset-0 z-0" onClick={() => setActiveDropdown(null)} />
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-10 overflow-hidden"
                        >
                          <button 
                            onClick={() => {
                              setActiveDropdown(null);
                              addToast({ type: "success", title: "Chat Opened", message: `Started conversation with ${cls.classTeacher}` });
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                          >
                            <MessageSquare className="w-4 h-4 text-blue-500" /> Message Teacher
                          </button>
                          <button 
                            onClick={() => {
                              setActiveDropdown(null);
                              addToast({ type: "info", title: "Test Scheduler", message: `Opening test scheduler for ${cls.fullName}` });
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                          >
                            <FileEdit className="w-4 h-4 text-violet-500" /> Schedule Test
                          </button>
                          <button 
                            onClick={() => {
                              setActiveDropdown(null);
                              addToast({ type: "success", title: "Analytics Generated", message: `Generating full report for ${cls.fullName}...` });
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                          >
                            <BarChart3 className="w-4 h-4 text-emerald-500" /> View Analytics
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Header */}
                <div className="flex items-center gap-4 mb-6 pr-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                    <span className="text-xl font-black text-white">{cls.fullName}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{cls.name} — Section {cls.section}</h3>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">{cls.classTeacher}</p>
                  </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/80 dark:to-slate-800/40 rounded-2xl p-3.5 border border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Students</span>
                    </div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">{cls.totalStudents}</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-900/10 rounded-2xl p-3.5 border border-emerald-100 dark:border-emerald-800/30">
                    <div className="flex items-center gap-2 mb-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[10px] font-bold text-emerald-600/70 dark:text-emerald-400/70 uppercase tracking-wider">Attendance</span>
                    </div>
                    <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 tabular-nums">{cls.adjustedAttendance}%</div>
                  </div>
                  <div className="bg-gradient-to-br from-violet-50 to-violet-100/50 dark:from-violet-900/20 dark:to-violet-900/10 rounded-2xl p-3.5 border border-violet-100 dark:border-violet-800/30">
                    <div className="flex items-center gap-2 mb-1.5">
                      <BookOpen className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                      <span className="text-[10px] font-bold text-violet-600/70 dark:text-violet-400/70 uppercase tracking-wider">Syllabus</span>
                    </div>
                    <div className="text-2xl font-black text-violet-700 dark:text-violet-400 tabular-nums">{cls.adjustedSyllabus}%</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-900/10 rounded-2xl p-3.5 border border-amber-100 dark:border-amber-800/30">
                    <div className="flex items-center gap-2 mb-1.5">
                      <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span className="text-[10px] font-bold text-amber-600/70 dark:text-amber-400/70 uppercase tracking-wider">Performance</span>
                    </div>
                    <div className="text-2xl font-black text-amber-700 dark:text-amber-400 tabular-nums">{cls.adjustedPerformance}</div>
                  </div>
                </div>

                {/* AI Health Insight */}
                <div className={cn(
                  "mb-6 p-3 rounded-xl border flex items-start gap-2.5 transition-colors",
                  cls.insight.type === "warning" ? "bg-red-50 border-red-100 text-red-800 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-300" :
                  cls.insight.type === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-900/30 dark:text-emerald-300" :
                  "bg-blue-50/50 border-blue-100/50 text-blue-800 dark:bg-blue-900/20 dark:border-blue-900/30 dark:text-blue-300"
                )}>
                  {cls.insight.type === "warning" ? <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> : <Sparkles className="w-4 h-4 mt-0.5 shrink-0" />}
                  <p className="text-[11px] font-semibold leading-relaxed">
                    <span className="font-bold opacity-80 uppercase tracking-wider text-[9px] block mb-0.5">Qlass AI Insight</span>
                    {cls.insight.text}
                  </p>
                </div>

                {/* Subject Progress */}
                <div className="space-y-3 mb-6">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subject Progress</div>
                  {cls.displaySubjects.map(s => (
                    <div key={s.name} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{s.name}</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{s.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${s.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" 
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upcoming Tests */}
                {cls.upcomingTests.length > 0 && (
                  <div className="pt-5 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Upcoming Assessments</div>
                    <div className="space-y-2">
                      {cls.upcomingTests.slice(0, 2).map((t, ti) => (
                        <div key={ti} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <div className="flex items-center gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.subject} <span className="font-medium text-slate-400">— {t.type}</span></span>
                          </div>
                          <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-md">{t.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Dynamic Comparison Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 mt-8 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Performance Comparison</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                  Comparing {subject} across classes for the selected {period.toLowerCase()} period
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Attendance</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Performance</span>
                </div>
              </div>
            </div>
            
            <div className="w-full h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={processedClasses.map(c => ({ 
                    name: c.fullName, 
                    Attendance: c.adjustedAttendance, 
                    Performance: c.adjustedPerformance 
                  }))}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  barGap={8}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748B", fontWeight: 700 }} axisLine={false} tickLine={false} tickMargin={12} />
                  <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(148, 163, 184, 0.05)' }} 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', padding: '12px 16px' }} 
                    itemStyle={{ fontSize: '13px', fontWeight: 700 }}
                    labelStyle={{ fontSize: '11px', color: '#64748B', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}
                  />
                  <Bar dataKey="Attendance" fill="#10B981" radius={[6, 6, 0, 0]} maxBarSize={32} animationDuration={1000}>
                    {processedClasses.map((_, index) => (
                      <Cell key={`cell-att-${index}`} fillOpacity={0.9} />
                    ))}
                  </Bar>
                  <Bar dataKey="Performance" fill="#8B5CF6" radius={[6, 6, 0, 0]} maxBarSize={32} animationDuration={1000}>
                    {processedClasses.map((_, index) => (
                      <Cell key={`cell-perf-${index}`} fillOpacity={0.9} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
