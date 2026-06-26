"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSeedData } from "@/data/seed";
import { cn } from "@/lib/utils";
import { Search, Filter, BookOpen, Clock, Calendar, CheckCircle2, ChevronRight, Video, FileText, X, AlertTriangle, Users, MapPin, PlayCircle } from "lucide-react";

export default function AdminLessonPlanPage() {
  const data = useMemo(() => getSeedData(), []);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("10A"); // Default to one class to make the timeline look coherent
  const [subjectFilter, setSubjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedLecture, setSelectedLecture] = useState<any | null>(null);

  // Filter lectures
  const filtered = useMemo(() => {
    return data.lectures
      .filter(l => {
        if (search && !l.title.toLowerCase().includes(search.toLowerCase()) && !l.teacher.toLowerCase().includes(search.toLowerCase())) return false;
        if (classFilter && l.class !== classFilter) return false;
        if (subjectFilter && l.subject !== subjectFilter) return false;
        if (statusFilter && l.status !== statusFilter) return false;
        return true;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data.lectures, search, classFilter, subjectFilter, statusFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = filtered.length;
    const completed = filtered.filter(l => l.status === "Completed").length;
    const upcoming = filtered.filter(l => l.status === "Upcoming").length;
    
    // Average coverage of completed lectures
    const completedLectures = filtered.filter(l => l.status === "Completed");
    const avgCoverage = completedLectures.length > 0 
      ? Math.round(completedLectures.reduce((a, l) => a + l.topicCoverage, 0) / completedLectures.length)
      : 0;

    // Estimate overall syllabus progress based on completed vs total
    const syllabusProgress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, upcoming, avgCoverage, syllabusProgress };
  }, [filtered]);

  const allClasses = ["8A","8B","9A","9B","10A","10B"];
  const allSubjects = ["Mathematics","Physics","Chemistry","Biology","English","Hindi","Computer Science"];

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header & Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Syllabus Progress", value: `${stats.syllabusProgress}%`, icon: BookOpen, iconBg: "bg-blue-600" },
          { label: "Topics Completed", value: stats.completed, icon: CheckCircle2, iconBg: "bg-emerald-600" },
          { label: "Upcoming Lectures", value: stats.upcoming, icon: Clock, iconBg: "bg-amber-600" },
          { label: "Avg Topic Coverage", value: `${stats.avgCoverage}%`, icon: FileText, iconBg: "bg-violet-600" },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", s.iconBg)}>
                <s.icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</div>
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search topics or teachers..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>
          <select value={classFilter} onChange={e => setClassFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            <option value="">All Classes (Not recommended)</option>
            {allClasses.map(c => <option key={c} value={c}>Class {c}</option>)}
          </select>
          <select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            <option value="">All Subjects</option>
            {allSubjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            <option value="">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Upcoming">Upcoming</option>
          </select>
          {(search || classFilter || subjectFilter || statusFilter) && (
            <button onClick={() => { setSearch(""); setClassFilter(""); setSubjectFilter(""); setStatusFilter(""); }}
              className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-bold transition-colors">Clear</button>
          )}
        </div>
      </div>

      {/* Curriculum Timeline */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Curriculum Timeline</h2>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              {classFilter ? `Showing lesson plan for Class ${classFilter}` : "Showing all scheduled lectures"}
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No lessons found</h3>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your filters to see the curriculum.</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-4 space-y-8 pb-4">
            {filtered.map((lecture, i) => (
              <motion.div 
                key={lecture.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative pl-8 group"
              >
                {/* Timeline Dot */}
                <div className={cn("absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center transition-colors",
                  lecture.status === "Completed" ? "bg-emerald-500" : "bg-blue-500"
                )}>
                  {lecture.status === "Completed" && <CheckCircle2 className="w-3 h-3 text-white absolute" />}
                </div>

                {/* Card */}
                <div 
                  onClick={() => setSelectedLecture(lecture)}
                  className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                          lecture.status === "Completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                          "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        )}>
                          {lecture.status}
                        </span>
                        <span className="text-xs font-bold text-slate-400">•</span>
                        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" /> {lecture.date}
                        </span>
                        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> {lecture.time}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">{lecture.title}</h3>
                      <div className="text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        {lecture.subject}
                        <span className="text-slate-300 dark:text-slate-600">|</span>
                        <span className="bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-md text-[10px] font-black">Class {lecture.class}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 md:border-l border-slate-200 dark:border-slate-700 md:pl-6">
                      {/* Teacher */}
                      <div className="flex items-center gap-3 w-40">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold text-sm">
                          {lecture.teacher.split(' ').map((n:string)=>n[0]).join('').substring(0,2)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{lecture.teacher}</div>
                          <div className="text-[10px] font-semibold text-slate-500 uppercase">Instructor</div>
                        </div>
                      </div>

                      {/* Coverage (if completed) */}
                      {lecture.status === "Completed" && (
                        <div className="w-32">
                          <div className="flex justify-between text-[10px] font-bold mb-1">
                            <span className="text-slate-500 uppercase">Coverage</span>
                            <span className={cn(
                              lecture.topicCoverage >= 90 ? "text-emerald-600" :
                              lecture.topicCoverage >= 75 ? "text-blue-600" : "text-amber-600"
                            )}>{lecture.topicCoverage}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className={cn("h-full rounded-full", 
                                lecture.topicCoverage >= 90 ? "bg-emerald-500" :
                                lecture.topicCoverage >= 75 ? "bg-blue-500" : "bg-amber-500"
                              )} 
                              style={{ width: `${lecture.topicCoverage}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      <button className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:border-blue-200 dark:group-hover:text-blue-400 dark:group-hover:border-blue-900 transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Slide-Over Panel for Lecture Details */}
      <AnimatePresence>
        {selectedLecture && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLecture(null)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500" /> Lesson Details
                </h2>
                <button 
                  onClick={() => setSelectedLecture(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Main Info */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                      selectedLecture.status === "Completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    )}>
                      {selectedLecture.status}
                    </span>
                    <span className="text-[10px] font-black bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      {selectedLecture.id}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-2">{selectedLecture.title}</h3>
                  <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{selectedLecture.subject} • Class {selectedLecture.class}</div>
                </div>

                {/* Logistics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                      <Calendar className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{selectedLecture.date}</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                      <Clock className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{selectedLecture.time}</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                      <Clock className="w-4 h-4 text-rose-500" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{selectedLecture.duration}</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Room</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{selectedLecture.room}</div>
                    </div>
                  </div>
                </div>

                {/* Teacher Profile */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Instructor</h4>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-100 dark:border-blue-900/30">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-lg">
                      {selectedLecture.teacher.split(' ').map((n:string)=>n[0]).join('').substring(0,2)}
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900 dark:text-white">{selectedLecture.teacher}</div>
                      <div className="text-xs font-semibold text-slate-500">View full profile in Teachers tab</div>
                    </div>
                  </div>
                </div>

                {/* Lecture Performance (If Completed) */}
                {selectedLecture.status === "Completed" && (
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lecture Execution</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
                        <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-1">{selectedLecture.topicCoverage}%</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Topic Covered</div>
                      </div>
                      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
                        <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-1">{selectedLecture.studentAttendance}%</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Student Attendance</div>
                      </div>
                    </div>
                    {selectedLecture.notes && (
                      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider dark:text-amber-500">Teacher Notes</span>
                        </div>
                        <p className="text-sm text-amber-800 dark:text-amber-400/80 font-medium">{selectedLecture.notes}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Recording Status */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Resources</h4>
                  {selectedLecture.hasRecording ? (
                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors group">
                      <div className="flex items-center gap-3">
                        <PlayCircle className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                        <div className="text-left">
                          <div className="text-sm font-bold">Watch Recording</div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Available in vault</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                        <Video className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-700 dark:text-slate-300">No Recording</div>
                        <div className="text-[10px] font-semibold text-slate-500">{selectedLecture.status === "Completed" ? "Lecture was not recorded." : "Will be available after lecture."}</div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
