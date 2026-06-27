import { MyClassesData, CourseFilterState } from "../types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchClassData(filters: CourseFilterState): Promise<MyClassesData> {
  await delay(800); // Simulate network latency

  let subjects = [
    {
      id: "sub_phys",
      subjectName: "Physics",
      teacherName: "Mr. Rohan Verma",
      totalChapters: 15,
      completedChapters: 12,
      progressPercent: 80,
      status: "On Track" as const,
      upcomingChapter: "Thermodynamics",
      dppAverage: 85,
      weakTopicsCount: 1,
    },
    {
      id: "sub_chem",
      subjectName: "Chemistry",
      teacherName: "Ms. Neha Sharma",
      totalChapters: 14,
      completedChapters: 6,
      progressPercent: 42,
      status: "Behind" as const,
      upcomingChapter: "Organic Chemistry II",
      dppAverage: 65,
      weakTopicsCount: 3,
    },
    {
      id: "sub_math",
      subjectName: "Mathematics",
      teacherName: "Mr. Amit Jain",
      totalChapters: 18,
      completedChapters: 18,
      progressPercent: 100,
      status: "Completed" as const,
      upcomingChapter: "Revision Module",
      dppAverage: 92,
      weakTopicsCount: 0,
    },
    {
      id: "sub_bio",
      subjectName: "Biology",
      teacherName: "Dr. Priyanka Nair",
      totalChapters: 22,
      completedChapters: 14,
      progressPercent: 63,
      status: "In Progress" as const,
      upcomingChapter: "Genetics",
      dppAverage: 78,
      weakTopicsCount: 2,
    },
    {
      id: "sub_eng",
      subjectName: "English",
      teacherName: "Ms. Kavita Das",
      totalChapters: 10,
      completedChapters: 8,
      progressPercent: 80,
      status: "On Track" as const,
      upcomingChapter: "Literature Review",
      dppAverage: 88,
      weakTopicsCount: 0,
    },
  ];

  // Apply Search
  if (filters.search) {
    const q = filters.search.toLowerCase();
    subjects = subjects.filter(s => 
      s.subjectName.toLowerCase().includes(q) || 
      s.teacherName.toLowerCase().includes(q) || 
      s.upcomingChapter.toLowerCase().includes(q)
    );
  }

  // Apply Subject Filter
  if (filters.subject && filters.subject !== "All Subjects") {
    subjects = subjects.filter(s => s.subjectName === filters.subject);
  }

  // Apply Teacher Filter
  if (filters.teacher && filters.teacher !== "All Teachers") {
    subjects = subjects.filter(s => s.teacherName === filters.teacher);
  }

  // Apply Status Filter
  if (filters.status && filters.status !== "All") {
    subjects = subjects.filter(s => s.status === filters.status);
  }

  // Apply Sort
  if (filters.sortBy === "Subject Name") {
    subjects.sort((a, b) => a.subjectName.localeCompare(b.subjectName));
  } else if (filters.sortBy === "Progress %") {
    subjects.sort((a, b) => b.progressPercent - a.progressPercent);
  } else if (filters.sortBy === "Chapters Completed") {
    subjects.sort((a, b) => b.completedChapters - a.completedChapters);
  } else if (filters.sortBy === "Teacher Name") {
    subjects.sort((a, b) => a.teacherName.localeCompare(b.teacherName));
  }

  // Recalculate totals based on filtered subjects
  const totalChapters = subjects.reduce((acc, s) => acc + s.totalChapters, 0);
  const completedChapters = subjects.reduce((acc, s) => acc + s.completedChapters, 0);
  const overallCompletionPercent = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
  const pendingChapters = totalChapters - completedChapters;

  return {
    summary: {
      currentClass: "Class 12",
      batch: "Morning Star",
      stream: "Science (PCM)",
      subjectsEnrolled: subjects.length,
      teachersAssigned: new Set(subjects.map(s => s.teacherName)).size,
      academicYear: filters.academicYear || "2024-25",
    },
    subjects,
    overallProgress: {
      overallCompletionPercent,
      totalChapters,
      completedChapters,
      pendingChapters,
      motivationalMessage: overallCompletionPercent >= 80 ? "Excellent work! Keep it up." : overallCompletionPercent >= 50 ? "You're on the right track." : "Time to step on the gas!",
    },
  };
}
