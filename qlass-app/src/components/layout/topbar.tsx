"use client";

import { useRouter } from "next/navigation";
import { Search, Bell, Moon, Sun, Menu, LogOut, User, Eye } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useSidebarStore } from "@/store/sidebar-store";
import { useThemeStore } from "@/store/theme-store";
import { getRoleLabel, getRoleDashboardPath } from "@/services/auth.service";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const impersonate = useAuthStore((s) => s.impersonate);
  const { collapsed, setMobileOpen } = useSidebarStore();
  const { theme, toggle: toggleTheme } = useThemeStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleImpersonate = (role: "teacher" | "student") => {
    impersonate(role);
    setProfileOpen(false);
    router.push(getRoleDashboardPath(role));
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 z-30 flex items-center justify-between px-4 sm:px-6 transition-all duration-300",
        collapsed ? "lg:left-[72px]" : "lg:left-[260px]",
        "left-0"
      )}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden sm:flex items-center relative">
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-56 pl-9 pr-12 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <kbd className="absolute right-3 text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-1.5 py-0.5 rounded">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
        >
          {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-9 h-9 rounded-xl bg-blue-600 text-white text-sm font-bold flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            {user?.initials || "U"}
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 overflow-hidden animate-scale-in">
              {/* User info */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-700">
                <div className="font-semibold text-sm text-slate-900 dark:text-white">{user?.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</div>
                <div className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                  {user?.role && getRoleLabel(user.role)}
                </div>
              </div>

              {/* Actions */}
              <div className="p-2">
                {/* Impersonate (admin only) */}
                {user?.role === "admin" && (
                  <>
                    <button
                      onClick={() => handleImpersonate("teacher")}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-slate-600 dark:text-slate-300 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View as Teacher
                    </button>
                    <button
                      onClick={() => handleImpersonate("student")}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-slate-600 dark:text-slate-300 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View as Student
                    </button>
                    <div className="border-t border-slate-100 dark:border-slate-700 my-1" />
                  </>
                )}
                <button
                  onClick={() => { setProfileOpen(false); router.push(`/${user?.role}/profile`); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-slate-600 dark:text-slate-300 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Profile & Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-sm text-red-600 dark:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
