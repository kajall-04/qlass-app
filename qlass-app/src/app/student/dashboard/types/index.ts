export interface DashboardFilters {
  dateRange: string;
  quickFilter: "today" | "weekly" | "monthly" | "yearly";
  subject: string;
}

export interface SummaryStats {
  attendance: number;
  attendanceTrend: number;
  dppSubmissionRate: number;
  dppSubmissionTrend: number;
  avgDppScore: number;
  avgDppTrend: number;
  avgTestScore: number;
  avgTestTrend: number;
  syllabusProgress: number;
  syllabusTrend: number;
  pendingTasks: number;
  pendingTasksTrend: number;
}

export interface LearningPlanItem {
  id: string;
  time: string;
  subject: string;
  topic: string;
  teacher: string;
  type: "Lecture" | "Practice" | "Test" | "Doubt Session";
  status: "Completed" | "Upcoming" | "Scheduled" | "Cancelled";
}

export interface PendingTask {
  id: string;
  title: string;
  subtitle: string;
  type: "dpp" | "test" | "recording" | "review";
  count?: number;
  colorClass?: string;
}

export interface ProgressSnapshot {
  completed: number;
  inProgress: number;
  notStarted: number;
  overall: number;
}

export interface TrendDataPoint {
  label: string;
  value: number;
}

export interface UpcomingTest {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  daysLeft: number;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  priority: "high" | "normal" | "low";
}

export interface StudentDashboardData {
  summary: SummaryStats;
  learningPlan: LearningPlanItem[];
  pendingTasks: PendingTask[];
  progress: ProgressSnapshot;
  dppTrend: TrendDataPoint[];
  testTrend: TrendDataPoint[];
  upcomingTest: UpcomingTest | null;
  announcements: Announcement[];
}
