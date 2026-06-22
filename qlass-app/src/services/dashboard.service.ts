// ═══════════════════════════════════════
// Dashboard Data Service
// Derives all 8 card datasets from seed data, applying filters.
// ═══════════════════════════════════════

import { getSeedData } from "@/data/seed";
import { CLASSES, SUBJECTS } from "@/lib/constants";
import { randomBetween } from "@/lib/utils";
import type {
  DashboardFilters,
  DashboardData,
  AcademicProgressRow,
  AcademicPerformanceData,
  StudentEngagementData,
  AlertItem,
  WeakTopicRow,
  DashboardAnnouncement,
  TopClassRow,
  LowClassRow,
  KPIItem,
  ProgressStatus,
  AlertSeverity,
  TopicTrend,
  SuggestedAction,
} from "@/types/dashboard";

// ───────────────────────────────────────
// Helpers
// ───────────────────────────────────────

function matchClass(cls: string, filter: string): boolean {
  if (!filter) return true;
  return cls === filter;
}

function matchSubject(subject: string, filter: string): boolean {
  if (!filter) return true;
  return subject.toLowerCase() === filter.toLowerCase();
}

function deriveStatus(progress: number): ProgressStatus {
  if (progress >= 75) return "On Track";
  if (progress >= 55) return "Needs Attention";
  return "Behind Schedule";
}

function deriveRisk(score: number): "Low" | "Medium" | "High" | "Critical" {
  if (score >= 75) return "Low";
  if (score >= 60) return "Medium";
  if (score >= 45) return "High";
  return "Critical";
}

// ───────────────────────────────────────
// KPI Data
// ───────────────────────────────────────

function getKPIData(filters: DashboardFilters): KPIItem[] {
  const seed = getSeedData();
  const students = seed.students.filter(
    (s) => matchClass(s.class, filters.classFilter)
  );
  const teachers = seed.teachers;
  const classes = seed.classes.filter(
    (c) => matchClass(c.fullName, filters.classFilter)
  );
  const dpps = seed.dpp.filter(
    (d) =>
      matchClass(d.class, filters.classFilter) &&
      matchSubject(d.subject, filters.subjectFilter)
  );
  const tests = seed.tests.filter(
    (t) =>
      matchClass(t.class, filters.classFilter) &&
      matchSubject(t.subject, filters.subjectFilter)
  );

  const avgDpp = dpps.length
    ? Math.round(dpps.reduce((sum, d) => sum + d.avgScore, 0) / dpps.length)
    : 0;
  const avgTest = tests.length
    ? Math.round(tests.reduce((sum, t) => sum + t.avgScore, 0) / tests.length)
    : 0;
  const avgSyllabus = classes.length
    ? Math.round(
        classes.reduce((sum, c) => sum + c.syllabusProgress, 0) / classes.length
      )
    : 0;
  const avgAudit = teachers.length
    ? Math.round(
        teachers.reduce((sum, t) => sum + t.auditScore, 0) / teachers.length
      )
    : 0;
  const activeStudents = students.filter((s) => s.status === "Active").length;

  return [
    {
      id: "kpi-classes",
      value: classes.length,
      label: "Total Classes",
      change: "All active",
      trend: "neutral",
      iconName: "BookOpen",
      iconBg: "bg-violet-600",
    },
    {
      id: "kpi-students",
      value: students.length,
      label: "Total Students",
      change: `+12 this month`,
      trend: "up",
      iconName: "Users",
      iconBg: "bg-blue-600",
    },
    {
      id: "kpi-teachers",
      value: teachers.length,
      label: "Total Teachers",
      change: "+2 this month",
      trend: "up",
      iconName: "GraduationCap",
      iconBg: "bg-indigo-600",
    },
    {
      id: "kpi-dpp",
      value: `${avgDpp}%`,
      label: "Avg DPP Score",
      change: "+4% vs last month",
      trend: "up",
      iconName: "FileText",
      iconBg: "bg-emerald-600",
    },
    {
      id: "kpi-test",
      value: `${avgTest}%`,
      label: "Avg Test Score",
      change: "+2% vs last month",
      trend: "up",
      iconName: "ClipboardCheck",
      iconBg: "bg-cyan-600",
    },
    {
      id: "kpi-syllabus",
      value: `${avgSyllabus}%`,
      label: "Avg Syllabus Progress",
      change: "+5% this month",
      trend: "up",
      iconName: "TrendingUp",
      iconBg: "bg-amber-600",
    },
    {
      id: "kpi-audit",
      value: avgAudit,
      label: "Avg Audit Score",
      change: "+1.8 vs last month",
      trend: "up",
      iconName: "BarChart3",
      iconBg: "bg-rose-600",
    },
    {
      id: "kpi-active",
      value: activeStudents,
      label: "Active Students",
      change: `${Math.round((activeStudents / (students.length || 1)) * 100)}% of total`,
      trend: activeStudents > students.length * 0.8 ? "up" : "down",
      iconName: "UserCheck",
      iconBg: "bg-teal-600",
    },
  ];
}

