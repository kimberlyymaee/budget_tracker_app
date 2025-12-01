"use client";

import { AddExpenseForm } from "@/components/AddExpenseForm";

export default function AddExpensePage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Add expense</h1>
        <p className="mt-1 text-sm text-slate-500">
          This form is for UI demonstration only. Submitting will log the values
          in the browser console.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <AddExpenseForm />
      </div>
    </div>
  );
}


