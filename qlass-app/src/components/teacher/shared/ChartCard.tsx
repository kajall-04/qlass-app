"use client";

import { ResponsiveContainer } from "recharts";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  legend?: { color: string; label: string }[];
  periodSelector?: {
    options: { id: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
  };
  children: React.ReactNode;
  height?: number;
  className?: string;
}

export function ChartCard({
  title,
  subtitle,
  icon,
  actions,
  legend,
  periodSelector,
  children,
  height = 260,
  className = "",
}: ChartCardProps) {
  return (
    <div className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden shadow-sm ${className}`}>
      {/* Header */}
      <div className="p-5 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white tracking-tight">{title}</h3>
            {subtitle && <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {legend && (
            <div className="flex items-center gap-3">
              {legend.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
          {periodSelector && (
            <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
              {periodSelector.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => periodSelector.onChange(opt.id)}
                  className={`px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all ${
                    periodSelector.value === opt.id
                      ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
          {actions}
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 px-5 pb-4" style={{ minHeight: height }}>
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
