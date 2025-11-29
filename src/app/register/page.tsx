"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for future Supabase registration
    console.log("Register submitted", { email, password, confirmPassword });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-50 via-transparent to-slate-50">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/90 px-7 py-8 shadow-[var(--shadow-soft)] backdrop-blur">
        <div className="mb-6 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Philippine Peso
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Create your free account
          </h1>
          <p className="text-sm text-slate-600">
            Set up your tracker and start logging expenses in a few seconds.
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
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-800">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm shadow-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="mt-3 w-full rounded-full bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-transform duration-150 hover:-translate-y-[1px] hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1"
          >
            Register
          </button>
        </form>
        <p className="mt-5 text-xs text-slate-500 text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-cyan-700 hover:text-cyan-800"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}


