"use client";

import { motion } from "framer-motion";
import { BookOpen, MonitorPlay, FileText, Activity, AlertCircle, TrendingUp } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const quickLinks = [
  { title: "My Classes", icon: BookOpen, href: "/student/classes", color: "text-blue-600 dark:text-blue-400" },
  { title: "Lectures & Recordings", icon: MonitorPlay, href: "/student/lectures", color: "text-indigo-600 dark:text-indigo-400" },
  { title: "DPP", icon: FileText, href: "/student/dpp", color: "text-purple-600 dark:text-purple-400" },
  { title: "Tests & Exams", icon: Activity, href: "/student/tests", color: "text-emerald-600 dark:text-emerald-400" },
  { title: "Weak Topics", icon: AlertCircle, href: "/student/performance", color: "text-amber-600 dark:text-amber-400" },
  { title: "Performance", icon: TrendingUp, href: "/student/performance", color: "text-rose-600 dark:text-rose-400" },
];

export function QuickLinks() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm col-span-1 lg:col-span-2">
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-5">
        Quick Links
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {quickLinks.map((link, i) => {
          const Icon = link.icon;
          return (
            <Link key={link.title} href={link.href}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-md transition-all duration-300 group cursor-pointer h-full"
              >
                <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Icon className={cn("w-5 h-5", link.color)} />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 text-center leading-tight">
                  {link.title}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
