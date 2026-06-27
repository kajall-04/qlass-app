export interface TaskItem {
  id: string;
  title: string;
  taskType: 'DPP' | 'Assignment'; // The critical unifier
  subject: 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology' | 'English';
  chapter: string;
  teacherName: string;
  dueDate: string; // ISO 8601 date string
  estimatedTime: number; // in minutes
  status: 'Not Started' | 'In Progress' | 'Submitted' | 'Evaluated' | 'Overdue';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  marks?: { obtained: number; total: number }; // Only populated if status is Evaluated
  bookmarked: boolean;
}

export interface PracticeFilters {
  search: string;
  view: 'All' | 'Assignments Only' | 'DPPs Only';
  status: 'All' | 'In Progress' | 'Completed' | 'Pending';
  subject: 'All Subjects' | 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology' | 'English';
}
