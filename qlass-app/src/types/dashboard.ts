// ═══════════════════════════════════════
// Dashboard-specific types for the redesigned Admin Dashboard
// ═══════════════════════════════════════

/** Time period options for the global filter */
export type TimePeriod = "today" | "this_week" | "this_month" | "this_year" | "custom";

/** Global dashboard filter state */
export interface DashboardFilters {
  classFilter: string;   // e.g. "10A" or "" for all
  subjectFilter: string; // e.g. "Science" or "" for all
  timePeriod: TimePeriod;
  customDateStart?: string;
  customDateEnd?: string;
}

// ───────────────────────────────────────
// Card 1 — Academic Progress Overview
// ───────────────────────────────────────
export type ProgressStatus = "On Track" | "Needs Attention" | "Behind Schedule";

export interface AcademicProgressRow {
  id: string;
  className: string;
  subject: string;
  syllabusProgress: number;
  courseProgress: number;
  lectureCompletion: number;
  completedTopics: number;
  totalTopics: number;
  status: ProgressStatus;
}

// ───────────────────────────────────────
// Card 2 — Academic Performance Insights
// ───────────────────────────────────────
export interface PerformanceTrendPoint {
  period: string;      // e.g. "Week 1", "Jan"
  dppScore: number;
  testScore: number;
}

export interface AcademicPerformanceData {
  avgDppScore: number;
  avgTestScore: number;
  dppChange: number;   // e.g. +4 or -2
  testChange: number;
  weeklyGrowth: number;
  monthlyGrowth: number;
  trend: PerformanceTrendPoint[];
}

// ───────────────────────────────────────
// Card 3 — Student Engagement
// ───────────────────────────────────────
export interface AttendanceTrendPoint {
  day: string;
  percentage: number;
}

export interface StudentEngagementData {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  avgAttendance: number;
  presentToday: number;
  absentToday: number;
  attendanceTrend: AttendanceTrendPoint[];
}

// ───────────────────────────────────────
// Card 4 — Attention Required
// ───────────────────────────────────────
export type AlertSeverity = "Critical" | "High" | "Medium";
export type AlertCategory = "Low DPP" | "Behind Syllabus" | "Missing Recordings" | "Low Attendance";

export interface AlertItem {
  id: string;
  category: AlertCategory;
  title: string;
  description: string;
  severity: AlertSeverity;
  className?: string;
  subject?: string;
}

// ───────────────────────────────────────
// Card 5 — Weak Topics
// ───────────────────────────────────────
export type TopicTrend = "Improving" | "Declining" | "Stable";
export type SuggestedAction = "Assign DPP" | "Revision Session" | "Lecture Recording";

export interface WeakTopicRow {
  id: string;
  topic: string;
  subject: string;
  avgScore: number;
  attempts: number;
  trend: TopicTrend;
  suggestedAction: SuggestedAction;
}

// ───────────────────────────────────────
// Card 6 — Announcements (extends existing)
// ───────────────────────────────────────
export interface DashboardAnnouncement {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  priority: "low" | "medium" | "high" | "urgent";
  type: "general" | "exam" | "holiday" | "event" | "urgent";
  unread: boolean;
}

// ───────────────────────────────────────
// Cards 7 & 8 — Class Leaderboards
// ───────────────────────────────────────
export interface TopClassRow {
  rank: number;
  className: string;
  avgScore: number;
  growth: number;  // percentage
}

export interface LowClassRow {
  rank: number;
  className: string;
  avgScore: number;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
}

// ───────────────────────────────────────
// KPI Cards
// ───────────────────────────────────────
export interface KPIItem {
  id: string;
  value: string | number;
  label: string;
  change: string;
  trend: "up" | "down" | "neutral";
  iconName: string;
  iconBg: string;
}

// ───────────────────────────────────────
// Complete dashboard payload
// ───────────────────────────────────────
export interface DashboardData {
  kpis: KPIItem[];
  academicProgress: AcademicProgressRow[];
  performanceInsights: AcademicPerformanceData;
  studentEngagement: StudentEngagementData;
  alerts: AlertItem[];
  weakTopics: WeakTopicRow[];
  announcements: DashboardAnnouncement[];
  topClasses: TopClassRow[];
  lowClasses: LowClassRow[];
}
