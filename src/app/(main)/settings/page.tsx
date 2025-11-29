"use client";

import { useState } from "react";
import { mockUser, peso } from "@/lib/mockData";

export default function SettingsPage() {
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [budget, setBudget] = useState(String(mockUser.monthlyBudget));
  const [status, setStatus] = useState<"idle" | "saved">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Settings updated (mock only)", {
      name,
      email,
      monthlyBudget: budget,
    });
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Description Section */}
      <div>
        <p className="text-sm text-slate-600">
          Update your basic profile details and preferred monthly budget. Data
          is currently mocked and ready for a Supabase connection.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[var(--shadow-soft)] sm:p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">
              Monthly budget (₱)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              required
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
            <p className="mt-1 text-xs text-slate-500">
              Current mock budget: {peso(mockUser.monthlyBudget)}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="submit"
            className="rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1"
          >
            Save settings
          </button>
          {status === "saved" && (
            <p className="text-xs text-emerald-600">
              Saved (mock). Ready for backend.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}


