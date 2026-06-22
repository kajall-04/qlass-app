"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardFilterStore } from "@/store/filter-store";
import { cn } from "@/lib/utils";
import {
  Filter, X, ChevronDown, SlidersHorizontal, Calendar,
} from "lucide-react";
import {
  CLASS_FILTER_OPTIONS,
  SUBJECT_FILTER_OPTIONS,
  TIME_FILTER_OPTIONS,
} from "@/services/dashboard.service";

// ───────────────────────────────────────
// Dropdown primitive
// ───────────────────────────────────────

interface FilterDropdownProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
  icon: React.ReactNode;
}

function FilterDropdown({ label, value, options, onChange, icon }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((o) => o.value === value)?.label || label;
  const isActive = value !== "" && value !== "this_month";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all",
          isActive
            ? "border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
        )}
      >
        {icon}
        <span className="max-w-[120px] truncate">{selectedLabel}</span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 mt-1 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden min-w-[180px]"
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm transition-colors",
                    value === opt.value
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════
// GLOBAL FILTER BAR
// ═══════════════════════════════════════

export function GlobalFilterBar() {
  const {
    classFilter, subjectFilter, timePeriod,
    setClassFilter, setSubjectFilter, setTimePeriod,
    clearAll, activeFilterCount,
  } = useDashboardFilterStore();

  const count = activeFilterCount();
  const [mobileOpen, setMobileOpen] = useState(false);

  const filterContent = (
    <>
      <FilterDropdown
        label="All Classes"
        value={classFilter}
        options={CLASS_FILTER_OPTIONS}
        onChange={setClassFilter}
        icon={<Filter className="w-3.5 h-3.5" />}
      />
      <FilterDropdown
        label="All Subjects"
        value={subjectFilter}
        options={SUBJECT_FILTER_OPTIONS}
        onChange={setSubjectFilter}
        icon={<SlidersHorizontal className="w-3.5 h-3.5" />}
      />
      <FilterDropdown
        label="This Month"
        value={timePeriod}
        options={TIME_FILTER_OPTIONS}
        onChange={(v) => setTimePeriod(v as "today" | "this_week" | "this_month" | "this_year" | "custom")}
        icon={<Calendar className="w-3.5 h-3.5" />}
      />
      {count > 0 && (
        <button
          onClick={clearAll}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Clear ({count})
        </button>
      )}
    </>
  );

  return (
    <>
      {/* Desktop Filter Bar */}
      <div className="hidden sm:flex items-center gap-2 py-3 px-1 flex-wrap">
        <div className="flex items-center gap-1.5 mr-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Filters
          </span>
        </div>
        {filterContent}
      </div>

      {/* Mobile Filter Toggle */}
      <div className="sm:hidden py-2 px-1">
        <button
          onClick={() => setMobileOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {count > 0 && (
            <span className="ml-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Bottom Sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 sm:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 rounded-t-2xl p-6 sm:hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Filters</h3>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {filterContent}
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full mt-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
