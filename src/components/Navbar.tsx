\"use client\";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { AuthLoadingScreen } from "@/components/AuthLoadingScreen";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/expenses", label: "Expenses" },
  { href: "/settings", label: "Settings" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      {isAuthLoading && <AuthLoadingScreen mode="logout" />}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Logo />
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
          <button
            type="button"
            onClick={() => setIsLogoutOpen(true)}
            className="ml-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            Logout
          </button>
        </nav>
      </div>

      <ConfirmDialog
        open={isLogoutOpen}
        title="Log out?"
        description="You will be redirected to the landing page. This is a demo app, so your mock data will remain unchanged."
        confirmLabel="Log out"
        cancelLabel="Cancel"
        onCancel={() => setIsLogoutOpen(false)}
        onConfirm={() => {
          setIsLogoutOpen(false);
          setIsAuthLoading(true);
          router.push("/");
        }}
      />
    </header>
  );
}


