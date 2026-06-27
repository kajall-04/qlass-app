"use client";
import { Lecture } from "@/types";
import { X, Play, FileText, Download, Bookmark, Share2, BrainCircuit, CheckSquare, MessageSquare } from "lucide-react";
import { useEffect } from "react";

interface LectureDetailPanelProps {
  lecture: Lecture | null;
  onClose: () => void;
}

export function LectureDetailPanel({ lecture, onClose }: LectureDetailPanelProps) {
  // Prevent scrolling when panel is open
  useEffect(() => {
    if (lecture) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [lecture]);

  if (!lecture) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 translate-x-0 border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white truncate">Lecture Details</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Video Player Placeholder */}
          <div className="w-full aspect-video bg-black relative group">
            <img src={lecture.thumbnail} alt={lecture.title} className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 bg-emerald-500/90 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-white ml-1 fill-white" />
              </button>
            </div>
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div 
                className="h-full bg-emerald-500" 
                style={{ width: `${lecture.progress}%` }} 
              />
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Title & Meta */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{lecture.title}</h1>
                <div className="flex gap-2 shrink-0">
                  <button className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full transition-colors" title="Bookmark">
                    <Bookmark className={`w-4 h-4 ${lecture.isBookmarked ? 'fill-emerald-500 text-emerald-500' : ''}`} />
                  </button>
                  <button className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full transition-colors" title="Share">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-4">
                {lecture.subject} • {lecture.chapter} • By {lecture.teacher}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
                <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  {lecture.views.toLocaleString()} views
                </span>
                <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  {lecture.uploadDate}
                </span>
              </div>
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors border border-emerald-100 dark:border-emerald-800/50">
                <FileText className="w-5 h-5" />
                <span className="text-xs font-semibold">Class Notes</span>
              </button>
              
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors border border-purple-100 dark:border-purple-800/50">
                <BrainCircuit className="w-5 h-5" />
                <span className="text-xs font-semibold">AI Summary</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors border border-amber-100 dark:border-amber-800/50">
                <CheckSquare className="w-5 h-5" />
                <span className="text-xs font-semibold">Solve DPP</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors border border-blue-100 dark:border-blue-800/50">
                <MessageSquare className="w-5 h-5" />
                <span className="text-xs font-semibold">Ask Doubt</span>
              </button>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Description</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {lecture.notes || "In this session, we dive deep into the core concepts of this topic. We cover foundational theories and move on to practical problem-solving techniques essential for your exams. Make sure to complete the DPP attached to this lecture to test your understanding."}
              </p>
            </div>

            {/* Related Material */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Study Material</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Teacher's Slides (PDF)</p>
                      <p className="text-xs text-slate-500">2.4 MB</p>
                    </div>
                  </div>
                  <button className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
                      <CheckSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Practice Worksheet</p>
                      <p className="text-xs text-slate-500">15 Questions</p>
                    </div>
                  </div>
                  <button className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="pb-8"></div>
          </div>
        </div>
      </div>
    </>
  );
}
