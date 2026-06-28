"use client";

import { motion } from "framer-motion";
import { mockKPIs } from "@/lib/dummyData";
import { useTeacherStore } from "@/store/teacherStore";
import { StatCard } from "@/components/teacher/shared/StatCard";
import {
  Presentation,
  Users,
  FileCheck2,
  CalendarDays,
  CheckCircle2,
  TrendingUp,
  HelpCircle,
  Award,
  PlayCircle,
} from "lucide-react";
import { useMemo } from "react";

const iconMap: Record<string, { icon: React.ReactNode; bg: string; color: string }> = {
  Presentation: { icon: <Presentation size={22} strokeWidth={2} />, bg: "bg-blue-50 dark:bg-blue-900/20", color: "text-blue-600 dark:text-blue-400" },
  Users: { icon: <Users size={22} strokeWidth={2} />, bg: "bg-indigo-50 dark:bg-indigo-900/20", color: "text-indigo-600 dark:text-indigo-400" },
  FileCheck2: { icon: <FileCheck2 size={22} strokeWidth={2} />, bg: "bg-violet-50 dark:bg-violet-900/20", color: "text-violet-600 dark:text-violet-400" },
  HelpCircle: { icon: <HelpCircle size={22} strokeWidth={2} />, bg: "bg-amber-50 dark:bg-amber-900/20", color: "text-amber-600 dark:text-amber-400" },
  TrendingUp: { icon: <TrendingUp size={22} strokeWidth={2} />, bg: "bg-emerald-50 dark:bg-emerald-900/20", color: "text-emerald-600 dark:text-emerald-400" },
  CheckCircle2: { icon: <CheckCircle2 size={22} strokeWidth={2} />, bg: "bg-teal-50 dark:bg-teal-900/20", color: "text-teal-600 dark:text-teal-400" },
  Award: { icon: <Award size={22} strokeWidth={2} />, bg: "bg-rose-50 dark:bg-rose-900/20", color: "text-rose-600 dark:text-rose-400" },
  PlayCircle: { icon: <PlayCircle size={22} strokeWidth={2} />, bg: "bg-cyan-50 dark:bg-cyan-900/20", color: "text-cyan-600 dark:text-cyan-400" },
  CalendarDays: { icon: <CalendarDays size={22} strokeWidth={2} />, bg: "bg-amber-50 dark:bg-amber-900/20", color: "text-amber-600 dark:text-amber-400" },
};

export function KPICards() {
  const { selectedClass, selectedSubject } = useTeacherStore();

  const displayedKPIs = useMemo(() => {
    if (selectedClass === "all" && selectedSubject === "all") return mockKPIs;

    return mockKPIs.map(kpi => {
      let newValue = kpi.value;
      if (typeof kpi.value === "number") {
        newValue = Math.max(0, Math.floor(kpi.value * 0.4));
      } else if (typeof kpi.value === "string" && kpi.value.includes("%")) {
        const num = parseInt(kpi.value);
        newValue = `${Math.min(100, Math.max(0, num - 5))}%`;
      }
      return { ...kpi, value: newValue };
    });
  }, [selectedClass, selectedSubject]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-6">
      {displayedKPIs.slice(0, 8).map((kpi, index) => {
        const config = iconMap[kpi.iconName] || iconMap.Presentation;
        return (
          <StatCard
            key={`${kpi.id}-${selectedClass}-${selectedSubject}`}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            trendValue={kpi.trendValue}
            icon={config.icon}
            iconBg={config.bg}
            iconColor={config.color}
            delay={index}
            sparkData={kpi.sparkData}
          />
        );
      })}
    </div>
  );
}
