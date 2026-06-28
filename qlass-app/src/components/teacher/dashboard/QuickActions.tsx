"use client";

import Link from "next/link";
import { mockQuickActions } from "@/lib/dummyData";
import { CheckSquare, FileText, ClipboardList, Video, Megaphone, MessageSquare, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  CheckSquare,
  FileText,
  ClipboardList,
  Video,
  Megaphone,
  MessageSquare,
};

export function QuickActions() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-white tracking-tight">Quick Actions</h2>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Common tasks at your fingertips</p>
      </div>
      <div className="p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {mockQuickActions.map((action, i) => {
          const Icon = iconMap[action.iconName] || CheckSquare;
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={action.href}
                className="group flex flex-col items-center text-center p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all"
              >
                <div className={`w-9 h-9 rounded-lg ${action.color} flex items-center justify-center mb-2 transition-transform group-hover:scale-110`}>
                  <Icon size={16} />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-tight">{action.label}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 hidden sm:block">{action.description}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
