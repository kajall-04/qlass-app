"use client";

import { usePathname } from "next/navigation";
import { Sidebar, type NavSection } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/lib/utils";
import { Chatbot } from "@/components/chatbot/Chatbot";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import {
  LayoutDashboard, BookOpen, Layers, Video, FileText,
  ClipboardCheck, TrendingUp, CheckSquare, CalendarDays,
  Bell, User, Settings,
} from "lucide-react";

const studentNav: NavSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Academics",
    items: [
      { label: "My Classes", href: "/student/classes", icon: BookOpen },
      { label: "Subjects", href: "/student/subjects", icon: Layers },
      { label: "Lectures", href: "/student/lectures", icon: Video },
      { label: "Assignments", href: "/student/assignments", icon: FileText },
      { label: "DPP", href: "/student/dpp", icon: FileText },
      { label: "Tests", href: "/student/tests", icon: ClipboardCheck },
    ],
  },
  {
    title: "Progress",
    items: [
      { label: "Performance", href: "/student/performance", icon: TrendingUp },
      { label: "Attendance", href: "/student/attendance", icon: CheckSquare },
    ],
  },
  {
    title: "More",
    items: [
      { label: "Calendar", href: "/student/calendar", icon: CalendarDays },
      { label: "Notifications", href: "/student/notifications", icon: Bell },
      { label: "Profile", href: "/student/profile", icon: User },
      { label: "Settings", href: "/student/settings", icon: Settings },
    ],
  },
];

const pageTitles: Record<string, string> = {
  "/student/dashboard": "Dashboard",
  "/student/classes": "My Classes",
  "/student/subjects": "Subjects",
  "/student/lectures": "Lectures",
  "/student/assignments": "Assignments",
  "/student/dpp": "Daily Practice Problems",
  "/student/tests": "Tests & Results",
  "/student/performance": "Performance",
  "/student/attendance": "Attendance",
  "/student/calendar": "Calendar",
  "/student/notifications": "Notifications",
  "/student/profile": "Profile",
  "/student/settings": "Settings",
};

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { isChecking } = useAuthGuard("student");
  const pathname = usePathname();
  const collapsed = useSidebarStore((s) => s.collapsed);
  const title = pageTitles[pathname] || "Dashboard";

  if (isChecking) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120]">
      <Sidebar sections={studentNav} roleLabel="Student Portal" roleColor="bg-emerald-600" />
      <Topbar title={title} />
      <main className={cn("pt-16 min-h-screen transition-all duration-300", collapsed ? "lg:pl-[72px]" : "lg:pl-[260px]")}>
        <div className="p-4 sm:p-6 max-w-[1400px] mx-auto">{children}</div>
      </main>
      <Chatbot role="student" />
    </div>
  );
}
