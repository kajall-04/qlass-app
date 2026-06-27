"use client";
import { useState } from "react";
import { LectureCard } from "./LectureCard";
import { Lecture } from "@/types";
import { LayoutGrid, List as ListIcon, ArrowRight, Filter } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function LectureLibraryPreview({ lectures, onLectureClick }: { lectures: Lecture[], onLectureClick?: (lecture: Lecture) => void }) {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recordings Library</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Browse and search all your lectures</p>
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 mr-2">
            <button 
              onClick={() => setView("grid")}
              className={cn("p-1.5 rounded-md transition-colors", view === "grid" ? "bg-white dark:bg-slate-700 shadow-sm text-emerald-600 dark:text-emerald-400" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView("list")}
              className={cn("p-1.5 rounded-md transition-colors", view === "list" ? "bg-white dark:bg-slate-700 shadow-sm text-emerald-600 dark:text-emerald-400" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
          <Link href="/student/lectures/all">
            <button className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-xl font-semibold text-sm transition-colors">
              <Filter className="w-4 h-4" /> View All 
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
      
      <div className={cn(
        "grid gap-4",
        view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
      )}>
        {lectures.slice(0, 8).map((lecture) => (
          <LectureCard key={lecture.id} lecture={lecture} view={view} onClick={() => onLectureClick?.(lecture)} />
        ))}
      </div>
    </div>
  );
}
