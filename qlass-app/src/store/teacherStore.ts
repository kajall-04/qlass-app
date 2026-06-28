import { create } from "zustand";

interface TeacherState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  selectedClass: string;
  setSelectedClass: (cls: string) => void;
  selectedSubject: string;
  setSelectedSubject: (subj: string) => void;
  academicSession: string;
  setAcademicSession: (session: string) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  monthFilter: string;
  setMonthFilter: (month: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const useTeacherStore = create<TeacherState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  selectedClass: "all",
  setSelectedClass: (cls) => set({ selectedClass: cls }),
  selectedSubject: "all",
  setSelectedSubject: (subj) => set({ selectedSubject: subj }),
  academicSession: "2025-2026",
  setAcademicSession: (session) => set({ academicSession: session }),
  dateRange: "this-week",
  setDateRange: (range) => set({ dateRange: range }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  monthFilter: "all",
  setMonthFilter: (month) => set({ monthFilter: month }),
  statusFilter: "all",
  setStatusFilter: (status) => set({ statusFilter: status }),
}));
