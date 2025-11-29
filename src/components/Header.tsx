"use client";

import { usePathname } from "next/navigation";
import { mockUser } from "@/lib/mockData";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/expenses": "All Expenses",
  "/settings": "Settings",
};

export function Header() {
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] || "Dashboard";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="flex items-center">
        {/* Left side - Branding aligned with sidebar */}
        <div className="hidden w-64 items-center gap-3 border-r border-slate-200 px-6 py-4 md:flex">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-teal-500 to-blue-500 text-base font-semibold text-white shadow-sm">
            ₱
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight text-slate-900">
              PH Expense Tracker
            </div>
            <div className="text-[10px] text-slate-500">
              Mock UI • Ready for Supabase
            </div>
          </div>
        </div>

        {/* Right side - Page title, search, and user info */}
        <div className="flex flex-1 items-center justify-between gap-4 px-4 py-4 md:px-6">
          {/* Page Title */}
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">
              {pageTitle}
            </h1>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3">
            {/* Search button/icon - placeholder for future */}
            <button
              className="hidden rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm transition-colors hover:bg-slate-50 md:flex md:items-center md:gap-2"
              aria-label="Search"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden lg:inline">Search...</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

