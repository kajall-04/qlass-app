"use client";
import { useState, useMemo } from "react";
import { getSeedData } from "@/data/seed";
import { Lecture } from "@/types";
import { SummaryCards } from "./_components/SummaryCards";
import { ContinueWatching } from "./_components/ContinueWatching";
import { TodayUploads } from "./_components/TodayUploads";
import { LectureLibraryPreview } from "./_components/LectureLibraryPreview";
import { LectureAnalytics } from "./_components/LectureAnalytics";
import { ActivityTimeline } from "./_components/ActivityTimeline";
import { LectureDetailPanel } from "./_components/LectureDetailPanel";

export default function StudentLecturesPage() {
  const data = useMemo(() => getSeedData(), []);
  const student = data.students[0];
  const allLectures = data.getLecturesByClass(student.class);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  
  // Prepare data
  const inProgressLectures = allLectures.filter(l => l.watchStatus === "In Progress");
  const continueWatchingLecture = inProgressLectures.length > 0 ? inProgressLectures[0] : allLectures[0];
  const watchedCount = allLectures.filter(l => l.watchStatus === "Watched").length;
  const missedCount = allLectures.filter(l => l.status === "Completed" && l.watchStatus === "Not Watched").length;
  const notesCount = allLectures.filter(l => l.hasNotes).length;
  const todayUploads = allLectures.slice(0, 10);

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Lectures & Recordings</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Welcome back to your learning workspace, {student.name.split(' ')[0]}
          </p>
        </div>
      </div>

      {/* Section: Top Summary Cards */}
      <SummaryCards 
        lecturesCount={allLectures.length} 
        watchedCount={watchedCount} 
        notesCount={notesCount} 
        missedCount={missedCount} 
      />

      {/* Section: Continue Watching Hero */}
      <ContinueWatching lecture={continueWatchingLecture} />

      {/* Section: Today's Uploads */}
      <TodayUploads lectures={todayUploads} onLectureClick={setSelectedLecture} />

      {/* Section: All Recordings Library Preview */}
      <LectureLibraryPreview lectures={allLectures} onLectureClick={setSelectedLecture} />

      {/* Bottom Section: Analytics & Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Lecture Analytics</h3>
          <LectureAnalytics lectures={allLectures} />
        </div>
        <div className="space-y-6">
          <ActivityTimeline />
        </div>
      </div>

      <LectureDetailPanel 
        lecture={selectedLecture} 
        onClose={() => setSelectedLecture(null)} 
      />
    </div>
  );
}
