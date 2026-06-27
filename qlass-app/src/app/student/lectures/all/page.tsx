"use client";
import { useState, useMemo } from "react";
import { getSeedData } from "@/data/seed";
import { LectureCard } from "../_components/LectureCard";
import { LectureFilters, FilterState } from "../_components/LectureFilters";
import { LectureDetailPanel } from "../_components/LectureDetailPanel";
import { LayoutGrid, List as ListIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Lecture } from "@/types";

export default function AllRecordingsPage() {
  const data = useMemo(() => getSeedData(), []);
  const student = data.students[0];
  const allLectures = data.getLecturesByClass(student.class);
  
  const subjects = Array.from(new Set(allLectures.map(l => l.subject)));

  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    subject: "",
    status: "",
    sort: "newest"
  });

  // Apply filters
  const filteredLectures = useMemo(() => {
    let result = [...allLectures];
    
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(l => 
        l.title.toLowerCase().includes(q) || 
        l.teacher.toLowerCase().includes(q) || 
        l.chapter.toLowerCase().includes(q)
      );
    }
    
    if (filters.subject) {
      result = result.filter(l => l.subject === filters.subject);
    }
    
    if (filters.status) {
      result = result.filter(l => l.watchStatus === filters.status);
    }

    if (filters.sort === "newest") {
      result.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
    } else if (filters.sort === "oldest") {
      result.sort((a, b) => new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime());
    } else if (filters.sort === "duration-long") {
      result.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
    } else if (filters.sort === "duration-short") {
      result.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    }

    return result;
  }, [allLectures, filters]);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Link href="/student/lectures" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">All Recordings</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse your complete library of {filteredLectures.length} lectures
          </p>
        </div>
      </div>

      <LectureFilters filters={filters} setFilters={setFilters} subjects={subjects} />

      <div className="flex justify-end items-center mb-2">
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
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
      </div>

      {filteredLectures.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-slate-500 dark:text-slate-400">No lectures found matching your criteria.</p>
          <button 
            onClick={() => setFilters({ search: "", subject: "", status: "", sort: "newest" })}
            className="mt-4 text-emerald-600 font-medium hover:underline"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className={cn(
          "grid gap-4",
          view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
        )}>
          {filteredLectures.map(lecture => (
            <LectureCard 
              key={lecture.id} 
              lecture={lecture} 
              view={view} 
              onClick={() => setSelectedLecture(lecture)} 
            />
          ))}
        </div>
      )}

      <LectureDetailPanel 
        lecture={selectedLecture} 
        onClose={() => setSelectedLecture(null)} 
      />
    </div>
  );
}
