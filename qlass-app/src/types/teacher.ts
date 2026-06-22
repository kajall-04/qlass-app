export interface Teacher {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  email: string;
  phone: string;
  subjects: string[];
  classes: string[];
  auditScore: number;
  lectureCompletion: number;
  dppAssignmentRate: number;
  studentPerformance: number;
  studentSatisfaction: number;
  recordingCompliance: number;
  topicCoverage: number;
  status: "Active" | "On Leave" | "Probation";
  joinDate: string;
  experience: string;
  qualification: string;
  totalStudents: number;
  todayClasses: ScheduleItem[];
  monthlyPerformance: MonthlyPerformance[];
}

export interface ScheduleItem {
  id: string;
  time: string;
  subject: string;
  class: string;
  room: string;
  status: "Completed" | "Ongoing" | "Upcoming";
}

export interface MonthlyPerformance {
  month: string;
  auditScore: number;
  studentPerformance: number;
  lectureCompletion: number;
  dppRate: number;
}