// ───────────────────────────────────────
// Card 1: Academic Progress Overview
// ───────────────────────────────────────

function getAcademicProgress(filters: DashboardFilters): AcademicProgressRow[] {
  const seed = getSeedData();
  const rows: AcademicProgressRow[] = [];
  const classesToProcess = filters.classFilter
    ? seed.classes.filter((c) => c.fullName === filters.classFilter)
    : seed.classes;

  classesToProcess.forEach((cls) => {
    const subjectsToProcess = filters.subjectFilter
      ? cls.subjects.filter(
          (s) => s.name.toLowerCase() === filters.subjectFilter.toLowerCase()
        )
      : cls.subjects;

    subjectsToProcess.forEach((sub) => {
      const lectures = seed.lectures.filter(
        (l) => l.class === cls.fullName && l.subject === sub.name
      );
      const completedLectures = lectures.filter(
        (l) => l.status === "Completed"
      ).length;
      const totalLectures = lectures.length || 1;
      const lectureCompletion = Math.round(
        (completedLectures / totalLectures) * 100
      );
      const totalTopics = randomBetween(30, 50);
      const completedTopics = Math.round((sub.progress / 100) * totalTopics);
      const avgProgress = Math.round(
        (sub.progress + lectureCompletion + (sub.avgScore > 50 ? sub.avgScore : 50)) / 3
      );

      rows.push({
        id: `${cls.fullName}-${sub.name}`,
        className: `Class ${cls.name.replace("Class ", "")} ${cls.section}`,
        subject: sub.name,
        syllabusProgress: sub.progress,
        courseProgress: sub.avgScore > 40 ? Math.min(sub.avgScore + 10, 100) : sub.avgScore,
        lectureCompletion,
        completedTopics,
        totalTopics,
        status: deriveStatus(avgProgress),
      });
    });
  });

  return rows;
}

// ───────────────────────────────────────
// Card 2: Academic Performance Insights
// ───────────────────────────────────────

function getPerformanceInsights(
  filters: DashboardFilters
): AcademicPerformanceData {
  const seed = getSeedData();
  const dpps = seed.dpp.filter(
    (d) =>
      matchClass(d.class, filters.classFilter) &&
      matchSubject(d.subject, filters.subjectFilter)
  );
  const tests = seed.tests.filter(
    (t) =>
      matchClass(t.class, filters.classFilter) &&
      matchSubject(t.subject, filters.subjectFilter)
  );

  const avgDpp = dpps.length
    ? Math.round(dpps.reduce((s, d) => s + d.avgScore, 0) / dpps.length)
    : 0;
  const avgTest = tests.length
    ? Math.round(tests.reduce((s, t) => s + t.avgScore, 0) / tests.length)
    : 0;

  const trend = ["Week 1", "Week 2", "Week 3", "Week 4"].map((period) => ({
    period,
    dppScore: avgDpp + randomBetween(-8, 8),
    testScore: avgTest + randomBetween(-8, 8),
  }));

  return {
    avgDppScore: avgDpp,
    avgTestScore: avgTest,
    dppChange: randomBetween(1, 6),
    testChange: randomBetween(-2, 5),
    weeklyGrowth: randomBetween(1, 5),
    monthlyGrowth: randomBetween(2, 8),
    trend,
  };
}

// ───────────────────────────────────────
// Card 3: Student Engagement
// ───────────────────────────────────────

function getStudentEngagement(
  filters: DashboardFilters
): StudentEngagementData {
  const seed = getSeedData();
  const students = seed.students.filter((s) =>
    matchClass(s.class, filters.classFilter)
  );

  const active = students.filter((s) => s.status === "Active").length;
  const inactive = students.length - active;
  const avgAtt = students.length
    ? Math.round(
        students.reduce((sum, s) => sum + s.attendance, 0) / students.length
      )
    : 0;

  const presentToday = Math.round(students.length * (avgAtt / 100) * (randomBetween(95, 105) / 100));
  const absentToday = students.length - presentToday;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const attendanceTrend = days.map((day) => ({
    day,
    percentage: avgAtt + randomBetween(-8, 6),
  }));

  return {
    totalStudents: students.length,
    activeStudents: active,
    inactiveStudents: inactive,
    avgAttendance: avgAtt,
    presentToday: Math.max(0, presentToday),
    absentToday: Math.max(0, absentToday),
    attendanceTrend,
  };
}

