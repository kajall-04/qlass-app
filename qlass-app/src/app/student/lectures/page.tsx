"use client";
import { useMemo } from "react";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { Video, Play } from "lucide-react";

export default function StudentLecturesPage() {
  const data = useMemo(() => getSeedData(), []);
  const student = data.students[0];
  const myLectures = data.getLecturesByClass(student.class).filter(l => l.status === "Completed").slice(0, 20);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Lectures</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myLectures.map(l => (
          <div key={l.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="h-28 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5 flex items-center justify-center mb-3 relative">
              <Video className="w-8 h-8 text-emerald-400" />
              {l.hasRecording && <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 rounded-xl transition-colors">
                <Play className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>}
              {!l.hasRecording && <span className="absolute top-2 right-2 text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">No Recording</span>}
            </div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{l.title}</h4>
            <p className="text-xs text-slate-500 mt-1">{l.subject} · {l.teacher} · {l.date}</p>
            <p className="text-xs text-slate-400 mt-0.5">{l.duration} · Coverage: {l.topicCoverage}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
