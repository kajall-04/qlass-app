"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Bell, Lock, User, Palette, Globe, Shield, Smartphone, Monitor } from "lucide-react";
import { PageHeader } from "@/components/teacher/shared/PageHeader";
import { motion } from "framer-motion";

const sections = [
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function TeacherSettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      <PageHeader title="Settings" subtitle="Manage your account preferences and application settings" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-sm flex flex-row lg:flex-col gap-1 overflow-x-auto custom-scrollbar">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                  activeTab === section.id
                    ? "bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                <section.icon size={18} />
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden"
          >
            {activeTab === "account" && (
              <div>
                <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-semibold text-slate-800 dark:text-white">Account Information</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Update your personal details here.</p>
                </div>
                <div className="p-5 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
                      <User size={24} />
                    </div>
                    <div>
                      <button className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                        Change Avatar
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">First Name</label>
                      <input type="text" defaultValue="Sarah" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Last Name</label>
                      <input type="text" defaultValue="Jenkins" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
                      <input type="email" defaultValue="sarah.jenkins@qlass.edu" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm active:scale-95">Save Changes</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-semibold text-slate-800 dark:text-white">Notification Preferences</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage how you receive alerts.</p>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    { title: "Email Notifications", desc: "Receive daily summary and urgent alerts via email.", state: emailNotifs, setter: setEmailNotifs },
                    { title: "Push Notifications", desc: "Receive real-time alerts in the browser.", state: pushNotifs, setter: setPushNotifs },
                  ].map((item, i) => (
                    <div key={i} className="p-5 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800 dark:text-white">{item.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => item.setter(!item.state)}
                        className={cn("w-11 h-6 rounded-full transition-colors relative", item.state ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700")}
                      >
                        <span className={cn("absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm", item.state ? "left-6" : "left-1")} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div>
                <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-semibold text-slate-800 dark:text-white">Security</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage your password and security settings.</p>
                </div>
                <div className="p-5 space-y-5">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full max-w-md px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">New Password</label>
                      <input type="password" placeholder="Enter new password" className="w-full max-w-md px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Confirm New Password</label>
                      <input type="password" placeholder="Confirm new password" className="w-full max-w-md px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm active:scale-95">Update Password</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div>
                <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-semibold text-slate-800 dark:text-white">Appearance</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Customize how QLASS looks for you.</p>
                </div>
                <div className="p-5">
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-3">Theme Theme</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 max-w-md gap-4">
                    <button
                      onClick={() => setDarkMode(false)}
                      className={cn(
                        "p-4 rounded-xl border-2 text-left transition-all",
                        !darkMode ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10" : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                      )}
                    >
                      <Monitor className={cn("w-6 h-6 mb-2", !darkMode ? "text-blue-600" : "text-slate-400")} />
                      <span className="block text-sm font-semibold text-slate-800 dark:text-white">Light Mode</span>
                      <span className="text-xs text-slate-500 mt-1 block">Clean and bright</span>
                    </button>
                    <button
                      onClick={() => setDarkMode(true)}
                      className={cn(
                        "p-4 rounded-xl border-2 text-left transition-all",
                        darkMode ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10" : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                      )}
                    >
                      <Monitor className={cn("w-6 h-6 mb-2", darkMode ? "text-blue-400" : "text-slate-400")} />
                      <span className="block text-sm font-semibold text-slate-800 dark:text-white">Dark Mode</span>
                      <span className="text-xs text-slate-500 mt-1 block">Easy on the eyes</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
