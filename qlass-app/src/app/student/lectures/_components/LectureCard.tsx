"use client";
import { Play, FileText, BrainCircuit, CheckSquare, Download, Bookmark, Share2, Eye, Clock, CheckCircle2 } from "lucide-react";
import { Lecture } from "@/types";
import { cn } from "@/lib/utils";

interface LectureCardProps {
  lecture: Lecture;
  view?: "grid" | "list";
  onClick?: () => void;
}

export function LectureCard({ lecture, view = "grid", onClick }: LectureCardProps) {
  const isList = view === "list";
  const isCompleted = lecture.watchStatus === "Watched";
  const inProgress = lecture.watchStatus === "In Progress";

  return (
    <div 
      onClick={onClick}
      className={cn(
        "group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 cursor-pointer flex",
        isList ? "flex-col sm:flex-row h-auto sm:h-48" : "flex-col h-full"
      )}
    >
      {/* Thumbnail Section */}
      <div className={cn(
        "relative overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800",
        isList ? "w-full sm:w-72 h-48 sm:h-full" : "w-full aspect-video"
      )}>
        <img 
          src={lecture.thumbnail} 
          alt={lecture.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap pr-12">
          {lecture.hasAiSummary && (
            <span className="bg-purple-500/90 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
              <BrainCircuit className="w-3 h-3" /> AI Summary
            </span>
          )}
          {lecture.hasNotes && (
            <span className="bg-blue-500/90 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
              <FileText className="w-3 h-3" /> Notes
            </span>
          )}
          {lecture.hasDpp && (
            <span className="bg-amber-500/90 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
              <CheckSquare className="w-3 h-3" /> DPP
            </span>
          )}
        </div>

        {/* Top Right Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
          <button className="p-1.5 bg-black/50 hover:bg-black/80 backdrop-blur text-white rounded-full transition-colors" title="Bookmark">
            <Bookmark className={cn("w-4 h-4", lecture.isBookmarked && "fill-emerald-400 text-emerald-400")} />
          </button>
          {lecture.isDownloaded && (
             <button className="p-1.5 bg-black/50 hover:bg-black/80 backdrop-blur text-white rounded-full transition-colors" title="Downloaded">
               <Download className="w-4 h-4 text-emerald-400" />
             </button>
          )}
        </div>
        
        {/* Bottom Info on Thumbnail */}
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur text-white text-xs font-medium px-2 py-1 rounded-md">
          {lecture.duration}
        </div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 bg-emerald-500/90 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 text-white ml-1 fill-white" />
          </div>
        </div>

        {/* Progress Bar */}
        {(inProgress || isCompleted) && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div 
              className={cn("h-full", isCompleted ? "bg-emerald-500" : "bg-emerald-400")} 
              style={{ width: `${lecture.progress}%` }} 
            />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={cn("p-4 flex flex-col flex-1", isList && "justify-between")}>
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {lecture.title}
            </h3>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mb-3">
            <span className="font-medium text-emerald-600 dark:text-emerald-400">{lecture.subject}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span>{lecture.chapter}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span>{lecture.teacher}</span>
          </div>
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {lecture.views > 1000 ? `${(lecture.views/1000).toFixed(1)}k` : lecture.views}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {lecture.uploadDate}</span>
          </div>

          {/* Quick Actions (only really visible in List view or on hover in Grid if space permits, but we'll show watch status icon) */}
          <div className="flex items-center gap-2">
            {isCompleted && <span title="Watched"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></span>}
            {isList && (
              <div className="hidden sm:flex gap-2">
                <button className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors">
                  Details
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
