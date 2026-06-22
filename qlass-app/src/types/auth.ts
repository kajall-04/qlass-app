export type Role = "admin" | "teacher" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: Role;
  avatar?: string;
  initials: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
