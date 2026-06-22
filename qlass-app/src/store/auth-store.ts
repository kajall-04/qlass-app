import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Role } from "@/types/auth";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  impersonate: (role: Role) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: (user) => set({ user, isAuthenticated: true, isLoading: false }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setLoading: (loading) => set({ isLoading: loading }),
      impersonate: (role) => {
        const current = get().user;
        if (!current) return;
        // Store admin session for returning
        const impersonatedUser: User = {
          ...current,
          role,
          id: role === "teacher" ? "TCH-001" : role === "student" ? "STU-0001" : current.id,
          name: role === "teacher" ? "Dr. Priya Sharma" : role === "student" ? "Aarav Sharma" : current.name,
          email: role === "teacher" ? "priya.sharma@qlass.com" : role === "student" ? "aarav.sharma@student.qlass.com" : current.email,
          initials: role === "teacher" ? "PS" : role === "student" ? "AS" : current.initials,
        };
        set({ user: impersonatedUser });
      },
    }),
    { name: "qlass-auth" }
  )
);
