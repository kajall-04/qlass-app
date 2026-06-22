"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn, getPercentageColor } from "@/lib/utils";
import {
  BookOpen, CheckCircle2, Clock, FileText, ClipboardCheck,
  TrendingUp, Award, Flame, Target, Star, Trophy, Zap
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Legend
} from "recharts";

function StatCard({ icon: Icon, iconBg, value, label, subtitle }: {
  icon: React.ElementType; iconBg: string; value: string | number; label: string; subtitle?: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", iconBg)}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-lg font-bold text-slate-900 dark:text-white">{value}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
        </div>
      </div>
      {subtitle && <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-2 pl-[52px]">{subtitle}</div>}
    </motion.div>
  );
}

export default function StudentDashboard() {
  const data = useMemo(() => getSeedData(), []);
  const student = data.students[0]; // Aarav Sharma (logged in student)
  const myClass = data.getClassByName(student.class);
  const myTests = student.testScores.slice(0, 5);
  const subjects = Object.entries(student.marks);

  // Subject performance radar data
  const radarData = subjects.map(([sub, mark]) => ({
    subject: sub.length > 8 ? sub.slice(0, 8) + "." : sub,
    score: mark,
    classAvg: Math.round(mark * (0.7 + Math.random() * 0.4)),
  }));

  // Attendance trend
  const attendanceTrend = student.monthlyAttendance.map(m => ({
    name: m.month.slice(5),
    percentage: m.percentage,
  }));

  // Leaderboard (top 10)
  const leaderboard = data.students
    .filter(s => s.class === student.class)
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, 10);
  const myRankInClass = leaderboard.findIndex(s => s.id === student.id) + 1;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <h2 className="text-xl font-bold">Welcome back, {student.name.split(" ")[0]}! 🎓</h2>
          <p className="text-emerald-200 text-sm mt-1">Class {student.class} · Roll No: {student.rollNumber}</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5 bg-white/20 rounded-lg px-3 py-1.5">
              <Flame className="w-4 h-4 text-orange-300" />
              <span className="text-sm font-semibold">{student.studyStreak} day streak</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/20 rounded-lg px-3 py-1.5">
              <Trophy className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold">Rank #{myRankInClass || student.rank}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 stagger">
        <StatCard icon={CheckCircle2} iconBg="bg-emerald-600" value={`${student.attendance}%`} label="Attendance" />
        <StatCard icon={TrendingUp} iconBg="bg-blue-600" value={student.avgScore} label="Avg Score" />
        <StatCard icon={FileText} iconBg="bg-amber-600" value={student.pendingDPP} label="Pending DPP" />
        <StatCard icon={ClipboardCheck} iconBg="bg-violet-600" value={student.pendingAssignments} label="Pending Tasks" />
        <StatCard icon={Star} iconBg="bg-rose-600" value={student.achievements.length} label="Achievements" />
      </div>

      {/* Today's Classes */}
      {myClass && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
        >
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" /> Today&apos;s Classes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {myClass.timetable[0]?.periods.slice(0, 6).map((period, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="text-xs font-mono text-slate-400 w-20">{period.time.split(" - ")[0]}</div>
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">{period.subject}</div>
                  <div className="text-xs text-slate-400">{period.teacher} · {period.room}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Subject Performance Radar */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
        >
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Subject Performance</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#94A3B8" }} />
              <PolarRadiusAxis tick={{ fontSize: 9, fill: "#94A3B8" }} domain={[0, 100]} />
              <Radar name="Your Score" dataKey="score" stroke="#10B981" fill="#10B981" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Class Avg" dataKey="classAvg" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 4" />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Attendance Trend */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
        >
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={attendanceTrend}>
              <defs>
                <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94A3B8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} domain={[50, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
              <Area type="monotone" dataKey="percentage" stroke="#10B981" strokeWidth={2.5} fill="url(#colorAtt)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom: Leaderboard + Recent Tests + Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Leaderboard */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
        >
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" /> Class Leaderboard
          </h3>
          {leaderboard.map((s, i) => (
            <div key={s.id} className={cn("flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800 last:border-0",
              s.id === student.id && "bg-emerald-50 dark:bg-emerald-900/10 -mx-2 px-2 rounded-lg"
            )}>
              <div className="flex items-center gap-2.5">
                <span className={cn("w-6 text-center text-xs font-bold",
                  i === 0 ? "text-amber-500" : i === 1 ? "text-slate-400" : i === 2 ? "text-amber-700" : "text-slate-400"
                )}>{i < 3 ? ["🥇","🥈","🥉"][i] : `#${i + 1}`}</span>
                <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold", s.avatarColor)}>{s.initials}</div>
                <span className={cn("text-sm", s.id === student.id ? "font-bold text-emerald-700 dark:text-emerald-400" : "text-slate-700 dark:text-slate-300")}>{s.name}</span>
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">{s.avgScore}</span>
            </div>
          ))}
        </motion.div>

        {/* Recent Tests */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
        >
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Recent Test Scores</h3>
          {myTests.map(t => (
            <div key={t.id} className="flex items-center justify-between py-2.5 border-b border-slate-50 dark:border-slate-800 last:border-0">
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-white">{t.name}</div>
                <div className="text-xs text-slate-400">{t.subject} · {t.date}</div>
              </div>
              <div className="text-right">
                <div className={cn("text-sm font-bold", getPercentageColor(t.percentage))}>{t.obtainedMarks}/{t.maxMarks}</div>
                <div className="text-xs text-slate-400">{t.percentage}%</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Achievements */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
        >
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-violet-500" /> Achievements
          </h3>
          {student.achievements.length > 0 ? (
            student.achievements.map(a => (
              <div key={a.id} className="flex items-center gap-3 py-2.5 border-b border-slate-50 dark:border-slate-800 last:border-0">
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">{a.title}</div>
                  <div className="text-xs text-slate-400">{a.description}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Zap className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500 dark:text-slate-400">Keep working hard to earn achievements!</p>
            </div>
          )}

          {/* Weak Topics */}
          {student.weakTopics.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Focus Areas</h4>
              <div className="flex flex-wrap gap-1.5">
                {student.weakTopics.map(t => (
                  <span key={t} className="text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-md font-medium">{t}</span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
