"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CheckSquare,
  Video,
  FileText,
  ClipboardList,
  CalendarDays,
  Megaphone,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  GraduationCap,
  User,
} from "lucide-react";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Main",
    items: [
      { name: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
      { name: "Calendar", href: "/teacher/calendar", icon: CalendarDays },
    ],
  },
  {
    label: "Academics",
    items: [
      { name: "My Classes", href: "/teacher/classes", icon: BookOpen },
      { name: "Students", href: "/teacher/students", icon: GraduationCap },
      { name: "Attendance", href: "/teacher/attendance", icon: CheckSquare },
      { name: "Lectures", href: "/teacher/lectures", icon: Video },
    ],
  },
  {
    label: "Assessment",
    items: [
      { name: "DPP", href: "/teacher/dpp", icon: FileText, badge: 12 },
      { name: "Tests", href: "/teacher/tests", icon: ClipboardList },
    ],
  },
  {
    label: "Communication",
    items: [
      { name: "Announcements", href: "/teacher/announcements", icon: Megaphone },
      { name: "Messages", href: "/teacher/messages", icon: MessageSquare, badge: 3 },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed: sidebarCollapsed, toggle: toggleSidebar } = useSidebarStore();

  return (
    <motion.aside
      initial={false}
      animate={{
        width: sidebarCollapsed ? "var(--sidebar-collapsed, 72px)" : "var(--sidebar-width, 260px)",
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed left-0 top-0 z-40 h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex flex-col border-r border-slate-200 dark:border-slate-800"
    >
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800">
        <AnimatePresence mode="wait">
          {!sidebarCollapsed ? (
            <motion.div
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">Q</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base leading-none text-slate-900 dark:text-white">Qlass</span>
                <span className="text-[9px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase mt-0.5">Teacher Portal</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex justify-center"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">Q</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all absolute -right-3 top-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm z-50"
        >
          <motion.div
            animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft size={14} />
          </motion.div>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto custom-scrollbar py-3 px-2.5 flex flex-col gap-0.5">
        {navGroups.map((group, gi) => (
          <div key={group.label}>
            {/* Section Label */}
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-3 pt-4 pb-1.5"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">
                  {group.label}
                </span>
              </motion.div>
            )}
            {sidebarCollapsed && gi > 0 && (
              <div className="mx-3 my-2 h-px bg-slate-100 dark:bg-slate-800" />
            )}

            {group.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  title={sidebarCollapsed ? item.name : ""}
                  className={cn(
                    "group relative flex items-center px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 my-0.5",
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200",
                    sidebarCollapsed ? "justify-center" : ""
                  )}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-600 dark:bg-blue-500 rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <item.icon
                    className={cn(
                      "flex-shrink-0 transition-all duration-200",
                      sidebarCollapsed ? "h-5 w-5" : "mr-2.5 h-[18px] w-[18px]",
                      isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && item.badge > 0 && (
                        <span className="ml-auto bg-red-500/90 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {sidebarCollapsed && item.badge && item.badge > 0 && (
                    <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500 border border-white dark:border-slate-900" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-0.5">
        <Link
          href="/teacher/profile"
          className={cn(
            "group flex items-center px-3 py-2 text-[13px] font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 transition-all",
            sidebarCollapsed ? "justify-center" : "",
            pathname === "/teacher/profile" ? "bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 font-semibold" : ""
          )}
          title={sidebarCollapsed ? "Profile" : ""}
        >
          <User
            className={cn("flex-shrink-0 transition-all", sidebarCollapsed ? "h-5 w-5" : "mr-2.5 h-[18px] w-[18px]", "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300")}
          />
          {!sidebarCollapsed && <span>Profile</span>}
        </Link>
        <Link
          href="/teacher/settings"
          className={cn(
            "group flex items-center px-3 py-2 text-[13px] font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 transition-all",
            sidebarCollapsed ? "justify-center" : "",
            pathname === "/teacher/settings" ? "bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 font-semibold" : ""
          )}
          title={sidebarCollapsed ? "Settings" : ""}
        >
          <Settings
            className={cn("flex-shrink-0 transition-all", sidebarCollapsed ? "h-5 w-5" : "mr-2.5 h-[18px] w-[18px]", "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300")}
          />
          {!sidebarCollapsed && <span>Settings</span>}
        </Link>
        <button
          className={cn(
            "w-full group flex items-center px-3 py-2 text-[13px] font-medium rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 dark:hover:text-red-400 transition-all",
            sidebarCollapsed ? "justify-center" : ""
          )}
          title={sidebarCollapsed ? "Logout" : ""}
        >
          <LogOut className={cn("flex-shrink-0", sidebarCollapsed ? "h-5 w-5" : "mr-2.5 h-[18px] w-[18px]")} />
          {!sidebarCollapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
