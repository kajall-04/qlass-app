"use client";
import { useMemo } from "react";
import { getSeedData } from "@/data/seed";
import { CheckCircle2, XCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function StudentAttendancePage() {
  const data = useMemo(() => getSeedData(), []);
  const student = data.students[0];
  const attendanceData = student.monthlyAttendance.map(m => ({ name: m.month.slice(5), percentage: m.percentage }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div><div className="text-sm font-semibold text-slate-500">Overall Attendance</div><div className="text-3xl font-bold text-emerald-600 mt-1">{student.attendance}%</div></div>
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center"><CheckCircle2 className="w-8 h-8 text-emerald-600" /></div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div><div className="text-sm font-semibold text-slate-500">Classes Missed</div><div className="text-3xl font-bold text-red-600 mt-1">{Math.floor((100 - student.attendance) / 5)}</div></div>
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center"><XCircle className="w-8 h-8 text-red-600" /></div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Attendance Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={attendanceData}>
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
      </div>
    </div>
  );
}
