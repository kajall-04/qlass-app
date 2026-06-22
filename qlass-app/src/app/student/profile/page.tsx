"use client";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import { getRoleLabel } from "@/services/auth.service";
import { Mail, Phone, MapPin, Calendar, BookOpen, Hash } from "lucide-react";
import { useMemo } from "react";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";

export default function StudentProfilePage() {
  const user = useAuthStore(s => s.user);
  const data = useMemo(() => getSeedData(), []);
  const student = data.students[0];

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-emerald-600 to-teal-600" />
        <div className="px-6 pb-6 -mt-10">
          <div className={cn("w-20 h-20 rounded-2xl border-4 border-white dark:border-slate-900 flex items-center justify-center text-white text-2xl font-bold shadow-lg", student.avatarColor)}>
            {student.initials}
          </div>
          <div className="mt-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{student.name}</h2>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full mt-1 inline-block">Student</span>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Information</h3>
        <div className="space-y-4">
          {[
            { icon: BookOpen, label: "Class", value: student.class },
            { icon: Hash, label: "Roll Number", value: student.rollNumber },
            { icon: Hash, label: "Student ID", value: student.id },
            { icon: Mail, label: "Email", value: student.email },
            { icon: Phone, label: "Phone", value: student.phone },
            { icon: MapPin, label: "Parent", value: student.parentName },
            { icon: Calendar, label: "Joined", value: student.joinDate },
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
