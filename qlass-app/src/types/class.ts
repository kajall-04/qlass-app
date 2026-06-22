export interface ClassInfo {
  id: string;
  name: string;
  section: string;
  fullName: string;
  classTeacher: string;
  classTeacherId: string;
  totalStudents: number;
  attendance: number;
  syllabusProgress: number;
  performance: number;
  status: "Active" | "Inactive";
  room: string;
  timetable: DaySchedule[];
  upcomingTests: UpcomingTest[];
  announcements: ClassAnnouncement[];
  subjects: ClassSubject[];
}

export interface DaySchedule {
  day: string;
  periods: PeriodItem[];
}

export interface PeriodItem {
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface UpcomingTest {
  subject: string;
  date: string;
  type: "Unit Test" | "Monthly Exam" | "Surprise Quiz" | "Mid-Term" | "Final";
  maxMarks: number;
}

export interface ClassAnnouncement {
  text: string;
  date: string;
  type: "info" | "success" | "warning" | "danger";
}

export interface ClassSubject {
  name: string;
  teacher: string;
  progress: number;
  avgScore: number;
}
