export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  initials: string;
  avatarColor: string;
  class: string;
  section: string;
  gender: "Male" | "Female";
  email: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  attendance: number;
  avgScore: number;
  pendingDPP: number;
  pendingAssignments: number;
  weakTopics: string[];
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  status: "Active" | "Inactive";
  joinDate: string;
  lastActive: string;
  marks: SubjectMarks;
  monthlyAttendance: MonthlyAttendance[];
  testScores: TestScore[];
  achievements: Achievement[];
  studyStreak: number;
  rank: number;
}

export interface SubjectMarks {
  [subject: string]: number;
}

export interface MonthlyAttendance {
  month: string;
  present: number;
  absent: number;
  total: number;
  percentage: number;
}

export interface TestScore {
  id: string;
  name: string;
  subject: string;
  date: string;
  maxMarks: number;
  obtainedMarks: number;
  percentage: number;
  rank: number;
  classAvg: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  type: "academic" | "attendance" | "dpp" | "special";
}