// ───────────────────────────────────────
// Card 4: Attention Required
// ───────────────────────────────────────

function getAlerts(filters: DashboardFilters): AlertItem[] {
  const seed = getSeedData();
  const alerts: AlertItem[] = [];
  let id = 1;

  // Low DPP classes
  seed.dpp
    .filter(
      (d) =>
        d.avgScore < 50 &&
        matchClass(d.class, filters.classFilter) &&
        matchSubject(d.subject, filters.subjectFilter)
    )
    .slice(0, 3)
    .forEach((d) => {
      alerts.push({
        id: `alert-${id++}`,
        category: "Low DPP",
        title: `Low DPP Score: ${d.class}`,
        description: `${d.name} — Average score ${d.avgScore}%`,
        severity: d.avgScore < 35 ? "Critical" : "High",
        className: d.class,
        subject: d.subject,
      });
    });

  // Behind syllabus
  seed.classes
    .filter(
      (c) =>
        c.syllabusProgress < 65 &&
        matchClass(c.fullName, filters.classFilter)
    )
    .slice(0, 2)
    .forEach((c) => {
      alerts.push({
        id: `alert-${id++}`,
        category: "Behind Syllabus",
        title: `Syllabus Behind: Class ${c.name} ${c.section}`,
        description: `Only ${c.syllabusProgress}% completed`,
        severity: c.syllabusProgress < 50 ? "Critical" : "High",
        className: c.fullName,
      });
    });

  // Missing recordings
  seed.lectures
    .filter(
      (l) =>
        l.recordingStatus === "Missing" &&
        matchClass(l.class, filters.classFilter) &&
        matchSubject(l.subject, filters.subjectFilter)
    )
    .slice(0, 3)
    .forEach((l) => {
      alerts.push({
        id: `alert-${id++}`,
        category: "Missing Recordings",
        title: `Missing Recording: ${l.title}`,
        description: `${l.class} — ${l.subject} (${l.date})`,
        severity: "Medium",
        className: l.class,
        subject: l.subject,
      });
    });

  // Low attendance students
  const lowAttStudents = seed.students
    .filter(
      (s) => s.attendance < 65 && matchClass(s.class, filters.classFilter)
    )
    .slice(0, 3);
  lowAttStudents.forEach((s) => {
    alerts.push({
      id: `alert-${id++}`,
      category: "Low Attendance",
      title: `Low Attendance: ${s.name}`,
      description: `${s.class} — ${s.attendance}% attendance`,
      severity: s.attendance < 50 ? "Critical" : "High",
      className: s.class,
    });
  });

  return alerts.slice(0, 10);
}

// ───────────────────────────────────────
// Card 5: Weak Topics
// ───────────────────────────────────────

function getWeakTopics(filters: DashboardFilters): WeakTopicRow[] {
  const seed = getSeedData();
  const topicMap: Record<string, { count: number; totalScore: number; subject: string }> = {};

  seed.students
    .filter((s) => matchClass(s.class, filters.classFilter))
    .forEach((s) => {
      s.weakTopics.forEach((topic) => {
        if (!topicMap[topic]) {
          topicMap[topic] = { count: 0, totalScore: 0, subject: "" };
        }
        topicMap[topic].count++;
        topicMap[topic].totalScore += s.avgScore;
      });
    });

  // Map topics to subjects
  const topicSubjectMap: Record<string, string> = {
    Trigonometry: "Mathematics",
    Calculus: "Mathematics",
    Algebra: "Mathematics",
    Probability: "Mathematics",
    Integration: "Mathematics",
    Differentiation: "Mathematics",
    Matrices: "Mathematics",
    Vectors: "Mathematics",
    Statistics: "Mathematics",
    Mensuration: "Mathematics",
    Circles: "Mathematics",
    Polynomials: "Mathematics",
    "Organic Chemistry": "Chemistry",
    "Chemical Bonding": "Chemistry",
    "Coordination Compounds": "Chemistry",
    Thermodynamics: "Physics",
    "Electromagnetic Waves": "Physics",
    Kinematics: "Physics",
    Optics: "Physics",
    "Fluid Mechanics": "Physics",
    Genetics: "Biology",
    "Cell Biology": "Biology",
    Grammar: "English",
    "Data Structures": "Computer Science",
    Algorithms: "Computer Science",
  };

  const rows: WeakTopicRow[] = Object.entries(topicMap)
    .map(([topic, data], i) => {
      const subject = topicSubjectMap[topic] || "General";
      if (filters.subjectFilter && subject.toLowerCase() !== filters.subjectFilter.toLowerCase()) {
        return null;
      }
      const avgScore = data.count ? Math.round(data.totalScore / data.count) : 0;
      const trends: TopicTrend[] = ["Improving", "Declining", "Stable"];
      const actions: SuggestedAction[] = [
        "Assign DPP",
        "Revision Session",
        "Lecture Recording",
      ];

      return {
        id: `wt-${i}`,
        topic,
        subject,
        avgScore,
        attempts: randomBetween(15, 80),
        trend: trends[i % 3],
        suggestedAction: actions[i % 3],
      } as WeakTopicRow;
    })
    .filter((r): r is WeakTopicRow => r !== null)
    .sort((a, b) => a.avgScore - b.avgScore)
    .slice(0, 5);

  return rows;
}

