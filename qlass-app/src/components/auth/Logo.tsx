import React from "react";

export function Logo() {
  return (
    <div className="flex items-center gap-3 mb-10">
      <div className="w-11 h-11 rounded-xl bg-[#2563EB] flex items-center justify-center">
        <span className="text-white font-extrabold text-lg">Q</span>
      </div>
      <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Qlass</span>
    </div>
  );
}
