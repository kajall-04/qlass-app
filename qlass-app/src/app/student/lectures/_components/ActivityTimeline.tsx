"use client";
import { CheckCircle2, FileText, Download, Bookmark, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

export function ActivityTimeline() {
  const activities = [
    { id: 1, type: 'completed', title: 'Completed "Quadratic Equations"', time: '2 hours ago', icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" /> },
    { id: 2, type: 'notes', title: 'Downloaded Notes for "Thermodynamics"', time: '5 hours ago', icon: <Download className="w-4 h-4 text-blue-500" /> },
    { id: 3, type: 'dpp', title: 'Attempted DPP for "Calculus Introduction"', time: 'Yesterday', icon: <FileText className="w-4 h-4 text-amber-500" /> },
    { id: 4, type: 'bookmark', title: 'Bookmarked "Newton\'s Laws"', time: '2 days ago', icon: <Bookmark className="w-4 h-4 text-purple-500" /> },
    { id: 5, type: 'summary', title: 'Read AI Summary for "Chemical Bonding"', time: '3 days ago', icon: <BrainCircuit className="w-4 h-4 text-pink-500" /> },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h3>
      <div className="relative border-l border-slate-200 dark:border-slate-700 ml-3 space-y-6">
        {activities.map((activity, i) => (
          <div key={activity.id} className="relative pl-6">
            <span className="absolute -left-3 top-1 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
              {activity.icon}
            </span>
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{activity.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
