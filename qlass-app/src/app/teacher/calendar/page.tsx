"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const events = [
  { date: 2, title: "9A Physics", color: "bg-violet-500" },
  { date: 5, title: "PTM", color: "bg-blue-500" },
  { date: 10, title: "10B Test", color: "bg-red-500" },
  { date: 15, title: "Mid-Term", color: "bg-red-500" },
  { date: 18, title: "Mid-Term End", color: "bg-red-500" },
  { date: 25, title: "Annual Day", color: "bg-emerald-500" },
  { date: 28, title: "9B Review", color: "bg-amber-500" },
];

export default function TeacherCalendarPage() {
  const daysInMonth = 30;
  const firstDay = 0;
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const today = 21;

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
              <div key={i} className={cn("min-h-[80px] p-1.5 rounded-xl", day ? "hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" : "", day === today ? "bg-violet-50 dark:bg-violet-900/10 ring-2 ring-violet-500/20" : "")}>
                {day && (<>
                  <span className={cn("text-xs font-medium", day === today ? "text-violet-600 font-bold" : "text-slate-600 dark:text-slate-400")}>{day}</span>
                  <div className="mt-1 space-y-0.5">{dayEvents.map((e, ei) => <div key={ei} className={cn("text-[9px] font-medium px-1.5 py-0.5 rounded text-white truncate", e.color)}>{e.title}</div>)}</div>
                </>)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
