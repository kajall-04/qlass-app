"use client";

import { useMemo, useState } from "react";
import { getSeedData } from "@/data/seed";
import { Megaphone, Pin, Calendar, Plus, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/teacher/shared/PageHeader";
import { StatusBadge } from "@/components/teacher/shared/StatusBadge";
import { motion } from "framer-motion";

const typeColors = {
  exam: { label: "Exam", variant: "purple" as const },
  event: { label: "Event", variant: "success" as const },
  general: { label: "General", variant: "info" as const },
  holiday: { label: "Holiday", variant: "warning" as const },
  urgent: { label: "Urgent", variant: "danger" as const },
};

export default function TeacherAnnouncementsPage() {
  const data = useMemo(() => getSeedData(), []);
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = data.announcements.filter(a => {
    if (typeFilter !== "all" && a.type !== typeFilter) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      <PageHeader
        title="Announcements"
        subtitle={`${data.announcements.length} announcements`}
        search={{ value: search, onChange: setSearch, placeholder: "Search announcements..." }}
        actions={
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 active:scale-95">
            <Plus size={14} /> Post Announcement
          </button>
        }
      />

      {/* Type Filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto custom-scrollbar pb-1">
        {[
          { id: "all", label: "All" },
          { id: "exam", label: "Exam" },
          { id: "event", label: "Event" },
          { id: "general", label: "General" },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setTypeFilter(f.id)}
            className={cn(
              "px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap",
              typeFilter === f.id
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="space-y-3">
        {filtered.map((a, i) => {
          const typeInfo = typeColors[a.type as keyof typeof typeColors] || typeColors.general;
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-white">{a.title}</h4>
                    {a.pinned && <Pin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                    <StatusBadge label={typeInfo.label} variant={typeInfo.variant} size="sm" />
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">{a.content}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{a.author}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Calendar size={10} />{a.date}
                    </span>
                    <div className="flex items-center gap-1">
                      {a.targetClasses.slice(0, 3).map(c => (
                        <span key={c} className="text-[9px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded">{c}</span>
                      ))}
                      {a.targetClasses.length > 3 && (
                        <span className="text-[9px] text-slate-400">+{a.targetClasses.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
