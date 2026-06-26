"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, BookOpen, Users, Video, FileText, Bell, Settings, User } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useCommandPaletteStore } from "@/store/command-palette-store";
import { cn } from "@/lib/utils";

const adminCommands = [
  { label: "Dashboard", href: "/admin/dashboard", icon: Command },
  { label: "Classes", href: "/admin/classes", icon: BookOpen },
  { label: "Students", href: "/admin/students", icon: Users },
  { label: "Teachers", href: "/admin/teachers", icon: Users },
  { label: "Lectures", href: "/admin/lectures", icon: Video },
  { label: "DPP", href: "/admin/dpp", icon: FileText },
  { label: "Notifications", href: "/admin/notifications", icon: Bell },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Profile", href: "/admin/profile", icon: User },
];

const teacherCommands = [
  { label: "Dashboard", href: "/teacher/dashboard", icon: Command },
  { label: "My Classes", href: "/teacher/classes", icon: BookOpen },
  { label: "My Students", href: "/teacher/students", icon: Users },
  { label: "Notifications", href: "/teacher/announcements", icon: Bell },
  { label: "Profile", href: "/teacher/profile", icon: User },
];

const studentCommands = [
  { label: "Dashboard", href: "/student/dashboard", icon: Command },
  { label: "My Classes", href: "/student/classes", icon: BookOpen },
  { label: "Assignments", href: "/student/assignments", icon: FileText },
  { label: "Profile", href: "/student/profile", icon: User },
];

export function CommandPalette() {
  const { isOpen: open, setOpen, toggle } = useCommandPaletteStore();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const commands = user?.role === "admin" ? adminCommands 
                 : user?.role === "teacher" ? teacherCommands 
                 : user?.role === "student" ? studentCommands 
                 : [];

  const filtered = query.trim() === "" 
    ? commands 
    : commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault();
      handleSelect(filtered[activeIndex].href);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[101] px-4"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col">
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-100 dark:border-slate-800">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search pages and features..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-0 text-lg"
                  autoFocus
                />
                <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold text-slate-500 uppercase">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center text-sm text-slate-500">
                    No results found for &quot;{query}&quot;
                  </div>
                ) : (
                  filtered.map((cmd, i) => {
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.href}
                        onClick={() => handleSelect(cmd.href)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left",
                          activeIndex === i
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400"
                        )}
                      >
                        <Icon className={cn("w-4 h-4", activeIndex === i ? "text-blue-600 dark:text-blue-400" : "text-slate-400")} />
                        <span className="font-medium text-sm">{cmd.label}</span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
