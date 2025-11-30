"use client";

import { useState } from "react";
import { AddExpenseForm } from "@/components/AddExpenseForm";
import {
  CategoryPieChart,
  prepareCategoryData,
} from "@/components/CategoryPieChart";
import { MonthlyExpenseChartCard } from "@/components/MonthlyExpenseLineChart";
import { mockExpenses, mockUser, peso } from "@/lib/mockData";

function getCurrentMonthExpenses() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  return mockExpenses.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });
}

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentMonthExpenses = getCurrentMonthExpenses();
  const totalThisMonth = currentMonthExpenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  const byCategory = currentMonthExpenses.reduce<Record<string, number>>(
    (acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + e.amount;
      return acc;
    },
    {}
  );

  const recent = [...mockExpenses]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5);

  const categoryChartData = prepareCategoryData(byCategory, mockUser.categorySettings);

  // Calculate additional metrics
  const remainingBudget = Math.max(0, mockUser.monthlyBudget - totalThisMonth);
  const budgetPercentage = (totalThisMonth / mockUser.monthlyBudget) * 100;
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const currentDay = now.getDate();
  const averageDailySpending = currentDay > 0 ? totalThisMonth / currentDay : 0;
  const projectedMonthlySpending = averageDailySpending * daysInMonth;
  
  const topCategory = categoryChartData.length > 0 
    ? categoryChartData[0] 
    : null;

  return (
    <div className="space-y-7">
      {/* Description Section */}
      <div>
        <p className="text-sm text-slate-600">
          A focused snapshot of your Philippine Peso spending this month — stay
          on top of food, bills, transport, and more at a glance.
        </p>
      </div>

      {/* Additional Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Remaining Budget Card */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Remaining Budget
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {peso(remainingBudget)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {budgetPercentage.toFixed(1)}% used
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
              <svg
                className="h-6 w-6 text-emerald-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Average Daily Spending Card */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Avg Daily Spending
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {peso(averageDailySpending)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Projected: {peso(projectedMonthlySpending)}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Top Category Card */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Top Category
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {topCategory ? topCategory.category : "—"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {topCategory ? peso(topCategory.amount) : "No data"}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <svg
                className="h-6 w-6 text-amber-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Transactions Card */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Total Transactions
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {currentMonthExpenses.length}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                This month
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <svg
                className="h-6 w-6 text-purple-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Total Expense Card */}
      <div className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Total spent this month
            </p>
            <p className="mt-1 text-3xl font-semibold text-slate-900">
              {peso(totalThisMonth)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Budget:{" "}
              <span className="font-medium text-slate-800">
                {peso(mockUser.monthlyBudget)}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform duration-150 hover:-translate-y-[1px] hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1"
          >
            + Add expense
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <section className="md:col-span-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-[var(--shadow-soft)] sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              Recent expenses
            </h2>
            <span className="text-xs text-slate-500">
              Last {recent.length} transactions
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white/80">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2.5">Date</th>
                  <th className="px-4 py-2.5">Category</th>
                  <th className="px-4 py-2.5">Notes</th>
                  <th className="px-4 py-2.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recent.map((e) => (
                  <tr
                    key={e.id}
                    className="transition-colors hover:bg-slate-50/80"
                  >
                    <td className="px-4 py-3 text-slate-500">
                      {new Date(e.date).toLocaleDateString("en-PH", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {e.category}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {e.notes || <span className="text-slate-400">—</span>}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900">
                      {peso(e.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="md:col-span-2 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-[var(--shadow-soft)] sm:p-5">
          <h2 className="mb-4 text-sm font-semibold tracking-tight text-slate-900">
            This month by category
          </h2>
          {categoryChartData.length === 0 ? (
            <p className="text-sm text-slate-500">
              No expenses recorded for this month in mock data.
            </p>
          ) : (
            <div className="space-y-4">
              <CategoryPieChart data={categoryChartData} total={totalThisMonth} />
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                {categoryChartData.map((item) => (
                  <div
                    key={item.category}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium text-slate-700">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-semibold text-slate-900">
                      {peso(item.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Monthly Expense Chart */}
      <MonthlyExpenseChartCard expenses={mockExpenses} year={2025} />

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
    </div>
  );
}


