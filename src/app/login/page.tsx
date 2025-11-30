"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for future Supabase auth
    console.log("Login submitted", { email, password });
    // Mock successful login: send user to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-sky-50 via-transparent to-slate-50">
      {/* Animated background elements - floating gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Subtle geometric pattern background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="geometric-pattern-login" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="none" stroke="#06b6d4" strokeWidth="0.5" opacity="0.3" />
              <path d="M0 30 L60 30" stroke="#14b8a6" strokeWidth="0.5" opacity="0.2" />
              <path d="M30 0 L30 60" stroke="#14b8a6" strokeWidth="0.5" opacity="0.2" />
              <path d="M0 0 L60 60" stroke="#06b6d4" strokeWidth="0.5" opacity="0.15" />
              <path d="M60 0 L0 60" stroke="#06b6d4" strokeWidth="0.5" opacity="0.15" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geometric-pattern-login)" />
        </svg>
        
        {/* Additional geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-cyan-300/20 rounded-lg rotate-45"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 border border-teal-300/20 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-blue-300/20 rounded-lg rotate-12"></div>
      </div>

      {/* Floating peso (₱) symbols with bounce animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-8xl text-cyan-400/10 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>₱</div>
        <div className="absolute top-40 right-20 text-7xl text-teal-400/10 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.5s' }}>₱</div>
        <div className="absolute bottom-20 left-1/4 text-8xl text-blue-400/10 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>₱</div>
        <div className="absolute top-1/3 right-1/3 text-6xl text-cyan-400/10 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '2.8s' }}>₱</div>
        <div className="absolute bottom-1/3 right-1/4 text-7xl text-teal-400/10 animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '3.2s' }}>₱</div>
        <div className="absolute top-1/2 left-1/5 text-6xl text-blue-400/10 animate-bounce" style={{ animationDelay: '1.8s', animationDuration: '2.8s' }}>₱</div>
      </div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-md px-7 py-8 shadow-[var(--shadow-soft)]">
        <div className="mb-6 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Philippine Peso
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Sign in to your dashboard
          </h1>
          <p className="text-sm text-slate-600">
            Track food, transport, bills, and more — all in one clean view.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-800">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm shadow-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-800">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm shadow-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="mt-3 w-full rounded-full bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-transform duration-150 hover:-translate-y-[1px] hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1"
          >
            Login
          </button>
        </form>
        <p className="mt-5 text-xs text-slate-500 text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-cyan-700 hover:text-cyan-800"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}


