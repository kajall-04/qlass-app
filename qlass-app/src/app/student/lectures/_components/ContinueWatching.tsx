"use client";
import { Play, Clock, Calendar, ChevronRight } from "lucide-react";
import { Lecture } from "@/types";

export function ContinueWatching({ lecture }: { lecture: Lecture }) {
  if (!lecture) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-slate-950 border border-slate-800 shadow-xl group">
      {/* Background with blur */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `url(${lecture.thumbnail})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

      <div className="relative p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
              Continue Watching
            </span>
            <span className="text-sm font-medium text-slate-400">
              {lecture.subject} • {lecture.chapter}
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            {lecture.title}
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base mb-6 flex items-center gap-4">
            <span>By {lecture.teacher}</span>
            <span className="flex items-center gap-1.5 opacity-80"><Calendar className="w-4 h-4" /> {lecture.lastWatched || lecture.uploadDate}</span>
          </p>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-slate-300 mb-1">
              <span>{Math.round(lecture.progress)}% Completed</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {lecture.remainingTime} remaining</span>
            </div>
            <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/50">
              <div 
                className="h-full bg-emerald-500 rounded-full relative"
                style={{ width: `${lecture.progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
              </div>
            </div>
          </div>
        </div>

        <button className="shrink-0 flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 px-6 py-3.5 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg group/btn">
          <Play className="w-5 h-5 fill-slate-900" />
          Resume Lecture
          <ChevronRight className="w-5 h-5 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
        </button>
      </div>
    </div>
  );
}
