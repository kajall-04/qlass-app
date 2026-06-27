"use client";
import { LectureCard } from "./LectureCard";
import { Lecture } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function TodayUploads({ lectures, onLectureClick }: { lectures: Lecture[], onLectureClick?: (lecture: Lecture) => void }) {
  if (!lectures || lectures.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Today's Uploads</h3>
        <Link href="/student/lectures/all" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 gap-4 snap-x hide-scrollbar">
        {lectures.map((lecture) => (
          <div key={lecture.id} className="min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-start flex-none">
            <LectureCard lecture={lecture} view="grid" onClick={() => onLectureClick?.(lecture)} />
          </div>
        ))}
      </div>
    </div>
  );
}
