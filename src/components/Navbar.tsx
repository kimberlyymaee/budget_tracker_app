"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/expenses", label: "Expenses" },
  { href: "/settings", label: "Settings" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-teal-500 to-blue-500 text-sm font-semibold text-white shadow-sm">
            ₱
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight text-slate-900">
              PH Expense Tracker
            </div>
            <div className="text-[11px] text-slate-500">
              Mock UI • Ready for Supabase
            </div>
          </div>
        </div>
        <nav className="hidden items-center gap-4 text-sm font-medium text-slate-600 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-xs transition-all duration-150 ${
                  active
                    ? "bg-cyan-50 text-cyan-700 shadow-[0_0_0_1px_rgba(34,211,238,0.35)]"
                    : "hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/login"
            className="ml-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            Logout
          </Link>
        </nav>
      </div>
    </header>
  );
}


