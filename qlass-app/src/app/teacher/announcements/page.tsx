"use client";
import { useMemo } from "react";
import { getSeedData } from "@/data/seed";
import { Megaphone, Pin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeacherAnnouncementsPage() {
  const data = useMemo(() => getSeedData(), []);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Announcements</h2>
        <button className="px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-violet-500/25">+ Post Announcement</button>
      </div>
      {data.announcements.map(a => (
        <div key={a.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{a.title}</h4>
            {a.pinned && <Pin className="w-3.5 h-3.5 text-violet-600" />}
            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase", a.type === "exam" ? "bg-violet-100 text-violet-700" : "bg-blue-100 text-blue-700")}>{a.type}</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{a.content}</p>
          <div className="text-xs text-slate-400">{a.author} · {a.date}</div>
        </div>
      ))}
    </div>
  );
}
