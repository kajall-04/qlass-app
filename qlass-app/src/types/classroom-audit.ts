export type RiskStatus = "Low Risk" | "Medium Risk" | "High Risk";
export type AuditStatus = "Excellent" | "Good" | "Average" | "Poor";

export interface TeacherProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  initials: string;
}

export interface TeacherPerformance {
  teacher: TeacherProfile;
  classesCount: number;
  avgAuditScore: number;
  topicCoverage: number;
  dppAssignmentRate: number;
  studentAvgScore: number;
  recordingsUploaded: { uploaded: number; total: number };
  riskStatus: RiskStatus;
}

export interface TopStats {
  avgAuditScore: { value: number; trend: number };
  lecturesAudited: { value: number; trend: number };
  recordingCompliance: { value: number; trend: number };
  topicCoverage: { value: number; trend: number };
  doubtDetectionRate: { value: number; trend: number };
  teachersRequiringSupport: { value: number; trend: number };
}

export interface LectureAuditHighlight {
  id: string;
  date: string;
  teacher: TeacherProfile;
  chapterTopic: string;
  auditScore: number;
  missingTopicsCount: number;
  feedbackSummary: string;
}

export interface TeacherIntervention {
  teacher: TeacherProfile;
  riskReasons: string;
  lastAuditScore: number;
  trend: number[]; // Array of scores for sparkline
}

export interface AuditDistribution {
  name: AuditStatus;
  value: number;
  percentage: number;
  color: string;
}

export interface TeacherAuditChartData {
  name: string;
  score: number;
}

export interface RecordingComplianceChartData {
  name: string;
  compliance: number;
}

export interface ClassroomAuditData {
  classId: string;
  className: string;
  stats: TopStats;
  performanceOverview: TeacherPerformance[];
  auditScoreChart: TeacherAuditChartData[];
  complianceChart: RecordingComplianceChartData[];
  statusDistribution: AuditDistribution[];
  recentHighlights: LectureAuditHighlight[];
  interventionNeeded: TeacherIntervention[];
}
