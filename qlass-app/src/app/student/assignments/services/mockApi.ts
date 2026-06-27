import { TaskItem, PracticeFilters } from "../types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function getDateString(daysOffset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString();
}

export async function fetchPracticeData(filters: PracticeFilters): Promise<TaskItem[]> {
  await delay(400); // Network simulation

  const today = getDateString(0);
  const tomorrow = getDateString(1);
  const yesterday = getDateString(-1);
  const nextWeek = getDateString(5);
  const lastWeek = getDateString(-5);

  let tasks: TaskItem[] = [
    {
      id: "t1",
      title: "Electromagnetism Problem Set 4",
      taskType: "Assignment",
      subject: "Physics",
      chapter: "Electromagnetism",
      teacherName: "Mr. Rohan Verma",
      dueDate: lastWeek,
      estimatedTime: 120,
      status: "Overdue",
      difficulty: "Hard",
      bookmarked: true,
    },
    {
      id: "t2",
      title: "Organic Chemistry Reactions",
      taskType: "DPP",
      subject: "Chemistry",
      chapter: "Organic Chem II",
      teacherName: "Ms. Neha Sharma",
      dueDate: today,
      estimatedTime: 45,
      status: "In Progress",
      difficulty: "Medium",
      bookmarked: false,
    },
    {
      id: "t3",
      title: "Calculus Limits & Continuity",
      taskType: "DPP",
      subject: "Mathematics",
      chapter: "Calculus",
      teacherName: "Mr. Amit Jain",
      dueDate: tomorrow,
      estimatedTime: 30,
      status: "Not Started",
      difficulty: "Easy",
      bookmarked: false,
    },
    {
      id: "t4",
      title: "Human Anatomy Lab Record",
      taskType: "Assignment",
      subject: "Biology",
      chapter: "Human Anatomy",
      teacherName: "Dr. Priyanka Nair",
      dueDate: nextWeek,
      estimatedTime: 90,
      status: "Not Started",
      difficulty: "Medium",
      bookmarked: true,
    },
    {
      id: "t5",
      title: "Literature Essay: Hamlet",
      taskType: "Assignment",
      subject: "English",
      chapter: "Drama",
      teacherName: "Ms. Kavita Das",
      dueDate: yesterday,
      estimatedTime: 60,
      status: "Submitted",
      difficulty: "Medium",
      bookmarked: false,
    },
    {
      id: "t6",
      title: "Physics Mock Test 1",
      taskType: "DPP",
      subject: "Physics",
      chapter: "Mechanics",
      teacherName: "Mr. Rohan Verma",
      dueDate: lastWeek,
      estimatedTime: 180,
      status: "Evaluated",
      difficulty: "Hard",
      marks: { obtained: 42, total: 50 },
      bookmarked: false,
    },
    {
      id: "t7",
      title: "Integration Techniques",
      taskType: "DPP",
      subject: "Mathematics",
      chapter: "Calculus",
      teacherName: "Mr. Amit Jain",
      dueDate: today,
      estimatedTime: 40,
      status: "Not Started",
      difficulty: "Medium",
      bookmarked: false,
    },
    {
      id: "t8",
      title: "Cell Division & Genetics",
      taskType: "Assignment",
      subject: "Biology",
      chapter: "Genetics",
      teacherName: "Dr. Priyanka Nair",
      dueDate: tomorrow,
      estimatedTime: 120,
      status: "In Progress",
      difficulty: "Hard",
      bookmarked: false,
    }
  ];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    tasks = tasks.filter(t => 
      t.title.toLowerCase().includes(q) || 
      t.subject.toLowerCase().includes(q) ||
      t.chapter.toLowerCase().includes(q) ||
      t.teacherName.toLowerCase().includes(q)
    );
  }

  if (filters.view === "Assignments Only") {
    tasks = tasks.filter(t => t.taskType === "Assignment");
  } else if (filters.view === "DPPs Only") {
    tasks = tasks.filter(t => t.taskType === "DPP");
  }

  if (filters.status !== "All") {
    if (filters.status === "Completed") {
      tasks = tasks.filter(t => t.status === "Evaluated" || t.status === "Submitted");
    } else if (filters.status === "In Progress") {
      tasks = tasks.filter(t => t.status === "In Progress");
    } else if (filters.status === "Pending") {
      tasks = tasks.filter(t => t.status === "Not Started" || t.status === "In Progress" || t.status === "Overdue");
    }
  }

  if (filters.subject !== "All Subjects") {
    tasks = tasks.filter(t => t.subject === filters.subject);
  }

  // Sort logically for unified chronological/priority display
  // 1. Overdue
  // 2. Due nearest in the future
  // 3. Completed/Submitted
  
  tasks.sort((a, b) => {
    // Basic sorting by date
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return tasks;
}
