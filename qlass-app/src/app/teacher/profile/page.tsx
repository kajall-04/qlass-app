"use client";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import { getRoleLabel } from "@/services/auth.service";
import { Mail, Phone, MapPin, Calendar, BookOpen, Award, Star, Users } from "lucide-react";
import { useMemo } from "react";
import { getSeedData } from "@/data/seed";

export default function TeacherProfilePage() {
  const user = useAuthStore(s => s.user);
  const data = useMemo(() => getSeedData(), []);
  const teacher = data.teachers[0];

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-violet-600 to-indigo-600" />
        <div className="px-6 pb-6 -mt-10">
          <div className="w-20 h-20 rounded-2xl bg-violet-600 border-4 border-white dark:border-slate-900 flex items-center justify-center text-white text-2xl font-bold shadow-lg">{teacher.initials}</div>
          <div className="mt-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{teacher.name}</h2>
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-600 bg-violet-50 dark:bg-violet-900/30 px-2.5 py-1 rounded-full mt-1 inline-block">Teacher</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Star, label: "Audit Score", value: teacher.auditScore, color: "text-violet-600" },
          { icon: BookOpen, label: "Lecture %", value: `${teacher.lectureCompletion}%`, color: "text-blue-600" },
          { icon: Users, label: "Students", value: teacher.totalStudents, color: "text-emerald-600" },
          { icon: Award, label: "Satisfaction", value: `${teacher.studentSatisfaction}%`, color: "text-amber-600" },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-center">
            <s.icon className={`w-6 h-6 mx-auto mb-2 ${s.color}`} />
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Information</h3>
        <div className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: teacher.email },
            { icon: Phone, label: "Phone", value: teacher.phone },
            { icon: BookOpen, label: "Subjects", value: teacher.subjects.join(", ") },
            { icon: Users, label: "Classes", value: teacher.classes.map(c => `Class ${c}`).join(", ") },
            { icon: Award, label: "Qualification", value: teacher.qualification },
            { icon: Calendar, label: "Experience", value: teacher.experience },
            { icon: Calendar, label: "Joined", value: teacher.joinDate },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center"><item.icon className="w-4 h-4 text-slate-500" /></div>
              <div><div className="text-xs text-slate-500">{item.label}</div><div className="text-sm font-medium text-slate-900 dark:text-white">{item.value}</div></div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
