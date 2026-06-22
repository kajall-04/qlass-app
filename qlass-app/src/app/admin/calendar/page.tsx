"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const events = [
  { date: 2, title: "Mathematics Quiz", color: "bg-blue-500", type: "test" },
  { date: 5, title: "PTM Meeting", color: "bg-violet-500", type: "meeting" },
  { date: 8, title: "Science Fair Prep", color: "bg-emerald-500", type: "event" },
  { date: 12, title: "Sports Day", color: "bg-amber-500", type: "event" },
  { date: 15, title: "Mid-Term Start", color: "bg-red-500", type: "exam" },
  { date: 18, title: "Mid-Term End", color: "bg-red-500", type: "exam" },
  { date: 20, title: "Results Day", color: "bg-emerald-500", type: "event" },
  { date: 25, title: "Annual Day", color: "bg-violet-500", type: "event" },
  { date: 28, title: "Parent Counseling", color: "bg-blue-500", type: "meeting" },
  { date: 30, title: "Month End Report", color: "bg-slate-500", type: "deadline" },
];

export default function AdminCalendarPage() {
  const [currentMonth] = useState(new Date(2026, 5)); // June 2026
  const daysInMonth = new Date(2026, 6, 0).getDate();
  const firstDay = (new Date(2026, 5, 1).getDay() + 6) % 7; // Mon=0

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const today = 21; // June 21

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">June 2026</h3>
          <div className="flex gap-1">
            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"><ChevronLeft className="w-4 h-4" /></button>
            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map(d => <div key={d} className="text-xs font-semibold text-slate-400 text-center py-2">{d}</div>)}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            const dayEvents = day ? events.filter(e => e.date === day) : [];
            return (
              <div key={i} className={cn(
                "min-h-[80px] p-1.5 rounded-xl transition-colors",
                day ? "hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" : "",
                day === today ? "bg-blue-50 dark:bg-blue-900/10 ring-2 ring-blue-500/20" : ""
              )}>
                {day && (
                  <>
                    <span className={cn("text-xs font-medium", day === today ? "text-blue-600 font-bold" : "text-slate-600 dark:text-slate-400")}>{day}</span>
                    <div className="mt-1 space-y-0.5">
                      {dayEvents.map((e, ei) => (
                        <div key={ei} className={cn("text-[9px] font-medium px-1.5 py-0.5 rounded text-white truncate", e.color)}>{e.title}</div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Upcoming Events</h3>
        {events.filter(e => e.date >= today).map((e, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5 border-b border-slate-50 dark:border-slate-800 last:border-0">
            <div className={cn("w-2 h-8 rounded-full", e.color)} />
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-900 dark:text-white">{e.title}</div>
              <div className="text-xs text-slate-400">June {e.date}, 2026</div>
            </div>
            <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-md capitalize">{e.type}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
