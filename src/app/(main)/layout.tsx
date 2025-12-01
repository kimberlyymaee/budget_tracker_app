"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { DashboardViewProvider } from "@/contexts/DashboardViewContext";

export default function MainLayout({ children }: { children: ReactNode }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <DashboardViewProvider>
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-transparent to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Header spans full width at the top */}
        <Header onToggleSidebar={() => setIsMobileSidebarOpen((open) => !open)} />
        
        {/* Add top padding so fixed header doesn't overlap content */}
        <div className="flex pt-16 md:pt-20">
          {/* Sidebar positioned below header */}
          <Sidebar
            isMobileOpen={isMobileSidebarOpen}
            setIsMobileOpen={setIsMobileSidebarOpen}
          />
          
          {/* Main content area with left padding for sidebar */}
          <main className="ml-0 flex flex-1 flex-col px-4 transition-all duration-300 md:ml-64 md:px-6">
            <div className="flex flex-1 flex-col w-full py-6 md:py-8">{children}</div>
          </main>
        </div>
      </div>
    </DashboardViewProvider>
  );
}

