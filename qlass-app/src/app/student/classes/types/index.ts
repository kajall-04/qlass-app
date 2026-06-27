export interface CourseFilterState {
  search: string;
  academicYear: string;
  subject: string;
  teacher: string;
  status: string;
  sortBy: string;
}

export interface ClassSummary {
  currentClass: string;
  batch: string;
  stream: string;
  subjectsEnrolled: number;
  teachersAssigned: number;
  academicYear: string;
}

export interface CourseSubject {
  id: string;
  subjectName: string;
  teacherName: string;
  totalChapters: number;
  completedChapters: number;
  progressPercent: number;
  status: "On Track" | "Behind" | "Completed" | "In Progress";
  upcomingChapter: string;
  dppAverage: number;
  weakTopicsCount: number;
}

export interface AcademicProgress {
  overallCompletionPercent: number;
  totalChapters: number;
  completedChapters: number;
  pendingChapters: number;
  motivationalMessage: string;
}

export interface MyClassesData {
  summary: ClassSummary;
  subjects: CourseSubject[];
  overallProgress: AcademicProgress;
}
