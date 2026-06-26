"use client";

import { usePathname } from "next/navigation";
import { Sidebar, type NavSection } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/lib/utils";
import { Chatbot } from "@/components/chatbot/Chatbot";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import {
  LayoutDashboard, BookOpen, Users, GraduationCap, Video,
  FileText, ClipboardCheck, BarChart3, Brain, Bell,
  Settings, CalendarDays, Megaphone, FlaskConical, LineChart,
} from "lucide-react";

const adminNav: NavSection[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Classes", href: "/admin/classes", icon: BookOpen, badge: "6" },
      { label: "Students", href: "/admin/students", icon: Users },
      { label: "Teachers", href: "/admin/teachers", icon: GraduationCap },
    ],
  },
  {
    title: "Academics",
    items: [
      { label: "Lesson Plan", href: "/admin/lesson-plan", icon: BookOpen }, // Assuming there's a Lesson Plan placeholder as well, but wait, the mockup has it. Let me just add Classroom Audit.
      { label: "Classroom Audit", href: "/admin/classroom-audit", icon: ClipboardCheck },
      { label: "DPP", href: "/admin/dpp", icon: FileText, badge: "45" },
      { label: "Tests", href: "/admin/tests", icon: ClipboardCheck },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { label: "Reports", href: "/admin/reports", icon: BarChart3 },
      { label: "Analytics", href: "/admin/analytics", icon: LineChart },
      { label: "AI Insights", href: "/admin/ai-insights", icon: Brain },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
      { label: "Calendar", href: "/admin/calendar", icon: CalendarDays },
      { label: "Notifications", href: "/admin/notifications", icon: Bell, badge: "2" },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/classes": "Classes",
  "/admin/students": "Students",
  "/admin/teachers": "Teachers",
  "/admin/dpp": "Daily Practice Problems",
  "/admin/tests": "Tests & Examinations",
  "/admin/reports": "Reports",
  "/admin/analytics": "Analytics",
  "/admin/ai-insights": "AI Insights",
  "/admin/announcements": "Announcements",
  "/admin/calendar": "Calendar",
  "/admin/notifications": "Notifications",
  "/admin/settings": "Settings",
  "/admin/profile": "Profile",
  "/admin/classroom-audit": "Classroom Audit",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isChecking } = useAuthGuard("admin");
  const pathname = usePathname();
  const collapsed = useSidebarStore((s) => s.collapsed);
  const title = pageTitles[pathname] || "Dashboard";

  if (isChecking) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120]">
      <Sidebar sections={adminNav} roleLabel="Admin Portal" roleColor="bg-blue-600" />
      <Topbar title={title} />
      <main
        className={cn(
          "pt-16 min-h-screen transition-all duration-300",
          collapsed ? "lg:pl-[72px]" : "lg:pl-[260px]"
        )}
      >
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
      <Chatbot role="admin" />
    </div>
  );
}
