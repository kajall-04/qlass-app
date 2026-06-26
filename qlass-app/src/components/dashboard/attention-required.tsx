"use client";

import { DashboardCard } from "./dashboard-card";
import { cn } from "@/lib/utils";
import {
  AlertTriangle, BookOpen, Video, UserMinus,
  FileText, ChevronRight,
} from "lucide-react";
import Link from "next/link";
import type { AlertItem, AlertSeverity, AlertCategory } from "@/types/dashboard";

interface AttentionRequiredProps {
  data: AlertItem[];
}

const severityConfig: Record<AlertSeverity, { bg: string; text: string }> = {
  Critical: { bg: "bg-red-100 dark:bg-red-900/20", text: "text-red-700 dark:text-red-400" },
  High: { bg: "bg-amber-100 dark:bg-amber-900/20", text: "text-amber-700 dark:text-amber-400" },
  Medium: { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-400" },
};

const categoryIcons: Record<AlertCategory, React.ElementType> = {
  "Low DPP": FileText,
  "Behind Syllabus": BookOpen,
  "Missing Recordings": Video,
  "Low Attendance": UserMinus,
};

export function AttentionRequired({ data }: AttentionRequiredProps) {
  return (
    <DashboardCard
      title="Attention Required"
      delay={0.35}
      action={
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-900/20">
          <AlertTriangle className="w-3 h-3 text-red-500" />
          <span className="text-[11px] font-bold text-red-600 dark:text-red-400">
            {data.length}
          </span>
        </div>
      }
    >
      <div className="space-y-0 max-h-[380px] overflow-y-auto">
        {data.map((alert, i) => {
          const sev = severityConfig[alert.severity];
          const Icon = categoryIcons[alert.category] || AlertTriangle;

          return (
            <div
              key={alert.id}
              className={cn(
                "flex items-start gap-3 py-3",
                i < data.length - 1 &&
                  "border-b border-slate-100 dark:border-slate-800"
              )}
            >
              {/* Icon */}
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5", sev.bg)}>
                <Icon className={cn("w-4 h-4", sev.text)} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {alert.title}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0",
                      sev.bg,
                      sev.text
                    )}
                  >
                    {alert.severity}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {alert.description}
                </p>
              </div>

              {/* Action */}
              <Link href="/admin/students" className="shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                Review
              </Link>
            </div>
          );
        })}
      </div>

      {/* View All */}
      <Link href="/admin/notifications" className="w-full mt-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1">
        View All Alerts
        <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    </DashboardCard>
  );
}
