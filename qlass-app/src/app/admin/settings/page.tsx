"use client";

import { motion } from "framer-motion";
import { Moon, Sun, Globe, Bell, Shield, Palette, Monitor, Smartphone, Check, Loader2 } from "lucide-react";
import { useThemeStore } from "@/store/theme-store";
import { useToastStore } from "@/store/toast-store";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AdminSettingsPage() {
  const { theme, toggle } = useThemeStore();
  const { addToast } = useToastStore();
  const [notifs, setNotifs] = useState<Record<string, boolean>>({
    "Email Notifications": true,
    "Push Notifications": true,
    "DPP Alerts": false,
    "Attendance Alerts": true,
    "Test Results": true,
  });
  const [twoFactor, setTwoFactor] = useState(true);
  const [loading, setLoading] = useState("");

  const handleToggleNotif = (key: string) => {
    setNotifs((p) => ({ ...p, [key]: !p[key] }));
    addToast({ type: "success", title: "Settings updated", message: `${key} ${!notifs[key] ? "enabled" : "disabled"}` });
  };

  const handleChangePassword = async () => {
    setLoading("password");
    await new Promise(r => setTimeout(r, 1000));
    setLoading("");
    addToast({ type: "info", title: "Password Reset", message: "Password reset instructions sent to your email." });
  };

  const handleToggle2FA = async () => {
    setLoading("2fa");
    await new Promise(r => setTimeout(r, 1000));
    setTwoFactor(!twoFactor);
    setLoading("");
    addToast({ type: "success", title: "2FA Updated", message: `Two-Factor Authentication is now ${!twoFactor ? "enabled" : "disabled"}.` });
  };

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
        {Object.entries(notifs).map(([item, enabled]) => (
          <div key={item} className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-800 last:border-0">
            <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
            <button 
              onClick={() => handleToggleNotif(item)}
              className={cn("w-10 h-6 rounded-full p-0.5 flex items-center transition-colors", enabled ? "bg-blue-600 justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start")}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow" />
            </button>
          </div>
        ))}
      </motion.div>

      {/* Security */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4"><Shield className="w-5 h-5 text-emerald-600" /><h3 className="text-base font-semibold text-slate-900 dark:text-white">Security</h3></div>
        <div className="space-y-4">
          <button 
            onClick={handleChangePassword}
            disabled={loading === "password"}
            className="w-full flex items-center justify-between text-left p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <div>
              <div className="text-sm font-medium text-slate-900 dark:text-white">Change Password</div>
              <div className="text-xs text-slate-500">Last changed 30 days ago</div>
            </div>
            {loading === "password" && <Loader2 className="w-4 h-4 animate-spin text-slate-400" />}
          </button>
          <button 
            onClick={handleToggle2FA}
            disabled={loading === "2fa"}
            className="w-full flex items-center justify-between text-left p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <div>
              <div className="text-sm font-medium text-slate-900 dark:text-white">Two-Factor Authentication</div>
              <div className={cn("text-xs font-medium", twoFactor ? "text-emerald-600" : "text-slate-500")}>
                {twoFactor ? "Enabled" : "Disabled"}
              </div>
            </div>
            {loading === "2fa" && <Loader2 className="w-4 h-4 animate-spin text-slate-400" />}
          </button>
          <button 
            onClick={() => addToast({ type: "success", title: "Sessions cleared", message: "All other sessions have been logged out." })}
            className="w-full text-left p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="text-sm font-medium text-slate-900 dark:text-white">Active Sessions</div>
            <div className="text-xs text-slate-500">2 devices logged in (Click to sign out others)</div>
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
