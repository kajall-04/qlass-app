"use client";
import { Video, PlayCircle, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  colorClass: string;
}

export function SummaryCards({ lecturesCount, watchedCount, notesCount, missedCount }: { lecturesCount: number, watchedCount: number, notesCount: number, missedCount: number }) {
  const completionPercent = lecturesCount > 0 ? Math.round((watchedCount / lecturesCount) * 100) : 0;
  
  const cards: SummaryCardProps[] = [
    {
      title: "Total Recordings",
      value: lecturesCount,
      icon: <Video className="w-5 h-5" />,
      colorClass: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
      trend: "+4 this week",
      trendUp: true,
    },
    {
      title: "Recordings Watched",
      value: watchedCount,
      icon: <PlayCircle className="w-5 h-5" />,
      colorClass: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
      trend: "+2 this week",
      trendUp: true,
    },
    {
      title: "Completion",
      value: `${completionPercent}%`,
      icon: <CheckCircle2 className="w-5 h-5" />,
      colorClass: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
    },
    {
      title: "Missed Lectures",
      value: missedCount,
      icon: <AlertCircle className="w-5 h-5" />,
      colorClass: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
      trend: "-1 this week",
      trendUp: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between mb-3">
            <div className={cn("p-2.5 rounded-xl transition-colors", card.colorClass)}>
              {card.icon}
            </div>
            {card.trend && (
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                card.trendUp 
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" 
                  : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
              )}>
                {card.trend}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.title}</h3>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 group-hover:scale-[1.02] origin-left transition-transform">
              {card.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
