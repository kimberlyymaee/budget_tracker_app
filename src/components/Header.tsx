"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { mockUser } from "@/lib/mockData";
import { Logo } from "@/components/Logo";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/expenses": "All Expenses",
  "/settings": "Settings",
};

type HeaderProps = {
  onToggleSidebar?: () => void;
};

export function Header({ onToggleSidebar }: HeaderProps) {
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] || "Dashboard";
  const router = useRouter();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/expenses?query=${encodeURIComponent(searchTerm.trim())}`);
    setSearchOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="flex w-full items-center">
        {/* Left side - Branding aligned with sidebar */}
        <div className="hidden w-64 items-center border-r border-slate-200 px-6 py-4 md:flex">
          <Logo />
        </div>

        {/* Right side - Page title and search */}
        <div className="flex flex-1 items-center justify-between gap-3 px-3 py-3 sm:gap-4 sm:px-4 md:px-6 md:py-4">
          {/* Left: mobile menu button + Page Title */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger inside header */}
            <button
              type="button"
              onClick={onToggleSidebar}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-800 md:hidden"
              aria-label="Toggle navigation"
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
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">
              {pageTitle}
            </h1>
          </div>

          {/* Right: search */}
          <div className="flex flex-1 items-center justify-end gap-2">
            {searchOpen ? (
              <form
                onSubmit={handleSearchSubmit}
                className="flex w-full max-w-xs items-center gap-2 sm:max-w-sm"
              >
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                    <svg
                      className="h-3.5 w-3.5 text-slate-400"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                    placeholder="Search expenses…"
                    className="w-full rounded-full border border-slate-200 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchTerm("");
                  }}
                  className="text-xs font-medium text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700 md:h-9 md:w-auto md:px-3 md:gap-2"
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
                <span className="hidden text-xs font-medium text-slate-600 md:inline">
                  Search
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

