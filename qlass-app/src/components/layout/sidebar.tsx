"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/lib/utils";
import { ChevronLeft, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  sections: NavSection[];
  roleLabel: string;
  roleColor?: string;
}

export function Sidebar({ sections, roleLabel, roleColor = "bg-blue-600" }: SidebarProps) {
  const pathname = usePathname();
  const { collapsed, mobileOpen, toggle, setMobileOpen } = useSidebarStore();
  
  // Force full width on mobile regardless of desktop collapsed state
  const isCollapsed = collapsed && !mobileOpen;

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full z-50 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300",
          isCollapsed ? "w-[72px]" : "w-[260px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className={cn("flex items-center gap-3 px-5 h-16 border-b border-slate-100 dark:border-slate-800 shrink-0", isCollapsed && "justify-center px-0")}>
          <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", roleColor)}>
            <span className="text-white font-extrabold text-base">Q</span>
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <div className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Qlass</div>
              <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">{roleLabel}</div>
            </div>
          )}
          {/* Close button (mobile) */}
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto lg:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {sections.map((section) => (
            <div key={section.title}>
              {!isCollapsed && (
                <div className="px-3 mb-2 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  {section.title}
                </div>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                        isCollapsed ? "justify-center p-3" : "px-3 py-2.5",
                        isActive
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <Icon className={cn("w-[18px] h-[18px] shrink-0", isActive && "text-blue-600 dark:text-blue-400")} />
                      {!isCollapsed && (
                        <>
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto text-[11px] font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2.5 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-700 text-white text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg">
                          {item.label}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse toggle (desktop) */}
        <div className="hidden lg:flex items-center justify-center border-t border-slate-100 dark:border-slate-800 p-3">
          <button
            onClick={toggle}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform duration-300", isCollapsed && "rotate-180")} />
          </button>
        </div>
      </aside>
    </>
  );
}
