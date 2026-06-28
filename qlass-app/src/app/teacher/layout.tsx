"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/teacher/layout/Sidebar";
import { Topbar } from "@/components/layout/topbar";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  "/teacher/dashboard": "Dashboard",
  "/teacher/calendar": "Calendar",
  "/teacher/classes": "My Classes",
  "/teacher/students": "Students",
  "/teacher/attendance": "Attendance",
  "/teacher/lectures": "Lectures",
  "/teacher/dpp": "Daily Practice Problems",
  "/teacher/tests": "Tests & Results",
  "/teacher/announcements": "Announcements",
  "/teacher/messages": "Messages",
  "/teacher/profile": "Profile",
  "/teacher/settings": "Settings",
};

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const collapsed = useSidebarStore((s) => s.collapsed);
  const title = pageTitles[pathname] || "Dashboard";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-[#0B1120]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-blue-600 animate-pulse"></div>
          <p className="text-sm font-medium text-slate-500">Loading QLASS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120]">
      <Sidebar />
      <Topbar title={title} />
      <main className={cn("pt-16 min-h-screen transition-all duration-300", collapsed ? "lg:pl-[72px]" : "lg:pl-[260px]")}>
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          {children}
        </div>
      </main>
    </div>
  );
}
