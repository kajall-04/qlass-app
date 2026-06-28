export interface TeacherProfile {
  id: string;
  name: string;
  role: string;
  email: string;
  avatarUrl: string;
  assignedSubjects: string[];
  assignedClasses: string[];
}

export const mockTeacherProfile: TeacherProfile = {
  id: "t-101",
  name: "Sarah Jenkins",
  role: "Senior Physics Teacher",
  email: "sarah.jenkins@qlass.edu",
  avatarUrl: "https://i.pravatar.cc/150?u=sarah.jenkins",
  assignedSubjects: ["Physics 101", "Advanced Mechanics"],
  assignedClasses: ["11-A", "11-B", "12-A"],
};

export interface KPIData {
  id: string;
  title: string;
  value: string | number;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  iconName: string;
  sparkData?: number[];
}

export const mockKPIs: KPIData[] = [
  { id: "kpi-1", title: "Today's Classes", value: 4, trend: "neutral", trendValue: "Same as yesterday", iconName: "Presentation", sparkData: [3, 4, 5, 4, 3, 4, 4] },
  { id: "kpi-2", title: "Students Assigned", value: 125, trend: "up", trendValue: "+8 this month", iconName: "Users", sparkData: [110, 115, 118, 120, 122, 125, 125] },
  { id: "kpi-3", title: "Pending DPP", value: 12, trend: "down", trendValue: "-4 from yesterday", iconName: "FileCheck2", sparkData: [20, 18, 16, 14, 15, 13, 12] },
  { id: "kpi-4", title: "Pending Doubts", value: 7, trend: "neutral", trendValue: "3 urgent", iconName: "HelpCircle", sparkData: [5, 8, 6, 9, 7, 8, 7] },
  { id: "kpi-5", title: "Avg Performance", value: "84%", trend: "up", trendValue: "+3.2% this month", iconName: "TrendingUp", sparkData: [78, 80, 79, 82, 83, 84, 84] },
  { id: "kpi-6", title: "Attendance", value: "92%", trend: "up", trendValue: "+2% from last week", iconName: "CheckCircle2", sparkData: [88, 89, 90, 91, 90, 91, 92] },
  { id: "kpi-7", title: "Avg Test Score", value: "76%", trend: "up", trendValue: "+1.5% from last test", iconName: "Award", sparkData: [70, 72, 73, 74, 75, 76, 76] },
  { id: "kpi-8", title: "Lecture Completion", value: "78%", trend: "up", trendValue: "+5% this month", iconName: "PlayCircle", sparkData: [65, 68, 70, 72, 74, 76, 78] },
];

export interface ScheduleItem {
  id: string;
  time: string;
  classId: string;
  subject: string;
  room: string;
  type: "online" | "offline";
  status: "upcoming" | "in-progress" | "completed";
  topic?: string;
  studentCount?: number;
}

export const mockSchedule: ScheduleItem[] = [
  { id: "sch-1", time: "09:00 - 10:30", classId: "11-A", subject: "Physics 101", room: "Room 302", type: "offline", status: "completed", topic: "Newton's Laws Ch. 4", studentCount: 42 },
  { id: "sch-2", time: "11:00 - 12:30", classId: "11-B", subject: "Physics 101", room: "Online", type: "online", status: "in-progress", topic: "Kinematics Revision", studentCount: 38 },
  { id: "sch-3", time: "01:30 - 03:00", classId: "12-A", subject: "Advanced Mechanics", room: "Lab 4", type: "offline", status: "upcoming", topic: "Rotational Dynamics", studentCount: 35 },
  { id: "sch-4", time: "03:30 - 05:00", classId: "11-B", subject: "Doubt Clearing", room: "Online", type: "online", status: "upcoming", topic: "Vectors & Projectile", studentCount: 20 },
];

export interface ClassPerformance {
  id: string;
  classId: string;
  totalStudents: number;
  attendancePct: number;
  avgMarks: number;
  dppCompletionPct: number;
  lectureCompletionPct: number;
  status: "on-track" | "at-risk" | "needs-attention";
}

export const mockClassPerformance: ClassPerformance[] = [
  { id: "cp-1", classId: "11-A", totalStudents: 45, attendancePct: 94, avgMarks: 86, dppCompletionPct: 88, lectureCompletionPct: 90, status: "on-track" },
  { id: "cp-2", classId: "11-B", totalStudents: 42, attendancePct: 88, avgMarks: 76, dppCompletionPct: 70, lectureCompletionPct: 75, status: "needs-attention" },
  { id: "cp-3", classId: "12-A", totalStudents: 38, attendancePct: 96, avgMarks: 89, dppCompletionPct: 92, lectureCompletionPct: 95, status: "on-track" },
];

export interface StudentInsightData {
  month: string;
  avgScore: number;
  dppScore: number;
  attendance: number;
}

export const mockStudentInsightsChart: StudentInsightData[] = [
  { month: "Jan", avgScore: 78, dppScore: 80, attendance: 90 },
  { month: "Feb", avgScore: 80, dppScore: 82, attendance: 91 },
  { month: "Mar", avgScore: 79, dppScore: 85, attendance: 88 },
  { month: "Apr", avgScore: 83, dppScore: 86, attendance: 92 },
  { month: "May", avgScore: 84, dppScore: 88, attendance: 94 },
  { month: "Jun", avgScore: 86, dppScore: 89, attendance: 95 },
];

export interface PendingTask {
  id: string;
  title: string;
  type: "dpp" | "assignment" | "attendance" | "lecture";
  dueDate: string;
  priority: "high" | "medium" | "low";
  classId: string;
}

