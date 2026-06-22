import type { User, Role } from "@/types/auth";

// Credential database — backend auto-detects role from email/mobile
const credentialDB: Array<{ email: string; mobile: string; password: string; role: Role; user: User }> = [
  {
    email: "admin@qlass.com",
    mobile: "9876543210",
    password: "Admin@123",
    role: "admin",
    user: { id: "ADM-001", name: "Kajal Pareek", email: "admin@qlass.com", mobile: "9876543210", role: "admin", initials: "KP" },
  },
  {
    email: "priya.sharma@qlass.com",
    mobile: "9876543211",
    password: "Teacher@123",
    role: "teacher",
    user: { id: "TCH-001", name: "Dr. Priya Sharma", email: "priya.sharma@qlass.com", mobile: "9876543211", role: "teacher", initials: "PS" },
  },
  {
    email: "aarav.sharma@student.qlass.com",
    mobile: "9876543212",
    password: "Student@123",
    role: "student",
    user: { id: "STU-0001", name: "Aarav Sharma", email: "aarav.sharma@student.qlass.com", mobile: "9876543212", role: "student", initials: "AS" },
  },
];

export interface LoginResult {
  success: boolean;
  user?: User;
  redirectPath?: string;
  error?: string;
}

export async function authenticateUser(identifier: string, password: string): Promise<LoginResult> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 1200));

  const normalized = identifier.trim().toLowerCase().replace(/\s/g, "");

  const match = credentialDB.find(
    (c) => (c.email.toLowerCase() === normalized || c.mobile === normalized) && c.password === password
  );

  if (!match) {
    return { success: false, error: "Invalid credentials. Please check your email/mobile and password." };
  }

  const redirectMap: Record<Role, string> = {
    admin: "/admin/dashboard",
    teacher: "/teacher/dashboard",
    student: "/student/dashboard",
  };

  return {
    success: true,
    user: match.user,
    redirectPath: redirectMap[match.role],
  };
}

export function getRoleDashboardPath(role: Role): string {
  const map: Record<Role, string> = {
    admin: "/admin/dashboard",
    teacher: "/teacher/dashboard",
    student: "/student/dashboard",
  };
  return map[role];
}

export function getRoleLabel(role: Role): string {
  const map: Record<Role, string> = {
    admin: "Administrator",
    teacher: "Teacher",
    student: "Student",
  };
  return map[role];
}
