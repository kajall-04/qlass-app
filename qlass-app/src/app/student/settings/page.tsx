"use client";
import { Moon, Sun, Bell, Shield, Palette } from "lucide-react";
import { useThemeStore } from "@/store/theme-store";
import { cn } from "@/lib/utils";

export default function StudentSettingsPage() {
  const { theme, toggle } = useThemeStore();
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4"><Palette className="w-5 h-5 text-emerald-600" /><h3 className="text-base font-semibold text-slate-900 dark:text-white">Appearance</h3></div>
        <div className="flex items-center justify-between">
          <div><div className="text-sm font-medium text-slate-900 dark:text-white">Dark Mode</div><div className="text-xs text-slate-500">Switch between light and dark theme</div></div>
          <button onClick={toggle} className={cn("w-12 h-7 rounded-full transition-colors p-1 flex items-center", theme === "dark" ? "bg-emerald-600 justify-end" : "bg-slate-300 justify-start")}>
            <div className="w-5 h-5 rounded-full bg-white shadow flex items-center justify-center">{theme === "dark" ? <Moon className="w-3 h-3 text-emerald-600" /> : <Sun className="w-3 h-3 text-amber-500" />}</div>
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4"><Bell className="w-5 h-5 text-blue-600" /><h3 className="text-base font-semibold text-slate-900 dark:text-white">Notifications</h3></div>
        {["Email Notifications","Assignment Reminders","Test Result Alerts","Attendance Summary"].map(item => (
          <div key={item} className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-800 last:border-0">
            <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
            <button className="w-10 h-6 rounded-full bg-emerald-600 p-0.5 flex items-center justify-end"><div className="w-5 h-5 rounded-full bg-white shadow" /></button>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4"><Shield className="w-5 h-5 text-violet-600" /><h3 className="text-base font-semibold text-slate-900 dark:text-white">Security</h3></div>
        <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"><div className="text-sm font-medium text-slate-900 dark:text-white">Change Password</div><div className="text-xs text-slate-500">Last changed 45 days ago</div></button>
      </div>
    </div>
  );
}