export const mockPendingTasks: PendingTask[] = [
  { id: "pt-1", title: "Review Kinematics DPP", type: "dpp", dueDate: "Today, 5:00 PM", priority: "high", classId: "11-A" },
  { id: "pt-2", title: "Mark morning attendance", type: "attendance", dueDate: "Today, 2:00 PM", priority: "high", classId: "11-B" },
  { id: "pt-3", title: "Upload week 4 lecture notes", type: "lecture", dueDate: "Tomorrow", priority: "medium", classId: "12-A" },
  { id: "pt-4", title: "Grade Mechanics Mid-term", type: "assignment", dueDate: "Friday", priority: "low", classId: "11-A" },
  { id: "pt-5", title: "Prepare doubt sheet for 11-B", type: "dpp", dueDate: "Thursday", priority: "medium", classId: "11-B" },
];

export interface WeakStudent {
  id: string;
  name: string;
  classId: string;
  attendancePct: number;
  performanceScore: number;
  weakTopics: string[];
}

export const mockWeakStudents: WeakStudent[] = [
  { id: "ws-1", name: "Alex Johnson", classId: "11-B", attendancePct: 75, performanceScore: 58, weakTopics: ["Vectors", "Projectile Motion"] },
  { id: "ws-2", name: "Maria Garcia", classId: "11-B", attendancePct: 82, performanceScore: 62, weakTopics: ["Kinematics Equations"] },
  { id: "ws-3", name: "James Smith", classId: "11-A", attendancePct: 90, performanceScore: 65, weakTopics: ["Relative Velocity"] },
  { id: "ws-4", name: "Priya Sharma", classId: "12-A", attendancePct: 68, performanceScore: 52, weakTopics: ["Rotational Dynamics", "Torque"] },
];

export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  priority: "high" | "normal";
  isRead: boolean;
}

export const mockAnnouncements: Announcement[] = [
  { id: "an-1", title: "Revised Term Dates", description: "Mid-term examinations have been rescheduled to start on July 15th.", date: "Today, 9:00 AM", priority: "high", isRead: false },
  { id: "an-2", title: "New Lab Equipment", description: "The Physics lab has received new oscilloscopes. Please schedule an orientation.", date: "Yesterday", priority: "normal", isRead: true },
  { id: "an-3", title: "Staff Meeting", description: "Monthly department meeting in Conference Room B.", date: "Mon, 2:00 PM", priority: "normal", isRead: true },
];

export interface AiInsight {
  id: string;
  type: "warning" | "suggestion" | "positive";
  message: string;
  actionText: string;
}

export const mockAiInsights: AiInsight[] = [
  { id: "ai-1", type: "warning", message: "11-B's performance in Kinematics is 15% below the cohort average.", actionText: "Schedule Extra Class" },
  { id: "ai-2", type: "suggestion", message: "Based on recent DPPs, students are struggling with 'Vectors'.", actionText: "Generate Remedial DPP" },
  { id: "ai-3", type: "positive", message: "12-A has shown a 10% improvement in attendance this month.", actionText: "Send Appreciation" },
];

// ═══════════════════════════════════════
// EXTENDED DASHBOARD DATA
// ═══════════════════════════════════════
export interface AttendanceTrendData {
  day: string;
  present: number;
  absent: number;
  percentage: number;
}

export const mockAttendanceTrend: AttendanceTrendData[] = [
  { day: "Mon", present: 115, absent: 10, percentage: 92 },
  { day: "Tue", present: 118, absent: 7, percentage: 94 },
  { day: "Wed", present: 112, absent: 13, percentage: 90 },
  { day: "Thu", present: 120, absent: 5, percentage: 96 },
  { day: "Fri", present: 116, absent: 9, percentage: 93 },
  { day: "Sat", present: 110, absent: 15, percentage: 88 },
];

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  iconName: string;
  href: string;
  color: string;
}

export const mockQuickActions: QuickAction[] = [
  { id: "qa-1", label: "Take Attendance", description: "Mark today's attendance", iconName: "CheckSquare", href: "/teacher/attendance", color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" },
  { id: "qa-2", label: "Create DPP", description: "Assign new practice paper", iconName: "FileText", href: "/teacher/dpp", color: "bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400" },
  { id: "qa-3", label: "Schedule Test", description: "Plan upcoming test", iconName: "ClipboardList", href: "/teacher/tests", color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" },
  { id: "qa-4", label: "Upload Lecture", description: "Add recording or notes", iconName: "Video", href: "/teacher/lectures", color: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400" },
  { id: "qa-5", label: "Post Announcement", description: "Notify students & parents", iconName: "Megaphone", href: "/teacher/announcements", color: "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400" },
  { id: "qa-6", label: "View Messages", description: "Check inbox", iconName: "MessageSquare", href: "/teacher/messages", color: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400" },
];

export interface RecentActivity {
  id: string;
  action: string;
  detail: string;
  time: string;
  type: "dpp" | "attendance" | "test" | "lecture" | "announcement";
}

export const mockRecentActivity: RecentActivity[] = [
  { id: "ra-1", action: "Evaluated DPP", detail: "Kinematics DPP — 11-A", time: "30 min ago", type: "dpp" },
  { id: "ra-2", action: "Marked Attendance", detail: "11-B Morning Session", time: "1 hour ago", type: "attendance" },
  { id: "ra-3", action: "Published Test Results", detail: "Mechanics Quiz — 12-A", time: "2 hours ago", type: "test" },
  { id: "ra-4", action: "Uploaded Lecture", detail: "Newton's Laws Ch. 4", time: "Yesterday", type: "lecture" },
  { id: "ra-5", action: "Posted Announcement", detail: "Revised Mid-term Schedule", time: "Yesterday", type: "announcement" },
];
