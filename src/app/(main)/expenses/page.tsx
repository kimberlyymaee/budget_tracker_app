"use client";

import { useMemo, useState } from "react";
import { AddExpenseForm } from "@/components/AddExpenseForm";
import { mockExpenses, peso, type Expense } from "@/lib/mockData";

type SortKey = "date" | "category" | "amount";

export default function ExpensesPage() {
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const sortedExpenses = useMemo(() => {
    return [...mockExpenses].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "amount") {
        cmp = a.amount - b.amount;
      } else if (sortKey === "date") {
        cmp = a.date.localeCompare(b.date);
      } else {
        cmp = a.category.localeCompare(b.category);
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortIcon = (key: SortKey) => {
    if (key !== sortKey) return "↕";
    return sortDir === "asc" ? "↑" : "↓";
  };

  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleDelete = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedExpense) {
      console.log("Deleted expense (mock only)", {
        id: selectedExpense.id,
        amount: selectedExpense.amount,
        category: selectedExpense.category,
      });
      setIsDeleteModalOpen(false);
      setSelectedExpense(null);
    }
  };

  return (
    <div className="flex flex-col space-y-5 w-full">
      {/* Description Section */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Review every transaction in one place. Sorting and actions are ready
          to be wired to your database.
        </p>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform duration-150 hover:-translate-y-[1px] hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1"
        >
          + Add expense
        </button>
      </div>

      <div className="flex-1 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-[var(--shadow-soft)]">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 text-center">
                  <button
                    className="flex items-center justify-center gap-1 hover:text-slate-700"
                    onClick={() => toggleSort("date")}
                  >
                    Date <span className="text-[10px]">{sortIcon("date")}</span>
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center gap-1 hover:text-slate-700"
                    onClick={() => toggleSort("category")}
                  >
                    Category{" "}
                    <span className="text-[10px]">{sortIcon("category")}</span>
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center gap-1 hover:text-slate-700"
                    onClick={() => toggleSort("amount")}
                  >
                    Amount{" "}
                    <span className="text-[10px]">{sortIcon("amount")}</span>
                  </button>
                </th>
                <th className="px-4 py-3 text-left">Notes</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedExpenses.map((e) => (
                <tr
                  key={e.id}
                  className="transition-colors hover:bg-slate-50/80"
                >
                  <td className="px-4 py-3 text-center font-medium text-slate-900">
                    {new Date(e.date).toLocaleDateString("en-PH", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-left text-slate-800">{e.category}</td>
                  <td className="px-4 py-3 text-left font-semibold text-slate-900">
                    {peso(e.amount)}
                  </td>
                  <td className="px-4 py-3 text-left text-slate-600">
                    {e.notes || <span className="text-slate-400">—</span>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(e)}
                        className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(e)}
                        className="rounded-md border border-rose-200 px-2 py-1 text-xs text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-4 shadow-lg sm:p-6">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                Add expense
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="mb-4 text-sm text-slate-600">
              This will log a mock expense in the console. Connect to Supabase
              later to save it.
            </p>
            <AddExpenseForm onSubmitted={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Edit Expense Modal */}
      {isEditModalOpen && selectedExpense && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-4 shadow-lg sm:p-6">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                Edit expense
              </h2>
              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedExpense(null);
                }}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="mb-4 text-sm text-slate-600">
              Update the expense details. This will log to the console. Connect
              to Supabase later to persist changes.
            </p>
            <AddExpenseForm
              mode="edit"
              expense={selectedExpense}
              onSubmitted={() => {
                setIsEditModalOpen(false);
                setSelectedExpense(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedExpense && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-lg sm:p-6">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                Delete expense
              </h2>
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedExpense(null);
                }}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="mb-6">
              <p className="mb-4 text-sm text-slate-600">
                Are you sure you want to delete this expense? This action cannot
                be undone.
              </p>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500">
                    Category
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {selectedExpense.category}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500">
                    Amount
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {peso(selectedExpense.amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Date
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {new Date(selectedExpense.date).toLocaleDateString("en-PH", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedExpense(null);
                }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1"
              >
                Delete expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


