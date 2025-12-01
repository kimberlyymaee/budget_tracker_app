"use client";

import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { DashboardViewProvider } from "@/contexts/DashboardViewContext";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardViewProvider>
      <div className="min-h-screen bg-slate-50">
        {/* Header spans full width at the top */}
        <Header />
        
        <div className="flex">
          {/* Sidebar positioned below header */}
          <Sidebar />
          
          {/* Main content area with left padding for sidebar */}
          <main className="ml-0 flex flex-1 flex-col px-4 transition-all duration-300 md:ml-64 md:px-6">
            <div className="flex flex-1 flex-col w-full py-6 md:py-8">{children}</div>
          </main>
        </div>
      </div>
    </DashboardViewProvider>
  );
}

