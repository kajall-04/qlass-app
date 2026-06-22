export const APP_NAME = "QLASS";
export const APP_DESCRIPTION = "Education ERP for Schools & Coaching Institutes";

export const CLASSES = ["8A", "8B", "9A", "9B", "10A", "10B"] as const;
export const SECTIONS = ["A", "B"] as const;
export const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Hindi", "Computer Science"] as const;
export const RISK_LEVELS = ["Low", "Medium", "High", "Critical"] as const;

export const AVATAR_COLORS = [
  "bg-blue-500", "bg-emerald-500", "bg-violet-500", 
  "bg-amber-500", "bg-rose-500", "bg-cyan-500", "bg-indigo-500"
] as const;

export const DATE_PRESETS = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "This Month", value: "month" },
  { label: "This Quarter", value: "quarter" },
  { label: "This Year", value: "year" },
  { label: "Academic Session", value: "session" },
] as const;

export const DUMMY_CREDENTIALS = {
  admin: { email: "admin@qlass.com", mobile: "9876543210", password: "Admin@123", role: "admin" as const },
  teacher: { email: "priya.sharma@qlass.com", mobile: "9876543211", password: "Teacher@123", role: "teacher" as const },
  student: { email: "aarav.sharma@student.qlass.com", mobile: "9876543212", password: "Student@123", role: "student" as const },
} as const;
