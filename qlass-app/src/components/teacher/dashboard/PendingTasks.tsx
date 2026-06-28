"use client";

import Link from "next/link";
import { mockPendingTasks } from "@/lib/dummyData";
import { useTeacherStore } from "@/store/teacherStore";
import { CheckCircle2, FileCheck2, Video, CalendarCheck, AlertCircle, ListTodo, Clock, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function PendingTasks() {
  const { selectedClass } = useTeacherStore();

  const filteredTasks = mockPendingTasks.filter(task => {
    return selectedClass === "all" || task.classId === selectedClass;
  });

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "dpp": return <FileCheck2 size={15} className="text-violet-600 dark:text-violet-400" />;
      case "assignment": return <CheckCircle2 size={15} className="text-blue-600 dark:text-blue-400" />;
      case "attendance": return <CalendarCheck size={15} className="text-orange-600 dark:text-orange-400" />;
      case "lecture": return <Video size={15} className="text-emerald-600 dark:text-emerald-400" />;
      default: return <AlertCircle size={15} className="text-slate-600 dark:text-slate-400" />;
    }
  };

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-amber-500";
      case "low": return "bg-slate-400";
      default: return "bg-slate-300";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden shadow-sm">
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center justify-center">
            <ListTodo size={16} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-white tracking-tight">Pending Tasks</h2>
            <span className="text-[10px] font-semibold text-red-600 dark:text-red-400">{filteredTasks.length} pending</span>
          </div>
        </div>
        <Link
          href="/teacher/dpp"
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
        >
          All <ChevronRight size={14} />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 min-h-[200px]">
        {filteredTasks.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 py-6">
            <CheckCircle2 size={36} className="mb-2 text-emerald-400 dark:text-emerald-600 opacity-50" />
            <p className="text-xs font-medium">All caught up!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <AnimatePresence>
              {filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.04 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 cursor-pointer transition-all group"
                >
                  <div className="mt-0.5 p-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors">
                    {getTaskIcon(task.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                        {task.classId}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
                        <Clock className="w-3 h-3" />{task.dueDate}
                      </span>
                    </div>
                  </div>
                  <span className={cn("w-2 h-2 rounded-full shrink-0 mt-2", getPriorityDot(task.priority))} title={task.priority} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
