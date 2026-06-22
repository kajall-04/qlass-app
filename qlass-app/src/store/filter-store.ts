import { create } from "zustand";
import type { DashboardFilters, TimePeriod } from "@/types/dashboard";

// ═══════════════════════════════════════
// Dashboard Filter Store (with URL sync)
// ═══════════════════════════════════════

interface DashboardFilterStore extends DashboardFilters {
  setClassFilter: (cls: string) => void;
  setSubjectFilter: (subject: string) => void;
  setTimePeriod: (period: TimePeriod) => void;
  setCustomRange: (start: string, end: string) => void;
  clearAll: () => void;
  activeFilterCount: () => number;
  initFromURL: (searchParams: URLSearchParams) => void;
  syncToURL: () => void;
}

const defaultFilters: DashboardFilters = {
  classFilter: "",
  subjectFilter: "",
  timePeriod: "this_month",
  customDateStart: undefined,
  customDateEnd: undefined,
};

export const useDashboardFilterStore = create<DashboardFilterStore>(
  (set, get) => ({
    ...defaultFilters,

    setClassFilter: (cls) => {
      set({ classFilter: cls });
      get().syncToURL();
    },

    setSubjectFilter: (subject) => {
      set({ subjectFilter: subject });
      get().syncToURL();
    },

    setTimePeriod: (period) => {
      set({ timePeriod: period });
      if (period !== "custom") {
        set({ customDateStart: undefined, customDateEnd: undefined });
      }
      get().syncToURL();
    },

    setCustomRange: (start, end) => {
      set({ timePeriod: "custom", customDateStart: start, customDateEnd: end });
      get().syncToURL();
    },

    clearAll: () => {
      set(defaultFilters);
      get().syncToURL();
    },

    activeFilterCount: () => {
      const s = get();
      let count = 0;
      if (s.classFilter) count++;
      if (s.subjectFilter) count++;
      if (s.timePeriod && s.timePeriod !== "this_month") count++;
      return count;
    },

    initFromURL: (searchParams) => {
      const cls = searchParams.get("class") || "";
      const subject = searchParams.get("subject") || "";
      const period = (searchParams.get("period") as TimePeriod) || "this_month";
      const start = searchParams.get("from") || undefined;
      const end = searchParams.get("to") || undefined;

      set({
        classFilter: cls,
        subjectFilter: subject,
        timePeriod: period,
        customDateStart: start,
        customDateEnd: end,
      });
    },

    syncToURL: () => {
      if (typeof window === "undefined") return;
      const s = get();
      const params = new URLSearchParams();

      if (s.classFilter) params.set("class", s.classFilter);
      if (s.subjectFilter) params.set("subject", s.subjectFilter);
      if (s.timePeriod && s.timePeriod !== "this_month")
        params.set("period", s.timePeriod);
      if (s.timePeriod === "custom") {
        if (s.customDateStart) params.set("from", s.customDateStart);
        if (s.customDateEnd) params.set("to", s.customDateEnd);
      }

      const query = params.toString();
      const newUrl = query
        ? `${window.location.pathname}?${query}`
        : window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    },
  })
);

// ───────────────────────────────────────
// Keep the old useFilterStore for backward compat
// (other pages may still use it)
// ───────────────────────────────────────
import type { FilterState } from "@/types/index";

interface FilterStore extends FilterState {
  setClassFilter: (cls: string) => void;
  setStudentFilter: (student: string) => void;
  setTeacherFilter: (teacher: string) => void;
  setSubjectFilter: (subject: string) => void;
  setDateRange: (range: string) => void;
  setCustomDateRange: (start: string, end: string) => void;
  setBranch: (branch: string) => void;
  clearAll: () => void;
  activeFilterCount: () => number;
}

const oldDefaultFilters: FilterState = {
  classFilter: "",
  studentFilter: "",
  teacherFilter: "",
  subjectFilter: "",
  dateRange: "30d",
  customDateStart: undefined,
  customDateEnd: undefined,
  branch: "",
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  ...oldDefaultFilters,
  setClassFilter: (cls) => set({ classFilter: cls }),
  setStudentFilter: (student) => set({ studentFilter: student }),
  setTeacherFilter: (teacher) => set({ teacherFilter: teacher }),
  setSubjectFilter: (subject) => set({ subjectFilter: subject }),
  setDateRange: (range) => set({ dateRange: range }),
  setCustomDateRange: (start, end) =>
    set({ customDateStart: start, customDateEnd: end, dateRange: "custom" }),
  setBranch: (branch) => set({ branch }),
  clearAll: () => set(oldDefaultFilters),
  activeFilterCount: () => {
    const s = get();
    let count = 0;
    if (s.classFilter) count++;
    if (s.studentFilter) count++;
    if (s.teacherFilter) count++;
    if (s.subjectFilter) count++;
    if (s.dateRange && s.dateRange !== "30d") count++;
    if (s.branch) count++;
    return count;
  },
}));
