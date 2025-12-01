"use client";

import { useState, useMemo } from "react";
import { AddExpenseForm } from "@/components/AddExpenseForm";
import {
  CategoryPieChart,
  prepareCategoryData,
} from "@/components/CategoryPieChart";
import { MonthlyExpenseChartCard } from "@/components/MonthlyExpenseLineChart";
import { mockExpenses, mockUser, peso } from "@/lib/mockData";
import { useDashboardView } from "@/contexts/DashboardViewContext";

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
  const { view: dashboardView } = useDashboardView();
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear().toString());
  
  // Category chart filters
  const [categoryChartYear, setCategoryChartYear] = useState(currentDate.getFullYear().toString());
  const [categoryChartMonth, setCategoryChartMonth] = useState((currentDate.getMonth() + 1).toString());

  // Get available years (2023-2025)
  const availableYears = useMemo(() => {
    return [2025, 2024, 2023];
  }, []);

  const months = [
    { value: "all", label: "All Months" },
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

  const currentMonthExpenses = getCurrentMonthExpenses();
  
  // Filter expenses for category chart by selected month and year
  const categoryChartExpenses = useMemo(() => {
    return mockExpenses.filter((e) => {
      const expenseDate = new Date(e.date);
      const yearMatch = categoryChartYear === "all" || expenseDate.getFullYear() === parseInt(categoryChartYear);
      const monthMatch = categoryChartMonth === "all" || expenseDate.getMonth() + 1 === parseInt(categoryChartMonth);
      return yearMatch && monthMatch;
    });
  }, [categoryChartYear, categoryChartMonth]);
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

  // Category chart data based on filtered expenses
  const categoryChartByCategory = categoryChartExpenses.reduce<Record<string, number>>(
    (acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + e.amount;
      return acc;
    },
    {}
  );
  
  const categoryChartTotal = categoryChartExpenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  const recent = [...mockExpenses]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5);

  const categoryChartData = prepareCategoryData(categoryChartByCategory, mockUser.categorySettings);
  
  // Get month name for display
  const selectedMonthName = categoryChartMonth === "all" 
    ? "All Months" 
    : months.find(m => m.value === categoryChartMonth)?.label || "";

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
    <div className="space-y-7 px-4 sm:px-6 w-full max-w-full mx-auto">
      {/* Description Section */}
      <div>
        <p className="text-sm text-slate-600">
          A focused snapshot of your Philippine Peso spending this month — stay
          on top of food, bills, transport, and more at a glance.
        </p>
      </div>

      {/* Additional Stats Cards */}
      <div className="grid w-full max-w-full grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Remaining Budget Card */}
        <div className="w-full max-w-full rounded-2xl border border-slate-200 bg-white/80 px-2.5 py-3 shadow-[var(--shadow-soft)] sm:px-4 sm:py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Remaining Budget
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">
                {peso(remainingBudget)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {budgetPercentage.toFixed(1)}% used
              </p>
            </div>
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
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
        <div className="w-full max-w-full rounded-2xl border border-slate-200 bg-white/80 px-2.5 py-3 shadow-[var(--shadow-soft)] sm:px-4 sm:py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Avg Daily Spending
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">
                {peso(averageDailySpending)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Projected: {peso(projectedMonthlySpending)}
              </p>
            </div>
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
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
        <div className="w-full max-w-full rounded-2xl border border-slate-200 bg-white/80 px-2.5 py-3 shadow-[var(--shadow-soft)] sm:px-4 sm:py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Top Category
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">
                {topCategory ? topCategory.category : "—"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {topCategory ? peso(topCategory.amount) : "No data"}
              </p>
            </div>
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
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
        <div className="w-full max-w-full rounded-2xl border border-slate-200 bg-white/80 px-2.5 py-3 shadow-[var(--shadow-soft)] sm:px-4 sm:py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Total Transactions
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">
                {currentMonthExpenses.length}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                This month
              </p>
            </div>
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
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
      <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 shadow-[var(--shadow-soft)] sm:px-5">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Total spent this month
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
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

        <section className="md:col-span-2 rounded-3xl border border-slate-200/80 bg-gradient-to-br from-sky-50 via-white to-cyan-50/60 p-[1.5px] shadow-[0_24px_60px_rgba(8,145,178,0.22)] dark:border-slate-700/80 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950/20 dark:shadow-[0_28px_80px_rgba(8,145,178,0.45)]">
          <div className="h-full w-full rounded-2xl bg-white/90 p-4 sm:p-5 dark:bg-slate-900/90">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
            <h2 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Expenses by category
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              See how your spending is distributed across categories.
            </p>
            </div>
            <div className="flex items-center gap-1.5">
              {/* Month Dropdown */}
              <div className="relative">
                <select
                  value={categoryChartMonth}
                  onChange={(e) => setCategoryChartMonth(e.target.value)}
                  className="appearance-none rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-2.5 py-1.5 pr-7 text-xs font-medium text-slate-900 dark:text-slate-100 shadow-sm transition-all duration-200 hover:border-cyan-400 hover:shadow-md focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 cursor-pointer"
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5">
                  <svg className="h-3 w-3 text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
              
              {/* Year Dropdown */}
              <div className="relative">
                <select
                  value={categoryChartYear}
                  onChange={(e) => setCategoryChartYear(e.target.value)}
                  className="appearance-none rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-2.5 py-1.5 pr-7 text-xs font-medium text-slate-900 dark:text-slate-100 shadow-sm transition-all duration-200 hover:border-cyan-400 hover:shadow-md focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 cursor-pointer"
                >
                  <option value="all">All Years</option>
                  {availableYears.map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5">
                  <svg className="h-3 w-3 text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {categoryChartData.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No expenses recorded for this month in mock data.
            </p>
          ) : (
            <div className="space-y-4">
              <CategoryPieChart
                data={categoryChartData}
                total={categoryChartTotal}
              />
              <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-700 pt-3">
                {categoryChartData.map((item) => (
                  <div
                    key={item.category}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {peso(item.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </section>
      </div>

      {/* Monthly Expense Chart */}
      <MonthlyExpenseChartCard 
        expenses={mockExpenses} 
        year={parseInt(selectedYear)}
        availableYears={availableYears}
        onYearChange={(newYear) => setSelectedYear(newYear.toString())}
        monthlyBudget={mockUser.monthlyBudget}
      />

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


