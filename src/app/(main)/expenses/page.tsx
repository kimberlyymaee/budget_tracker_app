"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  
  // Year and month filters
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");

  // Get available years (2023-2025)
  const availableYears = useMemo(() => {
    return [2025, 2024, 2023];
  }, []);

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const filteredAndSortedExpenses = useMemo(() => {
    let filtered = [...mockExpenses];
    
    // Filter by year and month
    filtered = filtered.filter((e) => {
      const expenseDate = new Date(e.date);
      const yearMatch = selectedYear === "all" || expenseDate.getFullYear() === parseInt(selectedYear);
      const monthMatch = selectedMonth === "all" || expenseDate.getMonth() + 1 === parseInt(selectedMonth);
      return yearMatch && monthMatch;
    });
    
    // Sort
    return filtered.sort((a, b) => {
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
  }, [sortKey, sortDir, selectedYear, selectedMonth]);

  // Reset to first page whenever filters or sorting change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortKey, sortDir, selectedYear, selectedMonth]);

  // Pagination calculations
  const rowsPerPage = 10;
  const totalPages =
    filteredAndSortedExpenses.length === 0
      ? 1
      : Math.ceil(filteredAndSortedExpenses.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(
    startIndex + rowsPerPage,
    filteredAndSortedExpenses.length
  );
  const paginatedExpenses = filteredAndSortedExpenses.slice(
    startIndex,
    endIndex
  );

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

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}-${day}-${year}`;
  };

  return (
    <div className="flex flex-col space-y-5 w-full">
      {/* Filter Section */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-900 shadow-sm transition-all duration-200 hover:border-cyan-400 hover:shadow-md focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 cursor-pointer"
            >
              <option value="all">All Years</option>
              {availableYears.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="appearance-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-900 shadow-sm transition-all duration-200 hover:border-cyan-400 hover:shadow-md focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 cursor-pointer"
            >
              <option value="all">All Months</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 hover:from-cyan-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add expense
        </button>
      </div>

      <div className="flex-1 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-soft)]">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                  Notes
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAndSortedExpenses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">
                    No expenses found for the selected period.
                  </td>
                </tr>
              ) : (
              paginatedExpenses.map((e) => (
                  <tr
                    key={e.id}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    <td className="px-4 py-3 text-sm text-slate-900">
                      {formatDateTime(e.date)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-800">{e.category}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                      {peso(e.amount)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        {filteredAndSortedExpenses.length > 0 && (
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-4 py-2.5 text-xs text-slate-600">
            <span>
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {startIndex + 1}
              </span>{" "}
              –{" "}
              <span className="font-semibold text-slate-800">
                {endIndex}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {filteredAndSortedExpenses.length}
              </span>{" "}
              expenses
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.max(1, page - 1))
                }
                disabled={currentPage === 1}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-50 hover:border-cyan-400 hover:text-cyan-700 hover:shadow-md"
              >
                Previous
              </button>
              <span className="text-[11px] text-slate-500">
                Page{" "}
                <span className="font-semibold text-slate-800">
                  {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-800">
                  {totalPages}
                </span>
              </span>
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
                disabled={currentPage === totalPages}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-50 hover:border-cyan-400 hover:text-cyan-700 hover:shadow-md"
              >
                Next
              </button>
            </div>
          </div>
        )}
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