// ───────────────────────────────────────
// Card 6: Announcements
// ───────────────────────────────────────

function getAnnouncements(
  filters: DashboardFilters
): DashboardAnnouncement[] {
  const seed = getSeedData();
  return seed.announcements
    .filter((a) => {
      if (filters.classFilter) {
        return a.targetClasses.includes(filters.classFilter);
      }
      return true;
    })
    .map((a, i) => ({
      id: a.id,
      title: a.title,
      description: a.content.slice(0, 120) + (a.content.length > 120 ? "…" : ""),
      createdDate: a.date,
      priority: a.type === "urgent" ? "urgent" as const : a.type === "exam" ? "high" as const : i < 2 ? "medium" as const : "low" as const,
      type: a.type,
      unread: i < 2,
    }))
    .slice(0, 5);
}

// ───────────────────────────────────────
// Cards 7 & 8: Class Leaderboards
// ───────────────────────────────────────

function getTopPerformingClasses(filters: DashboardFilters): TopClassRow[] {
  const seed = getSeedData();
  const classScores = seed.classes
    .filter((c) => matchClass(c.fullName, filters.classFilter))
    .map((c) => {
      const students = seed.students.filter((s) => s.class === c.fullName);
      const avg = students.length
        ? Math.round(
            students.reduce((sum, s) => sum + s.avgScore, 0) / students.length
          )
        : 0;
      return {
        className: `Class ${c.name.replace("Class ", "")} ${c.section}`,
        avgScore: avg,
        growth: randomBetween(-3, 12),
      };
    })
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, 5);

  return classScores.map((c, i) => ({
    rank: i + 1,
    ...c,
  }));
}

function getLowPerformingClasses(filters: DashboardFilters): LowClassRow[] {
  const seed = getSeedData();
  const classScores = seed.classes
    .filter((c) => matchClass(c.fullName, filters.classFilter))
    .map((c) => {
      const students = seed.students.filter((s) => s.class === c.fullName);
      const avg = students.length
        ? Math.round(
            students.reduce((sum, s) => sum + s.avgScore, 0) / students.length
          )
        : 0;
      return {
        className: `Class ${c.name.replace("Class ", "")} ${c.section}`,
        avgScore: avg,
        riskLevel: deriveRisk(avg),
      };
    })
    .sort((a, b) => a.avgScore - b.avgScore)
    .slice(0, 5);

  return classScores.map((c, i) => ({
    rank: i + 1,
    ...c,
  }));
}

// ═══════════════════════════════════════
// Master function — returns all card data
// ═══════════════════════════════════════

export function getDashboardData(filters: DashboardFilters): DashboardData {
  return {
    kpis: getKPIData(filters),
    academicProgress: getAcademicProgress(filters),
    performanceInsights: getPerformanceInsights(filters),
    studentEngagement: getStudentEngagement(filters),
    alerts: getAlerts(filters),
    weakTopics: getWeakTopics(filters),
    announcements: getAnnouncements(filters),
    topClasses: getTopPerformingClasses(filters),
    lowClasses: getLowPerformingClasses(filters),
  };
}

/** Available class options for filter dropdown */
export const CLASS_FILTER_OPTIONS = [
  { label: "All Classes", value: "" },
  ...CLASSES.map((c) => ({
    label: `Class ${c.replace(/(\d+)/, "$1 ")}`,
    value: c,
  })),
];

/** Available subject options for filter dropdown */
export const SUBJECT_FILTER_OPTIONS = [
  { label: "All Subjects", value: "" },
  ...SUBJECTS.map((s) => ({ label: s, value: s })),
];

/** Available time period options for filter dropdown */
export const TIME_FILTER_OPTIONS: { label: string; value: string }[] = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "this_week" },
  { label: "This Month", value: "this_month" },
  { label: "This Year", value: "this_year" },
  { label: "Custom Range", value: "custom" },
];
