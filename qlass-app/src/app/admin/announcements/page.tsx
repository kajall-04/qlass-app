"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { Megaphone, Pin, Calendar } from "lucide-react";

export default function AdminAnnouncementsPage() {
  const data = useMemo(() => getSeedData(), []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Announcements</h2>
          <p className="text-sm text-slate-500">{data.announcements.length} announcements</p>
        </div>
        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/25">+ New Announcement</button>
      </div>

      <div className="space-y-4">
        {data.announcements.map((a, i) => (
          <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                a.type === "exam" ? "bg-violet-100 dark:bg-violet-900/20" :
                a.type === "event" ? "bg-blue-100 dark:bg-blue-900/20" :
                a.type === "urgent" ? "bg-red-100 dark:bg-red-900/20" : "bg-slate-100 dark:bg-slate-800")}>
                <Megaphone className={cn("w-5 h-5",
                  a.type === "exam" ? "text-violet-600" : a.type === "event" ? "text-blue-600" : a.type === "urgent" ? "text-red-600" : "text-slate-600")} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{a.title}</h4>
                  {a.pinned && <Pin className="w-3.5 h-3.5 text-blue-600" />}
                  <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase",
                    a.type === "exam" ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" :
                    a.type === "event" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                    a.type === "urgent" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                    "bg-slate-100 text-slate-600")}>{a.type}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">{a.content}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>{a.author} · {a.authorRole}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{a.date}</span>
                  <span>Classes: {a.targetClasses.join(", ")}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
