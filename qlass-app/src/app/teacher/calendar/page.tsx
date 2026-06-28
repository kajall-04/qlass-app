"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { PageHeader } from "@/components/teacher/shared/PageHeader";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const events = [
  { date: 2, title: "9A Physics", color: "bg-blue-500", type: "class" },
  { date: 5, title: "PTM", color: "bg-violet-500", type: "meeting" },
  { date: 10, title: "10B Unit Test", color: "bg-red-500", type: "test" },
  { date: 15, title: "Mid-Term Start", color: "bg-red-500", type: "test" },
  { date: 18, title: "Mid-Term End", color: "bg-red-500", type: "test" },
  { date: 21, title: "9A Lab Session", color: "bg-emerald-500", type: "class" },
  { date: 22, title: "Staff Meeting", color: "bg-amber-500", type: "meeting" },
  { date: 25, title: "Annual Day", color: "bg-emerald-500", type: "event" },
  { date: 28, title: "9B Review", color: "bg-amber-500", type: "class" },
  { date: 30, title: "Report Cards", color: "bg-violet-500", type: "event" },
];

const upcomingEvents = [
  { title: "9A Physics Lab", time: "10:00 AM", date: "Jun 21", type: "class", color: "bg-blue-500" },
  { title: "Staff Meeting", time: "2:00 PM", date: "Jun 22", type: "meeting", color: "bg-amber-500" },
  { title: "Annual Day Rehearsal", time: "9:00 AM", date: "Jun 25", type: "event", color: "bg-emerald-500" },
  { title: "9B Class Review", time: "11:00 AM", date: "Jun 28", type: "class", color: "bg-blue-500" },
  { title: "Report Card Distribution", time: "All Day", date: "Jun 30", type: "event", color: "bg-violet-500" },
];

export default function TeacherCalendarPage() {
  const daysInMonth = 30;
  const cells: (number | null)[] = [];
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const today = 21;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      <PageHeader title="Calendar" subtitle="Your schedule and upcoming events" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-slate-800 dark:text-white">June 2026</h3>
              <div className="flex gap-1">
                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="px-3 py-1.5 text-xs font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">Today</button>
                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map(d => (
                <div key={d} className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 text-center py-2">{d}</div>
              ))}
            </div>

            {/* Calendar Cells */}
            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) => {
                const dayEvents = day ? events.filter(e => e.date === day) : [];
                return (
                  <div
                    key={i}
                    className={cn(
                      "min-h-[72px] sm:min-h-[85px] p-1.5 rounded-xl transition-colors",
                      day ? "hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" : "",
                      day === today ? "bg-blue-50 dark:bg-blue-900/10 ring-1 ring-blue-200 dark:ring-blue-800" : ""
                    )}
                  >
                    {day && (
                      <>
                        <span className={cn(
                          "text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full",
                          day === today
                            ? "bg-blue-600 text-white font-bold"
                            : "text-slate-600 dark:text-slate-400"
                        )}>
                          {day}
                        </span>
                        <div className="mt-0.5 space-y-0.5">
                          {dayEvents.slice(0, 2).map((e, ei) => (
                            <div key={ei} className={cn("text-[8px] sm:text-[9px] font-medium px-1.5 py-0.5 rounded text-white truncate", e.color)}>
                              {e.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <span className="text-[8px] text-slate-400 dark:text-slate-500 font-medium">+{dayEvents.length - 2} more</span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              {[
                { color: "bg-blue-500", label: "Class" },
                { color: "bg-red-500", label: "Test" },
                { color: "bg-emerald-500", label: "Event" },
                { color: "bg-amber-500", label: "Meeting" },
                { color: "bg-violet-500", label: "Other" },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span className={cn("w-2 h-2 rounded-full", l.color)} />
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                <CalendarDays size={16} className="text-blue-600 dark:text-blue-400" />
                Upcoming Events
              </h3>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-slate-800">
              {upcomingEvents.map((event, i) => (
                <div key={i} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className={cn("w-1 h-10 rounded-full shrink-0", event.color)} />
                    <div className="flex-1">
                      <h4 className="text-xs font-semibold text-slate-800 dark:text-white">{event.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
                          <CalendarDays size={10} />{event.date}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
                          <Clock size={10} />{event.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
