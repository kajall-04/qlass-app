"use client";
import { useState } from "react";
import { TaskItem } from "../types";
import { UnifiedTaskCard } from "./UnifiedTaskCard";
import { ChevronDown, ChevronUp, FolderSearch } from "lucide-react";

export function TaskFeedGrid({ tasks, isLoading }: { tasks: TaskItem[], isLoading: boolean }) {
  const [showCompleted, setShowCompleted] = useState(false);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 h-64 animate-pulse" />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
          <FolderSearch className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No tasks found</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm">
          You have no tasks matching these filters, or you are completely caught up. Enjoy the break!
        </p>
      </div>
    );
  }

  const todayStr = new Date().toISOString().split('T')[0];
  const nextWeekObj = new Date();
  nextWeekObj.setDate(nextWeekObj.getDate() + 7);
  const nextWeekStr = nextWeekObj.toISOString().split('T')[0];

  // Grouping Logic
  const needsAttention = tasks.filter(t => t.status === "Overdue");
  const upcoming = tasks.filter(t => t.status !== "Overdue" && t.status !== "Evaluated" && t.status !== "Submitted" && t.dueDate <= nextWeekStr);
  const later = tasks.filter(t => t.status !== "Overdue" && t.status !== "Evaluated" && t.status !== "Submitted" && t.dueDate > nextWeekStr);
  const completed = tasks.filter(t => t.status === "Evaluated" || t.status === "Submitted");

  const renderSection = (title: string, taskList: TaskItem[]) => {
    if (taskList.length === 0) return null;
    return (
      <div className="mb-10">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 mb-6">
          {title} <span className="text-sm font-medium text-slate-500 ml-2 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{taskList.length}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {taskList.map(task => <UnifiedTaskCard key={task.id} task={task} />)}
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderSection("Needs Attention", needsAttention)}
      {renderSection("Upcoming Deadlines", upcoming)}
      {renderSection("Later", later)}

      {completed.length > 0 && (
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-2 mx-auto text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            {showCompleted ? "Hide" : "Show"} Completed Tasks ({completed.length})
            {showCompleted ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {showCompleted && (
            <div className="mt-8 animate-in slide-in-from-top-4 fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completed.map(task => <UnifiedTaskCard key={task.id} task={task} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
