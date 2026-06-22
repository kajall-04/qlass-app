"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { Bell, Check, AlertTriangle, FileText, ClipboardCheck, Megaphone } from "lucide-react";

const typeIcons: Record<string, React.ElementType> = { announcement: Megaphone, test: ClipboardCheck, dpp: FileText, attendance: AlertTriangle };
const typeBg: Record<string, string> = { announcement: "bg-blue-100 dark:bg-blue-900/20", test: "bg-violet-100 dark:bg-violet-900/20", dpp: "bg-emerald-100 dark:bg-emerald-900/20", attendance: "bg-red-100 dark:bg-red-900/20" };
const typeColor: Record<string, string> = { announcement: "text-blue-600", test: "text-violet-600", dpp: "text-emerald-600", attendance: "text-red-600" };

export default function StudentNotificationsPage() {
  const data = useMemo(() => getSeedData(), []);
  // Filter out system/teacher notifications for the student view
  const studentNotifs = data.notifications.filter(n => ["announcement", "test", "dpp", "attendance"].includes(n.type));
  const [notifications, setNotifications] = useState(studentNotifs);

  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Notifications</h2>
          <p className="text-sm text-slate-500">{notifications.filter(n => !n.read).length} unread</p>
        </div>
        <button onClick={markAllRead} className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
          <Check className="w-4 h-4" /> Mark all read
        </button>
      </div>

      <div className="space-y-2">
        {notifications.map((n, i) => {
          const Icon = typeIcons[n.type] || Bell;
          return (
            <motion.div key={n.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              onClick={() => markRead(n.id)}
              className={cn("bg-white dark:bg-slate-900 border rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer",
                n.read ? "border-slate-200 dark:border-slate-800" : "border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/5"
              )}>
              <div className="flex items-start gap-3">
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", typeBg[n.type])}>
                  <Icon className={cn("w-4 h-4", typeColor[n.type])} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className={cn("text-sm font-medium", !n.read ? "font-semibold text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300")}>{n.title}</h4>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{n.message}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
