import React from "react";

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 text-center hover:bg-white/[0.12] transition-colors duration-300">
      <div className="text-xl font-bold text-white">{value}</div>
      <div className="text-xs text-white/50 mt-1">{label}</div>
    </div>
  );
}
