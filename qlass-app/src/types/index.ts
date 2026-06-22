export interface Lecture {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  teacherId: string;
  class: string;
  date: string;
  time: string;
  duration: string;
  room: string;
  status: "Completed" | "Upcoming" | "Scheduled" | "Cancelled";
  hasRecording: boolean;
  recordingStatus: "Available" | "Missing" | "N/A";
  topicCoverage: number;
  studentAttendance: number;
  notes: string;
}

export interface DPP {
  id: string;
  name: string;
  class: string;
  subject: string;
  teacher: string;
  teacherId: string;
  assignedDate: string;
  dueDate: string;
  totalQuestions: number;
  submissionRate: number;
  avgScore: number;
  totalStudents: number;
  submitted: number;
  weakStudents: number;
  status: "Active" | "Pending" | "Completed" | "Overdue";
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface Test {
  id: string;
  name: string;
  class: string;
  subject: string;
  teacher: string;
  teacherId: string;
  date: string;
  type: "Unit Test" | "Monthly Exam" | "Surprise Quiz" | "Mid-Term" | "Final";
  maxMarks: number;
  avgScore: number;
  highestScore: number;
  lowestScore: number;
  passPercentage: number;
  totalStudents: number;
  appeared: number;
  status: "Completed" | "Upcoming" | "Ongoing";
}

export interface Notification {
  id: string;
  type: "announcement" | "test" | "dpp" | "system" | "teacher" | "student" | "attendance";
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
  priority: "low" | "medium" | "high";
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  targetClasses: string[];
  type: "general" | "exam" | "holiday" | "event" | "urgent";
  pinned: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: "class" | "test" | "event" | "holiday" | "deadline" | "meeting";
  class?: string;
  subject?: string;
  color: string;
}

export interface DashboardKPI {
  value: string | number;
  change: string;
  trend: "up" | "down" | "neutral";
  label: string;
}

export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

export interface FilterState {
  classFilter: string;
  studentFilter: string;
  teacherFilter: string;
  subjectFilter: string;
  dateRange: string;
  customDateStart?: string;
  customDateEnd?: string;
  branch: string;
}
