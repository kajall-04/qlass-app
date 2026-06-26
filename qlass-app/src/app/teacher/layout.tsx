"use client";

import { usePathname } from "next/navigation";
import { Sidebar, type NavSection } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/lib/utils";
import { Chatbot } from "@/components/chatbot/Chatbot";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import {
  LayoutDashboard, BookOpen, Users, CheckSquare, Video,
  FileText, ClipboardCheck, Megaphone, CalendarDays, MessageSquare,
  User, Settings, LogOut,
} from "lucide-react";

const teacherNav: NavSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Teaching",
    items: [
      { label: "My Classes", href: "/teacher/classes", icon: BookOpen },
      { label: "My Students", href: "/teacher/students", icon: Users },
      { label: "Attendance", href: "/teacher/attendance", icon: CheckSquare },
      { label: "Lectures", href: "/teacher/lectures", icon: Video },
      { label: "DPP", href: "/teacher/dpp", icon: FileText },
      { label: "Tests", href: "/teacher/tests", icon: ClipboardCheck },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Announcements", href: "/teacher/announcements", icon: Megaphone },
      { label: "Calendar", href: "/teacher/calendar", icon: CalendarDays },
      { label: "Messages", href: "/teacher/messages", icon: MessageSquare },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Profile", href: "/teacher/profile", icon: User },
      { label: "Settings", href: "/teacher/settings", icon: Settings },
    ],
  },
];

const pageTitles: Record<string, string> = {
  "/teacher/dashboard": "Dashboard",
  "/teacher/classes": "My Classes",
  "/teacher/students": "My Students",
  "/teacher/attendance": "Attendance",
  "/teacher/lectures": "Lectures",
  "/teacher/dpp": "Daily Practice Problems",
  "/teacher/tests": "Tests",
  "/teacher/announcements": "Announcements",
  "/teacher/calendar": "Calendar",
  "/teacher/messages": "Messages",
  "/teacher/profile": "Profile",
  "/teacher/settings": "Settings",
};

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { isChecking } = useAuthGuard("teacher");
  const pathname = usePathname();
  const collapsed = useSidebarStore((s) => s.collapsed);
  const title = pageTitles[pathname] || "Dashboard";

  if (isChecking) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120]">
      <Sidebar sections={teacherNav} roleLabel="Teacher Portal" roleColor="bg-violet-600" />
      <Topbar title={title} />
      <main className={cn("pt-16 min-h-screen transition-all duration-300", collapsed ? "lg:pl-[72px]" : "lg:pl-[260px]")}>
        <div className="p-4 sm:p-6 max-w-[1400px] mx-auto">{children}</div>
      </main>
      <Chatbot role="teacher" />
    </div>
  );
}
