"use client";

import { motion } from "framer-motion";
import { Moon, Sun, Globe, Bell, Shield, Palette, Monitor, Smartphone } from "lucide-react";
import { useThemeStore } from "@/store/theme-store";
import { cn } from "@/lib/utils";

export default function AdminSettingsPage() {
  const { theme, toggle } = useThemeStore();

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Appearance */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4"><Palette className="w-5 h-5 text-violet-600" /><h3 className="text-base font-semibold text-slate-900 dark:text-white">Appearance</h3></div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div><div className="text-sm font-medium text-slate-900 dark:text-white">Dark Mode</div><div className="text-xs text-slate-500">Switch between light and dark theme</div></div>
            <button onClick={toggle} className={cn("w-12 h-7 rounded-full transition-colors p-1 flex items-center", theme === "dark" ? "bg-blue-600 justify-end" : "bg-slate-300 justify-start")}>
              <div className="w-5 h-5 rounded-full bg-white shadow flex items-center justify-center">
                {theme === "dark" ? <Moon className="w-3 h-3 text-blue-600" /> : <Sun className="w-3 h-3 text-amber-500" />}
              </div>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4"><Bell className="w-5 h-5 text-blue-600" /><h3 className="text-base font-semibold text-slate-900 dark:text-white">Notifications</h3></div>
        {["Email Notifications", "Push Notifications", "DPP Alerts", "Attendance Alerts", "Test Results"].map(item => (
          <div key={item} className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-800 last:border-0">
            <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
            <button className="w-10 h-6 rounded-full bg-blue-600 p-0.5 flex items-center justify-end"><div className="w-5 h-5 rounded-full bg-white shadow" /></button>
          </div>
        ))}
      </motion.div>

      {/* Security */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4"><Shield className="w-5 h-5 text-emerald-600" /><h3 className="text-base font-semibold text-slate-900 dark:text-white">Security</h3></div>
        <div className="space-y-4">
          <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div className="text-sm font-medium text-slate-900 dark:text-white">Change Password</div>
            <div className="text-xs text-slate-500">Last changed 30 days ago</div>
          </button>
          <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div className="text-sm font-medium text-slate-900 dark:text-white">Two-Factor Authentication</div>
            <div className="text-xs text-emerald-600 font-medium">Enabled</div>
          </button>
          <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div className="text-sm font-medium text-slate-900 dark:text-white">Active Sessions</div>
            <div className="text-xs text-slate-500">2 devices logged in</div>
          </button>
        </div>
      </motion.div>

      {/* General */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4"><Globe className="w-5 h-5 text-cyan-600" /><h3 className="text-base font-semibold text-slate-900 dark:text-white">General</h3></div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div><div className="text-sm font-medium text-slate-900 dark:text-white">Language</div></div>
            <select className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm">
              <option>English</option><option>Hindi</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div><div className="text-sm font-medium text-slate-900 dark:text-white">Timezone</div></div>
            <select className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm">
              <option>Asia/Kolkata (IST)</option>
            </select>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
