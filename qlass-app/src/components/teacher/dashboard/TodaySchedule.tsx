"use client";

import Link from "next/link";
import { mockSchedule } from "@/lib/dummyData";
import { useTeacherStore } from "@/store/teacherStore";
import { Clock, MapPin, Video, PlayCircle, Calendar, Users, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function TodaySchedule() {
  const { selectedClass, selectedSubject } = useTeacherStore();

  const filteredSchedule = mockSchedule.filter(item => {
    const classMatch = selectedClass === "all" || item.classId === selectedClass;
    const subjectMatch = selectedSubject === "all" || item.subject === selectedSubject;
    return classMatch && subjectMatch;
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden shadow-sm">
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Calendar size={16} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-white tracking-tight">Today&apos;s Schedule</h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{filteredSchedule.length} classes today</p>
          </div>
        </div>
        <Link
          href="/teacher/calendar"
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
        >
          View All <ChevronRight size={14} />
        </Link>
      </div>

      <div className="flex-1 p-4 sm:p-5 overflow-y-auto custom-scrollbar min-h-[280px]">
        {filteredSchedule.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 py-8">
            <Calendar size={40} className="mb-3 opacity-30" />
            <p className="text-sm font-medium">No classes for selected filters</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {filteredSchedule.map((item, index) => {
                const isCompleted = item.status === "completed";
                const isLive = item.status === "in-progress";
                const isUpcoming = item.status === "upcoming";

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className={cn(
                      "relative rounded-xl p-4 border transition-all duration-200 group",
                      isCompleted && "bg-slate-50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 opacity-70",
                      isLive && "bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 ring-1 ring-blue-100 dark:ring-blue-900/30",
                      isUpcoming && "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-sm"
                    )}
                  >
                    {/* Live indicator */}
                    {isLive && (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                        </span>
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Live</span>
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold",
                        isCompleted && "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400",
                        isLive && "bg-blue-600 text-white shadow-md shadow-blue-600/20",
                        isUpcoming && "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      )}>
                        <Clock size={16} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={cn(
                            "text-[11px] font-semibold px-2 py-0.5 rounded-md",
                            isCompleted && "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400",
                            isLive && "bg-blue-600 text-white",
                            isUpcoming && "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          )}>
                            {item.time}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                            {item.classId}
                          </span>
                        </div>

                        <h3 className={cn(
                          "text-sm font-semibold mb-1",
                          isCompleted ? "text-slate-500 dark:text-slate-400" : "text-slate-800 dark:text-white"
                        )}>
                          {item.subject}
                        </h3>

                        {item.topic && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">{item.topic}</p>
                        )}

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/50">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                              {item.type === "online" ? <Video size={12} className="text-blue-500" /> : <MapPin size={12} className="text-amber-500" />}
                              {item.room}
                            </span>
                            {item.studentCount && (
                              <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                                <Users size={12} />
                                {item.studentCount}
                              </span>
                            )}
                          </div>

                          {isLive && (
                            <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all shadow-sm active:scale-95">
                              <PlayCircle size={13} /> Join
                            </button>
                          )}
                          {isUpcoming && (
                            <button className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                              Prepare →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
