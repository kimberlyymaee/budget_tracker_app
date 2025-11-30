"use client";

import { useEffect, useState } from "react";

export function DashboardPreview() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);

  // Mock data for preview
  const categories = [
    { name: "Food", amount: 8500, color: "bg-cyan-500", percentage: 35 },
    { name: "Transport", amount: 4200, color: "bg-teal-500", percentage: 18 },
    { name: "Bills", amount: 6800, color: "bg-blue-500", percentage: 28 },
    { name: "Other", amount: 4800, color: "bg-slate-400", percentage: 19 },
  ];

  const recentExpenses = [
    { name: "Grocery", amount: 1200, category: "Food" },
    { name: "Grab", amount: 350, category: "Transport" },
    { name: "Electricity", amount: 2500, category: "Bills" },
  ];

  return (
    <div className="w-full h-full p-4 bg-gradient-to-br from-sky-50 to-cyan-50 overflow-y-auto">
      {/* Header */}
      <div className={`mb-4 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <h2 className="text-lg font-bold text-slate-900">Dashboard</h2>
        <p className="text-xs text-slate-500">Total: ₱24,300</p>
      </div>

      {/* Category Breakdown */}
      <div className={`mb-4 bg-white rounded-lg p-3 shadow-sm transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`} style={{ transitionDelay: "400ms" }}>
        <h3 className="text-xs font-semibold text-slate-700 mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${cat.color} transition-all duration-300`} style={{ transitionDelay: `${500 + i * 100}ms` }}></div>
              <div className="flex-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">{cat.name}</span>
                  <span className="text-slate-900 font-medium">₱{cat.amount.toLocaleString()}</span>
                </div>
                <div className="mt-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.color} rounded-full transition-all duration-700 ease-out`}
                    style={{
                      width: isVisible ? `${cat.percentage}%` : "0%",
                      transitionDelay: `${600 + i * 100}ms`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Expenses */}
      <div className={`bg-white rounded-lg p-3 shadow-sm transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`} style={{ transitionDelay: "800ms" }}>
        <h3 className="text-xs font-semibold text-slate-700 mb-2">Recent</h3>
        <div className="space-y-2">
          {recentExpenses.map((expense, i) => (
            <div
              key={i}
              className="flex justify-between items-center text-xs transition-opacity duration-300"
              style={{
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${900 + i * 100}ms`,
              }}
            >
              <div>
                <p className="text-slate-900 font-medium">{expense.name}</p>
                <p className="text-slate-500">{expense.category}</p>
              </div>
              <p className="text-slate-900 font-semibold">₱{expense.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

