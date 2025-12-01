"use client";

import { useState, useEffect } from "react";
import { mockUser, peso, type CategorySettings, mockExpenses } from "@/lib/mockData";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useTheme } from "@/contexts/ThemeContext";
import { useDashboardView } from "@/contexts/DashboardViewContext";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { view: dashboardView, setView: setDashboardView } = useDashboardView();
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [phone, setPhone] = useState(mockUser.phone || "");
  const [budget, setBudget] = useState(String(mockUser.monthlyBudget));
  const [budgetResetDay, setBudgetResetDay] = useState(mockUser.budgetResetDay);
  const [budgetAlertThreshold, setBudgetAlertThreshold] = useState(mockUser.budgetAlertThreshold);
  const [currency, setCurrency] = useState<"PHP" | "USD" | "EUR">(mockUser.currency);
  const [numberFormat, setNumberFormat] = useState<"standard" | "compact">(mockUser.numberFormat);
  const [categorySettings, setCategorySettings] = useState<Record<string, CategorySettings>>(mockUser.categorySettings);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#6366f1");
  const [notifications, setNotifications] = useState(mockUser.notifications);
  const [displayPreferences, setDisplayPreferences] = useState({
    ...mockUser.displayPreferences,
    dashboardView: dashboardView,
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "saved">("idle");
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [notificationFeedback, setNotificationFeedback] = useState<string | null>(null);
  const [dataManagementFeedback, setDataManagementFeedback] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [lastBackupDate, setLastBackupDate] = useState<string | null>(null);
  const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);

  const showNotificationFeedback = (message: string) => {
    setNotificationFeedback(message);
    setTimeout(() => setNotificationFeedback(null), 2000);
  };

  const showDataManagementFeedback = (message: string) => {
    setDataManagementFeedback(message);
    setTimeout(() => setDataManagementFeedback(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Settings updated (mock only)", {
      name,
      email,
      phone,
      monthlyBudget: budget,
      budgetResetDay,
      budgetAlertThreshold,
      currency,
      numberFormat,
      categorySettings,
      notifications,
      displayPreferences,
    });
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Export functions
  const exportToCSV = () => {
    const headers = ["Date", "Category", "Amount", "Notes"];
    const rows = mockExpenses.map((expense) => [
      expense.date,
      expense.category,
      expense.amount.toString(),
      expense.notes || "",
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `expenses-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const data = {
      user: {
        name: mockUser.name,
        email: mockUser.email,
        monthlyBudget: mockUser.monthlyBudget,
      },
      expenses: mockExpenses,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `expenses-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showDataManagementFeedback(`Exported ${mockExpenses.length} expenses as JSON successfully`);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFileName(file.name);
    const fileSize = (file.size / 1024).toFixed(2);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      try {
        if (file.name.endsWith(".json")) {
          const data = JSON.parse(content);
          console.log("Imported JSON data:", data);
          showDataManagementFeedback(`JSON file imported successfully (${fileSize} KB)`);
        } else if (file.name.endsWith(".csv")) {
          const lines = content.split("\n");
          const headers = lines[0].split(",").map((h) => h.replace(/"/g, ""));
          console.log("Imported CSV data:", { headers, lines: lines.length - 1 });
          showDataManagementFeedback(`CSV file imported successfully - ${lines.length - 1} records (${fileSize} KB)`);
        }
      } catch (error) {
        showDataManagementFeedback("Error importing file. Please check the format.");
        console.error("Import error:", error);
      }
    };
    reader.readAsText(file);
  };


  return (
    <div className="space-y-5">
      {/* Description Section */}
      <div>
        <p className="text-sm text-slate-600">
          Update your settings and preferences. Data is currently mocked and
          ready for a Supabase connection.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          // Prevent form submission on Enter key in select elements
          if (e.key === 'Enter' && (e.target as HTMLElement).tagName === 'SELECT') {
            e.preventDefault();
          }
        }}
        className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[var(--shadow-soft)] sm:p-6"
      >
        {/* Profile Settings Section */}
        <div className="border-b border-slate-200 pb-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Profile Settings</h3>
        {/* Profile Avatar Section */}
        <div className="mb-6 border-b border-slate-200 pb-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Profile Photo
          </label>
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 via-teal-500 to-blue-500 text-2xl font-semibold text-white shadow-md">
              {getInitials(name)}
            </div>
            <div className="flex-1">
              <button
                type="button"
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1"
              >
                Change Photo
              </button>
              <p className="mt-1 text-xs text-slate-500">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Privacy & Security
              </button>
            </div>
          </div>
        </div>

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
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+63 912 345 6789"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
            <p className="mt-1 text-xs text-slate-500">Optional</p>
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
        </div>

        {/* Budget & Financial Settings Section */}
        <div className="border-b border-slate-200 pb-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Budget & Financial Settings</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">
                Budget Reset Day
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={budgetResetDay}
                onChange={(e) => setBudgetResetDay(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
              <p className="mt-1 text-xs text-slate-500">
                Day of the month (1-31) when your monthly budget resets
              </p>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">
                Budget Alert Threshold: {budgetAlertThreshold}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={budgetAlertThreshold}
                onChange={(e) => setBudgetAlertThreshold(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Get notified when you reach this percentage of your budget
              </p>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Currency
              </label>
              <div className="space-y-2">
                {[
                  { value: "PHP", label: "₱ PHP - Philippine Peso" },
                  { value: "USD", label: "$ USD - US Dollar" },
                  { value: "EUR", label: "€ EUR - Euro" },
                ].map((curr) => (
                  <label
                    key={curr.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="currency"
                      value={curr.value}
                      checked={currency === curr.value}
                      onChange={(e) => setCurrency(e.target.value as "PHP" | "USD" | "EUR")}
                      className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-slate-700">{curr.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Number Format
              </label>
              <div className="space-y-2">
                {[
                  { value: "standard", label: "Standard (1,000.00)" },
                  { value: "compact", label: "Compact (1K)" },
                ].map((format) => (
                  <label
                    key={format.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="numberFormat"
                      value={format.value}
                      checked={numberFormat === format.value}
                      onChange={(e) => setNumberFormat(e.target.value as "standard" | "compact")}
                      className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-slate-700">{format.label}</span>
                  </label>
                ))}
              </div>
              <p className="mt-1 text-xs text-slate-500">
                How numbers are displayed throughout the app
              </p>
            </div>
          </div>
        </div>

        {/* Category Management Section */}
        <div className="border-b border-slate-200 pb-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Category Management</h3>
          <div className="mb-4">
            <p className="text-sm text-slate-600">
              Customize your expense categories. Enable or disable categories, set budgets, and choose colors.
            </p>
          </div>

          {/* Existing Categories */}
          <div className="space-y-3 mb-6">
            {Object.entries(categorySettings).map(([key, category]) => (
              <div
                key={key}
                className={`group rounded-xl border transition-all ${
                  category.enabled
                    ? "border-slate-200 bg-white shadow-sm hover:shadow-md"
                    : "border-slate-200/50 bg-slate-50/50 opacity-60"
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Category Color & Name Section */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Color Indicator */}
                      <div className="relative flex-shrink-0">
                        <div
                          className="h-10 w-10 rounded-lg border-2 border-slate-200 shadow-sm"
                          style={{ backgroundColor: category.color }}
                        />
                        <input
                          type="color"
                          value={category.color}
                          onChange={(e) => {
                            setCategorySettings({
                              ...categorySettings,
                              [key]: { ...category, color: e.target.value },
                            });
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          title="Change color"
                        />
                      </div>

                      {/* Category Name */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-slate-900 truncate">
                            {category.name}
                          </h4>
                          {category.isCustom && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-cyan-100 text-cyan-700">
                              Custom
                            </span>
                          )}
                        </div>
                        {category.budget && (
                          <p className="text-xs text-slate-500 mt-0.5">
                            Budget: {peso(category.budget)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Controls Section */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      {/* Enable/Disable Toggle */}
                      <div className="flex flex-col items-center gap-1">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={category.enabled}
                            onChange={(e) => {
                              setCategorySettings({
                                ...categorySettings,
                                [key]: { ...category, enabled: e.target.checked },
                              });
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all duration-300 ease-in-out peer-checked:bg-cyan-600"></div>
                        </label>
                        <span className="text-[10px] text-slate-500">
                          {category.enabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>

                      {/* Budget Input */}
                      <div className="w-32">
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                          Budget
                        </label>
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                            ₱
                          </span>
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={category.budget || ""}
                            onChange={(e) => {
                              setCategorySettings({
                                ...categorySettings,
                                [key]: {
                                  ...category,
                                  budget: e.target.value ? Number(e.target.value) : undefined,
                                },
                              });
                            }}
                            placeholder="No limit"
                            disabled={!category.enabled}
                            className="w-full pl-6 pr-2 py-1.5 text-sm rounded-lg border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>

                      {/* Delete Button for Custom Categories */}
                      {category.isCustom && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
                              const newSettings = { ...categorySettings };
                              delete newSettings[key];
                              setCategorySettings(newSettings);
                            }
                          }}
                          className="flex-shrink-0 p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete category"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Category */}
          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-white p-5">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-5 h-5 text-cyan-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <h4 className="text-sm font-semibold text-slate-900">
                Add Custom Category
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-4 items-end">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g., Shopping, Health, Travel"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Color
                </label>
                <div className="relative">
                  <div
                    className="h-10 w-10 rounded-lg border-2 border-slate-300 shadow-sm cursor-pointer"
                    style={{ backgroundColor: newCategoryColor }}
                  />
                  <input
                    type="color"
                    value={newCategoryColor}
                    onChange={(e) => setNewCategoryColor(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    title="Choose color"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (newCategoryName.trim()) {
                    const categoryKey = newCategoryName.trim();
                    setCategorySettings({
                      ...categorySettings,
                      [categoryKey]: {
                        name: categoryKey,
                        enabled: true,
                        color: newCategoryColor,
                        isCustom: true,
                      },
                    });
                    setNewCategoryName("");
                    setNewCategoryColor("#6366f1");
                  }
                }}
                disabled={!newCategoryName.trim()}
                className="rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>

        {/* Notifications & Alerts Section */}
        <div className="border-b border-slate-200 pb-6 mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-5">Notifications & Alerts</h3>
          {notificationFeedback && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm text-green-800 font-medium">{notificationFeedback}</p>
            </div>
          )}
          <div className="space-y-3">
            {/* Email Notifications Toggle */}
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 p-5">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-0.5 text-slate-600 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-slate-900">
                    Email Notifications
                  </h4>
                  <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">
                    Receive email notifications for important updates
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.emailEnabled}
                  onChange={(e) => {
                    setNotifications({
                      ...notifications,
                      emailEnabled: e.target.checked,
                    });
                    showNotificationFeedback(
                      e.target.checked 
                        ? "Email notifications enabled" 
                        : "Email notifications disabled"
                    );
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all duration-300 ease-in-out peer-checked:bg-cyan-600"></div>
              </label>
            </div>

            {/* Budget Warnings */}
            <div className={`flex items-center justify-between rounded-xl border transition-all duration-200 p-5 ${
              !notifications.emailEnabled 
                ? 'border-slate-200 bg-slate-50 opacity-75 cursor-not-allowed' 
                : 'border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300'
            }`}>
              <div className="flex items-start gap-3 flex-1">
                <div className={`mt-0.5 transition-colors duration-200 ${!notifications.emailEnabled ? 'text-slate-400' : 'text-slate-600'}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className={`text-base font-semibold ${!notifications.emailEnabled ? 'text-slate-500' : 'text-slate-900'}`}>
                    Budget Warning Alerts
                  </h4>
                  <p className={`mt-1.5 text-sm leading-relaxed ${!notifications.emailEnabled ? 'text-slate-400' : 'text-slate-700'}`}>
                    {!notifications.emailEnabled 
                      ? 'Enable email notifications to use this feature'
                      : 'Get notified when approaching your budget threshold'}
                  </p>
                </div>
              </div>
              <div className="relative group">
                <label className={`relative inline-flex items-center ${!notifications.emailEnabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                  <input
                    type="checkbox"
                    checked={notifications.budgetWarnings}
                  onChange={(e) => {
                    setNotifications({
                      ...notifications,
                      budgetWarnings: e.target.checked,
                    });
                    showNotificationFeedback(
                      e.target.checked 
                        ? "Budget warnings enabled" 
                        : "Budget warnings disabled"
                    );
                  }}
                    disabled={!notifications.emailEnabled}
                    className="sr-only peer disabled:opacity-50"
                  />
                  <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    !notifications.emailEnabled 
                      ? 'bg-slate-200 after:border-slate-200' 
                      : notifications.budgetWarnings 
                        ? 'bg-cyan-600 after:border-white' 
                        : 'bg-slate-300 after:border-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-500'
                  }`}></div>
                </label>
                {!notifications.emailEnabled && (
                  <div className="absolute right-0 top-full mt-2 w-48 p-2 bg-slate-900 text-white text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 pointer-events-none">
                    Enable "Email Notifications" above to activate this feature
                    <div className="absolute -top-1 right-4 w-2 h-2 bg-slate-900 rotate-45"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Weekly Summary */}
            <div className={`flex items-center justify-between rounded-xl border transition-all duration-200 p-5 ${
              !notifications.emailEnabled 
                ? 'border-slate-200 bg-slate-50 opacity-75 cursor-not-allowed' 
                : 'border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300'
            }`}>
              <div className="flex items-start gap-3 flex-1">
                <div className={`mt-0.5 transition-colors duration-200 ${!notifications.emailEnabled ? 'text-slate-400' : 'text-slate-600'}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className={`text-base font-semibold ${!notifications.emailEnabled ? 'text-slate-500' : 'text-slate-900'}`}>
                    Weekly Summary
                  </h4>
                  <p className={`mt-1.5 text-sm leading-relaxed ${!notifications.emailEnabled ? 'text-slate-400' : 'text-slate-700'}`}>
                    {!notifications.emailEnabled 
                      ? 'Enable email notifications to use this feature'
                      : notifications.weeklySummary
                        ? 'Receive a weekly email summary of your expenses • Last sent: 2 days ago'
                        : 'Receive a weekly email summary of your expenses'}
                  </p>
                </div>
              </div>
              <div className="relative group">
                <label className={`relative inline-flex items-center ${!notifications.emailEnabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                  <input
                    type="checkbox"
                    checked={notifications.weeklySummary}
                  onChange={(e) => {
                    setNotifications({
                      ...notifications,
                      weeklySummary: e.target.checked,
                    });
                    showNotificationFeedback(
                      e.target.checked 
                        ? "Weekly summary enabled" 
                        : "Weekly summary disabled"
                    );
                  }}
                    disabled={!notifications.emailEnabled}
                    className="sr-only peer disabled:opacity-50"
                  />
                  <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    !notifications.emailEnabled 
                      ? 'bg-slate-200 after:border-slate-200' 
                      : notifications.weeklySummary 
                        ? 'bg-cyan-600 after:border-white' 
                        : 'bg-slate-300 after:border-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-500'
                  }`}></div>
                </label>
                {!notifications.emailEnabled && (
                  <div className="absolute right-0 top-full mt-2 w-48 p-2 bg-slate-900 text-white text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 pointer-events-none">
                    Enable "Email Notifications" above to activate this feature
                    <div className="absolute -top-1 right-4 w-2 h-2 bg-slate-900 rotate-45"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Monthly Summary */}
            <div className={`flex items-center justify-between rounded-xl border transition-all duration-200 p-5 ${
              !notifications.emailEnabled 
                ? 'border-slate-200 bg-slate-50 opacity-75 cursor-not-allowed' 
                : 'border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300'
            }`}>
              <div className="flex items-start gap-3 flex-1">
                <div className={`mt-0.5 transition-colors duration-200 ${!notifications.emailEnabled ? 'text-slate-400' : 'text-slate-600'}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className={`text-base font-semibold ${!notifications.emailEnabled ? 'text-slate-500' : 'text-slate-900'}`}>
                    Monthly Summary
                  </h4>
                  <p className={`mt-1.5 text-sm leading-relaxed ${!notifications.emailEnabled ? 'text-slate-400' : 'text-slate-700'}`}>
                    {!notifications.emailEnabled 
                      ? 'Enable email notifications to use this feature'
                      : notifications.monthlySummary
                        ? 'Receive a monthly email summary of your spending patterns • Last sent: 15 days ago'
                        : 'Receive a monthly email summary of your spending patterns'}
                  </p>
                </div>
              </div>
              <div className="relative group">
                <label className={`relative inline-flex items-center ${!notifications.emailEnabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                  <input
                    type="checkbox"
                    checked={notifications.monthlySummary}
                  onChange={(e) => {
                    setNotifications({
                      ...notifications,
                      monthlySummary: e.target.checked,
                    });
                    showNotificationFeedback(
                      e.target.checked 
                        ? "Monthly summary enabled" 
                        : "Monthly summary disabled"
                    );
                  }}
                    disabled={!notifications.emailEnabled}
                    className="sr-only peer disabled:opacity-50"
                  />
                  <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    !notifications.emailEnabled 
                      ? 'bg-slate-200 after:border-slate-200' 
                      : notifications.monthlySummary 
                        ? 'bg-cyan-600 after:border-white' 
                        : 'bg-slate-300 after:border-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-500'
                  }`}></div>
                </label>
                {!notifications.emailEnabled && (
                  <div className="absolute right-0 top-full mt-2 w-48 p-2 bg-slate-900 text-white text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 pointer-events-none">
                    Enable "Email Notifications" above to activate this feature
                    <div className="absolute -top-1 right-4 w-2 h-2 bg-slate-900 rotate-45"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Display & Preferences Section */}
        <div className="border-b border-slate-200 pb-8 mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Display & Preferences</h3>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="block text-base font-semibold text-slate-900 mb-4 tracking-tight">
                  Theme
                </label>
                <div className="space-y-2.5">
                {[
                  { 
                    value: "light", 
                    label: "Light",
                    preview: (
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded bg-white border border-slate-300"></div>
                        <div className="w-3 h-3 rounded bg-slate-100 border border-slate-300"></div>
                        <div className="w-3 h-3 rounded bg-slate-200 border border-slate-300"></div>
                      </div>
                    ),
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )
                  },
                  { 
                    value: "dark", 
                    label: "Dark",
                    preview: (
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded bg-slate-800 border border-slate-700"></div>
                        <div className="w-3 h-3 rounded bg-slate-700 border border-slate-600"></div>
                        <div className="w-3 h-3 rounded bg-slate-600 border border-slate-500"></div>
                      </div>
                    ),
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )
                  },
                  { 
                    value: "system", 
                    label: "System (Follow OS)",
                    preview: (
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded bg-white border border-slate-300"></div>
                        <div className="w-3 h-3 rounded bg-gradient-to-br from-white to-slate-800 border border-slate-300"></div>
                        <div className="w-3 h-3 rounded bg-slate-800 border border-slate-700"></div>
                      </div>
                    ),
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex items-center gap-3 p-3.5 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      theme === option.value
                        ? "border-cyan-600 bg-cyan-50/50 shadow-md ring-2 ring-cyan-500/20 dark:bg-cyan-950/30 dark:border-cyan-500"
                        : "border-slate-200 bg-white hover:border-cyan-300 hover:bg-cyan-50/30 hover:shadow-sm active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:hover:border-cyan-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="theme"
                      value={option.value}
                      checked={theme === option.value}
                      onChange={(e) => {
                        setTheme(e.target.value as "light" | "dark" | "system");
                        setDisplayPreferences({
                          ...displayPreferences,
                          theme: e.target.value as "light" | "dark" | "system",
                        });
                      }}
                      className="sr-only"
                    />
                    <div className={`transition-colors duration-200 ${theme === option.value ? "text-cyan-600" : "text-slate-500 dark:text-slate-400"}`}>
                      {option.icon}
                    </div>
                    <div className="flex-1">
                    <span className={`text-sm font-semibold block transition-colors duration-200 mb-1.5 ${
                      theme === option.value ? "text-slate-900 dark:text-slate-100" : "text-slate-700 dark:text-slate-300"
                    }`}>
                      {option.label}
                    </span>
                      {option.preview}
                    </div>
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-200 flex-shrink-0 ${
                        theme === option.value
                          ? "border-cyan-600 bg-cyan-600 ring-2 ring-cyan-500/30"
                          : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-700"
                      }`}
                    >
                      {theme === option.value && (
                        <div className="h-2.5 w-2.5 rounded-full bg-white animate-in fade-in duration-200" />
                      )}
                    </div>
                  </label>
                ))}
              </div>
                <p className="mt-3 text-xs font-medium text-slate-500 leading-relaxed">
                  Choose your preferred color theme
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-base font-semibold text-slate-900 mb-4 tracking-tight">
                  Default Date Range
                </label>
                <div className="space-y-2.5">
                {[
                  { 
                    value: "thisMonth", 
                    label: "This Month",
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )
                  },
                  { 
                    value: "lastMonth", 
                    label: "Last Month",
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )
                  },
                  { 
                    value: "last30Days", 
                    label: "Last 30 Days",
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                  { 
                    value: "custom", 
                    label: "Custom Range",
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )
                  },
                ].map((range) => (
                  <label
                    key={range.value}
                    className={`relative flex items-center gap-3 p-3.5 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      displayPreferences.defaultDateRange === range.value
                        ? "border-cyan-600 bg-cyan-50/50 shadow-md ring-2 ring-cyan-500/20"
                        : "border-slate-200 bg-white hover:border-cyan-300 hover:bg-cyan-50/30 hover:shadow-sm active:scale-[0.98]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="defaultDateRange"
                      value={range.value}
                      checked={displayPreferences.defaultDateRange === range.value}
                      onChange={(e) =>
                        setDisplayPreferences({
                          ...displayPreferences,
                          defaultDateRange: e.target.value as
                            | "thisMonth"
                            | "lastMonth"
                            | "last30Days"
                            | "custom",
                        })
                      }
                      className="sr-only"
                    />
                    <div className={`transition-colors duration-200 ${displayPreferences.defaultDateRange === range.value ? "text-cyan-600" : "text-slate-500"}`}>
                      {range.icon}
                    </div>
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                        displayPreferences.defaultDateRange === range.value
                          ? "border-cyan-600 bg-cyan-600 ring-2 ring-cyan-500/30"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {displayPreferences.defaultDateRange === range.value && (
                        <div className="h-2.5 w-2.5 rounded-full bg-white animate-in fade-in duration-200" />
                      )}
                    </div>
                    <span className={`text-sm font-semibold flex-1 transition-colors duration-200 ${
                      displayPreferences.defaultDateRange === range.value ? "text-slate-900" : "text-slate-700"
                    }`}>
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
                <p className="mt-3 text-xs font-medium text-slate-500 leading-relaxed">
                  Default view when opening dashboard
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-base font-semibold text-slate-900 mb-4 tracking-tight">
                  Dashboard View
                </label>
                <div className="space-y-2.5">
                {[
                  { 
                    value: "compact", 
                    label: "Compact",
                    preview: (
                      <div className="flex gap-1">
                        <div className="w-4 h-4 rounded bg-slate-200"></div>
                        <div className="w-4 h-4 rounded bg-slate-200"></div>
                        <div className="w-4 h-4 rounded bg-slate-200"></div>
                      </div>
                    ),
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    )
                  },
                  { 
                    value: "detailed", 
                    label: "Detailed",
                    preview: (
                      <div className="flex flex-col gap-0.5">
                        <div className="h-2 w-8 rounded bg-slate-300"></div>
                        <div className="h-2 w-10 rounded bg-slate-200"></div>
                        <div className="h-2 w-6 rounded bg-slate-300"></div>
                      </div>
                    ),
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v9a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
                      </svg>
                    )
                  },
                ].map((view) => (
                  <label
                    key={view.value}
                    className={`relative flex items-center gap-3 p-3.5 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      displayPreferences.dashboardView === view.value
                        ? "border-cyan-600 bg-cyan-50/50 shadow-md ring-2 ring-cyan-500/20"
                        : "border-slate-200 bg-white hover:border-cyan-300 hover:bg-cyan-50/30 hover:shadow-sm active:scale-[0.98]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="dashboardView"
                      value={view.value}
                      checked={displayPreferences.dashboardView === view.value}
                      onChange={(e) => {
                        const nextView = e.target.value as "compact" | "detailed";
                        setDisplayPreferences({
                          ...displayPreferences,
                          dashboardView: nextView,
                        });
                        setDashboardView(nextView);
                      }}
                      className="sr-only"
                    />
                    <div className={`transition-colors duration-200 ${displayPreferences.dashboardView === view.value ? "text-cyan-600" : "text-slate-500"}`}>
                      {view.icon}
                    </div>
                    <div className="flex-1">
                      <span className={`text-sm font-semibold block transition-colors duration-200 mb-1.5 ${
                        displayPreferences.dashboardView === view.value ? "text-slate-900" : "text-slate-700"
                      }`}>
                        {view.label}
                      </span>
                      {view.preview}
                    </div>
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-200 flex-shrink-0 ${
                        displayPreferences.dashboardView === view.value
                          ? "border-cyan-600 bg-cyan-600 ring-2 ring-cyan-500/30"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {displayPreferences.dashboardView === view.value && (
                        <div className="h-2.5 w-2.5 rounded-full bg-white animate-in fade-in duration-200" />
                      )}
                    </div>
                  </label>
                ))}
              </div>
                <p className="mt-3 text-xs font-medium text-slate-500 leading-relaxed">
                  Choose how much information to display
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Management Section */}
        <div className="border-b border-slate-200 pb-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Data Management</h3>
          {dataManagementFeedback && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm text-green-800 font-medium">{dataManagementFeedback}</p>
            </div>
          )}
          <div className="space-y-3">
            {/* Export Section */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-slate-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-slate-900">
                  Export Data
                </h4>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Download your expense data for backup or analysis
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={exportToCSV}
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Export as CSV
                </button>
                <button
                  type="button"
                  onClick={exportToJSON}
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Export as JSON
                </button>
              </div>
            </div>

            {/* Import Section */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-slate-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-slate-900">
                  Import Expenses
                </h4>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Upload a CSV or JSON file to import expenses
              </p>
              <label className="inline-block">
                <input
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileImport}
                  className="hidden"
                />
                <span className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 cursor-pointer transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  Choose File
                </span>
              </label>
              {selectedFileName && (
                <div className="mt-3 p-2 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-600 font-medium">Selected file:</p>
                  <p className="text-xs text-slate-700 mt-1 truncate">{selectedFileName}</p>
                </div>
              )}
              <p className="mt-2 text-xs text-slate-500">
                Supported formats: CSV, JSON
              </p>
            </div>

            {/* Backup Section */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-slate-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-slate-900">
                  Backup & Restore
                </h4>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Create a complete backup of all your settings and data
              </p>
              {lastBackupDate && (
                <div className="mb-3 p-2 bg-cyan-50 rounded-lg border border-cyan-200">
                  <p className="text-xs text-cyan-800">
                    <span className="font-medium">Last backup:</span> {new Date(lastBackupDate).toLocaleString()}
                  </p>
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const backupDate = new Date().toISOString();
                    const backup = {
                      user: mockUser,
                      expenses: mockExpenses,
                      backupDate: backupDate,
                    };
                    const blob = new Blob([JSON.stringify(backup, null, 2)], {
                      type: "application/json",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `backup-${new Date().toISOString().split("T")[0]}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                    setLastBackupDate(backupDate);
                    showDataManagementFeedback("Backup created successfully");
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  Create Backup
                </button>
                <label className="inline-block">
                  <input
                    type="file"
                    accept=".json"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        try {
                          const backup = JSON.parse(
                            event.target?.result as string
                          );
                          console.log("Restore backup:", backup);
                          alert("Backup restored successfully (mock - ready for backend)");
                        } catch (error) {
                          alert("Error restoring backup. Please check the file.");
                          console.error("Restore error:", error);
                        }
                      };
                      reader.readAsText(file);
                    }}
                    className="hidden"
                  />
                  <span className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 cursor-pointer transition-colors duration-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    Restore Backup
                  </span>
                </label>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="rounded-xl border border-rose-100 bg-rose-50/60 shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-rose-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v4m0 4h.01M4.293 4.293l15.414 15.414M9.88 9.88L5.636 14.122a2 2 0 002.828 2.828L12 13.414l3.536 3.536a2 2 0 002.828-2.828L14.122 9.88M9 4h6l1 2H8l1-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-rose-800">
                    Danger zone
                  </h4>
                  <p className="text-xs text-rose-700/80">
                    Permanently clear all mock expenses and settings from this browser.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDeleteAllOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 7h12M10 11v6m4-6v6M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m2 0v12a2 2 0 01-2 2H7a2 2 0 01-2-2V7h14z"
                  />
                </svg>
                Delete all data (demo)
              </button>
              <p className="mt-2 text-[11px] text-rose-700/80">
                This only affects mock data stored in your browser. No real accounts are touched.
              </p>
            </div>
          </div>
        </div>


        <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-4">
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

      <ConfirmDialog
        open={isDeleteAllOpen}
        title="Delete all data?"
        description={
          <p>
            This will clear all <span className="font-semibold">mock expenses and settings</span> stored in your browser for this demo. You can refresh the
            page to restore the original mock data from the app.
          </p>
        }
        confirmLabel="Delete everything"
        cancelLabel="Cancel"
        onCancel={() => setIsDeleteAllOpen(false)}
        onConfirm={() => {
          setIsDeleteAllOpen(false);
          // In a real app you would clear persisted data here.
          console.log("All mock data deleted (demo only)");
          showDataManagementFeedback("All mock data cleared for this demo session");
        }}
      />

      {/* Privacy & Security Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">Privacy & Security</h3>
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Change Password */}
              <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4">
                <h4 className="text-sm font-medium text-slate-900 mb-3">
                  Change Password
                </h4>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (newPassword && newPassword === confirmPassword) {
                        console.log("Password changed (mock)");
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        alert("Password changed successfully (mock - ready for backend)");
                      } else {
                        alert("Passwords do not match");
                      }
                    }}
                    disabled={!currentPassword || !newPassword || !confirmPassword}
                    className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Update Password
                  </button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 p-4">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-slate-900">
                    Two-Factor Authentication
                  </h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all duration-300 ease-in-out peer-checked:bg-cyan-600"></div>
                </label>
              </div>

              {/* Active Sessions */}
              <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4">
                <h4 className="text-sm font-medium text-slate-900 mb-3">
                  Active Sessions
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded border border-slate-200 bg-white p-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        Current Session
                      </p>
                      <p className="text-xs text-slate-500">
                        Windows • Chrome • Last active: Just now
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-xs font-medium text-red-600 hover:text-red-700"
                      disabled
                    >
                      This Device
                    </button>
                  </div>
                  <div className="flex items-center justify-between rounded border border-slate-200 bg-white p-3 opacity-60">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        Mobile Device
                      </p>
                      <p className="text-xs text-slate-500">
                        iOS • Safari • Last active: 2 hours ago
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-xs font-medium text-red-600 hover:text-red-700"
                    >
                      Revoke
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Revoke access from devices you no longer use
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


