import { StudentDashboardData, DashboardFilters } from "../types";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchDashboardData(filters: DashboardFilters): Promise<StudentDashboardData> {
  await delay(800); // Simulate network latency for skeleton testing

  return {
    summary: {
      attendance: 92,
      attendanceTrend: 5,
      dppSubmissionRate: 78,
      dppSubmissionTrend: 12,
      avgDppScore: 73,
      avgDppTrend: 5,
      avgTestScore: 68,
      avgTestTrend: -4,
      syllabusProgress: 64,
      syllabusTrend: 8,
      pendingTasks: 7,
      pendingTasksTrend: -2,
    },
    learningPlan: [
      { id: "1", time: "08:00 AM - 09:00 AM", subject: "Physics", topic: "Laws of Motion", teacher: "Mr. Rahul Verma", type: "Lecture", status: "Completed" },
      { id: "2", time: "09:15 AM - 10:15 AM", subject: "Chemistry", topic: "Chemical Bonding", teacher: "Ms. Priya Sharma", type: "Lecture", status: "Completed" },
      { id: "3", time: "10:30 AM - 11:30 AM", subject: "Mathematics", topic: "Quadratic Equations", teacher: "Mr. Amit Mehta", type: "Lecture", status: "Upcoming" },
      { id: "4", time: "12:00 PM - 01:00 PM", subject: "Biology", topic: "Cell: Structure & Function", teacher: "Ms. Neha Singh", type: "Lecture", status: "Upcoming" },
      { id: "5", time: "04:00 PM - 05:00 PM", subject: "Physics", topic: "Numerical Problems", teacher: "Mr. Rahul Verma", type: "Practice", status: "Scheduled" },
    ],
    pendingTasks: [
      { id: "t1", title: "DPPs Pending Submission", subtitle: "Physics (1), Mathematics (1)", type: "dpp", count: 2, colorClass: "text-purple-600 bg-purple-100" },
      { id: "t2", title: "Test Result Available", subtitle: "All India Mock Test - 5", type: "test", count: 1, colorClass: "text-amber-600 bg-amber-100" },
      { id: "t3", title: "Recordings Not Watched", subtitle: "Organic Chemistry - Lec 04", type: "recording", count: 1, colorClass: "text-blue-600 bg-blue-100" },
      { id: "t4", title: "Weak Topics to Review", subtitle: "3 topics need your attention", type: "review", count: 3, colorClass: "text-rose-600 bg-rose-100" },
    ],
    progress: {
      completed: 68,
      inProgress: 22,
      notStarted: 10,
      overall: 68,
    },
    dppTrend: [
      { label: "W1", value: 62 },
      { label: "W2", value: 65 },
      { label: "W3", value: 70 },
      { label: "W4", value: 75 },
      { label: "W5", value: 73 },
    ],
    testTrend: [
      { label: "T1", value: 60 },
      { label: "T2", value: 64 },
      { label: "T3", value: 67 },
      { label: "T4", value: 72 },
      { label: "T5", value: 68 },
    ],
    upcomingTest: {
      id: "ut1",
      title: "All India Mock Test - 6",
      date: "28 May 2025",
      time: "10:00 AM - 01:00 PM (3 hrs)",
      duration: "3 hrs",
      daysLeft: 3,
    },
    announcements: [
      { id: "a1", title: "Important: Syllabus Update for Class 11 & 12", date: "23 May 2025", priority: "high" },
      { id: "a2", title: "Doubt clearing session scheduled for tomorrow", date: "22 May 2025", priority: "normal" },
    ],
  };
}
