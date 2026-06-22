"use client";

import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import { getRoleLabel } from "@/services/auth.service";
import { Mail, Phone, MapPin, Calendar, Shield, Award } from "lucide-react";

export default function AdminProfilePage() {
  const user = useAuthStore(s => s.user);

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Profile Card */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-blue-600 to-violet-600" />
        <div className="px-6 pb-6 -mt-10">
          <div className="w-20 h-20 rounded-2xl bg-blue-600 border-4 border-white dark:border-slate-900 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {user?.initials || "U"}
          </div>
          <div className="mt-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name || "Admin User"}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full">
                {user?.role ? getRoleLabel(user.role) : "Administrator"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Info */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Contact Information</h3>
        <div className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: user?.email || "admin@qlass.com" },
            { icon: Phone, label: "Mobile", value: user?.mobile || "9876543210" },
            { icon: MapPin, label: "Location", value: "Jaipur, Rajasthan" },
            { icon: Calendar, label: "Joined", value: "January 2024" },
            { icon: Shield, label: "Role", value: user?.role ? getRoleLabel(user.role) : "Administrator" },
            { icon: Award, label: "Status", value: "Active" },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                <item.icon className="w-4 h-4 text-slate-500" />
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{item.label}</div>
                <div className="text-sm font-medium text-slate-900 dark:text-white">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Edit Button */}
      <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-lg shadow-blue-500/25">
        Edit Profile
      </button>
    </div>
  );
}
