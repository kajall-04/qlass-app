"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, Search, MessageSquare, ChevronDown, CalendarDays, Command } from "lucide-react";
import { useTeacherStore } from "@/store/teacherStore";
import { mockTeacherProfile } from "@/lib/dummyData";
import { motion, AnimatePresence } from "framer-motion";

export function TopNav() {
  const pathname = usePathname();
  const { sidebarCollapsed, academicSession, setAcademicSession } = useTeacherStore();
  const [showNotifications, setShowNotifications] = useState(false);

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Create breadcrumbs based on pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const pageTitle = pathSegments.length > 1
    ? pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() + pathSegments[pathSegments.length - 1].slice(1).replace(/-/g, " ")
    : "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4 sm:px-6 transition-all duration-300">
      {/* Left — Greeting & Date */}
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex flex-col">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-white leading-tight">
            Welcome back, {mockTeacherProfile.name.split(" ")[0]} 👋
          </h2>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <CalendarDays size={12} />
            <span>{dateStr}</span>
          </div>
        </div>
        <div className="lg:hidden">
          <span className="text-sm font-semibold text-slate-800 dark:text-white">{pageTitle}</span>
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Button */}
        <button
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          title="Search (⌘K)"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Search</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-mono text-slate-500 dark:text-slate-400 ml-1">
            <Command size={10} />K
          </kbd>
        </button>

        {/* Session Selector */}
        <div className="hidden md:flex items-center bg-slate-50 dark:bg-slate-800 rounded-lg px-2.5 py-1.5 border border-slate-200 dark:border-slate-700">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 mr-1.5 font-medium">Session</span>
          <select
            value={academicSession}
            onChange={(e) => setAcademicSession(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="2025-2026">2025-26</option>
            <option value="2026-2027">2026-27</option>
          </select>
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

        {/* Icon Buttons */}
        <div className="flex items-center gap-1">
          <button className="relative p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <MessageSquare className="h-[18px] w-[18px]" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-600 border-2 border-white dark:border-slate-900" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-900" />
            </button>

            {/* Notification Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 overflow-hidden"
                  >
                    <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-800 dark:text-white">Notifications</span>
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">3 new</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800">
                      {[
                        { title: "Mid-term exam schedule released", time: "2h ago", unread: true },
                        { title: "DPP submission deadline approaching", time: "5h ago", unread: true },
                        { title: "8 students below 65% attendance", time: "1d ago", unread: true },
                        { title: "System maintenance scheduled", time: "2d ago", unread: false },
                      ].map((n, i) => (
                        <div key={i} className={`p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${n.unread ? "bg-blue-50/30 dark:bg-blue-900/5" : ""}`}>
                          <div className="flex items-start gap-2">
                            {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />}
                            <div>
                              <p className={`text-xs ${n.unread ? "font-semibold text-slate-800 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}>{n.title}</p>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500">{n.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                      <button className="w-full text-center text-xs font-semibold text-blue-600 dark:text-blue-400 py-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-lg transition-colors">
                        View All Notifications
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

        {/* Profile */}
        <button className="flex items-center gap-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 p-1.5 rounded-lg transition-colors">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center overflow-hidden shadow-sm">
            <img
              src={mockTeacherProfile.avatarUrl}
              alt={mockTeacherProfile.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                const el = e.currentTarget;
                el.style.display = "none";
                el.parentElement!.innerHTML = `<span class="text-white text-xs font-bold">${mockTeacherProfile.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</span>`;
              }}
            />
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-xs font-semibold text-slate-700 dark:text-white leading-tight">
              {mockTeacherProfile.name}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">{mockTeacherProfile.role}</span>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
