"use client";

import { useState, useEffect } from "react";
import type { ExpenseCategory, Expense } from "@/lib/mockData";

const categories: ExpenseCategory[] = [
  "Food",
  "Transport",
  "Bills",
  "Entertainment",
];

type AddExpenseFormProps = {
  onSubmitted?: () => void;
  expense?: Expense | null;
  mode?: "add" | "edit";
};

export function AddExpenseForm({ 
  onSubmitted, 
  expense = null,
  mode = "add"
}: AddExpenseFormProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("Food");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10) // YYYY-MM-DD
  );
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (expense && mode === "edit") {
      setAmount(String(expense.amount));
      setCategory(expense.category);
      setDate(expense.date);
      setNotes(expense.notes || "");
    }
  }, [expense, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "edit" && expense) {
      console.log("Updated expense (mock only)", {
        id: expense.id,
        amount,
        category,
        date,
        notes,
      });
    } else {
      console.log("New expense (mock only)", {
        amount,
        category,
        date,
        notes,
      });
    }
    if (onSubmitted) onSubmitted();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-900">
            Amount (₱)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm shadow-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="0.00"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-900">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm shadow-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-900">
            Date
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm shadow-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label className="block text-sm font-semibold text-slate-900">
            Notes
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm shadow-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="Optional details (e.g., where you spent, purpose)"
          />
        </div>
      </div>
      <div className="flex justify-end pt-1">
        <button
          type="submit"
          className="rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1"
        >
          {mode === "edit" ? "Update expense" : "Save expense"}
        </button>
      </div>
    </form>
  );
}


