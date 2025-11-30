export type ExpenseCategory = "Food" | "Transport" | "Bills" | "Entertainment" | string; // Allow custom categories

export type CategorySettings = {
  name: string;
  enabled: boolean;
  budget?: number; // Optional per-category budget
  color: string;
  isCustom: boolean; // Whether it's a user-created category
};

export type Expense = {
  id: number;
  date: string; // ISO date
  category: ExpenseCategory;
  amount: number;
  notes?: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  monthlyBudget: number;
  dateFormat: "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD";
  budgetResetDay: number; // 1-31, day of month
  budgetAlertThreshold: number; // Percentage (0-100)
  currency: "PHP" | "USD" | "EUR";
  numberFormat: "standard" | "compact"; // standard: 1,000.00, compact: 1K
  categorySettings: Record<string, CategorySettings>;
  notifications: {
    emailEnabled: boolean;
    budgetWarnings: boolean;
    weeklySummary: boolean;
    monthlySummary: boolean;
  };
  displayPreferences: {
    theme: "light" | "dark" | "system";
    defaultDateRange: "thisMonth" | "lastMonth" | "last30Days" | "custom";
    dashboardView: "compact" | "detailed";
  };
};

export const mockUser: User = {
  id: 1,
  name: "Juan Dela Cruz",
  email: "juan@example.com",
  phone: "+63 912 345 6789",
  monthlyBudget: 20000,
  dateFormat: "MM/DD/YYYY",
  budgetResetDay: 1,
  budgetAlertThreshold: 80,
  currency: "PHP",
  numberFormat: "standard",
  categorySettings: {
    Food: {
      name: "Food",
      enabled: true,
      budget: 8000,
      color: "#F66D44",
      isCustom: false,
    },
    Transport: {
      name: "Transport",
      enabled: true,
      budget: 3000,
      color: "#2D87BB",
      isCustom: false,
    },
    Bills: {
      name: "Bills",
      enabled: true,
      budget: 5000,
      color: "#64C2A6",
      isCustom: false,
    },
    Entertainment: {
      name: "Entertainment",
      enabled: true,
      budget: 2000,
      color: "#FEAE65",
      isCustom: false,
    },
  },
  notifications: {
    emailEnabled: true,
    budgetWarnings: true,
    weeklySummary: false,
    monthlySummary: true,
  },
  displayPreferences: {
    theme: "light",
    defaultDateRange: "thisMonth",
    dashboardView: "detailed",
  },
};

export const mockExpenses: Expense[] = [
  // January 2025
  { id: 1, date: "2025-01-05", category: "Food", amount: 350, notes: "Groceries" },
  { id: 2, date: "2025-01-08", category: "Bills", amount: 1800, notes: "Meralco bill" },
  { id: 3, date: "2025-01-10", category: "Transport", amount: 500, notes: "Monthly transport pass" },
  { id: 4, date: "2025-01-15", category: "Food", amount: 1200, notes: "Restaurant dinner" },
  { id: 5, date: "2025-01-20", category: "Entertainment", amount: 800, notes: "Movie tickets" },
  { id: 6, date: "2025-01-25", category: "Bills", amount: 1200, notes: "Internet bill" },
  { id: 7, date: "2025-01-28", category: "Food", amount: 450, notes: "Weekly groceries" },
  
  // February 2025
  { id: 8, date: "2025-02-03", category: "Food", amount: 280, notes: "Breakfast" },
  { id: 9, date: "2025-02-05", category: "Transport", amount: 600, notes: "Grab rides" },
  { id: 10, date: "2025-02-08", category: "Bills", amount: 1650, notes: "Meralco bill" },
  { id: 11, date: "2025-02-12", category: "Entertainment", amount: 1200, notes: "Concert tickets" },
  { id: 12, date: "2025-02-15", category: "Food", amount: 550, notes: "Valentine's dinner" },
  { id: 13, date: "2025-02-20", category: "Bills", amount: 850, notes: "Water bill" },
  { id: 14, date: "2025-02-25", category: "Food", amount: 380, notes: "Groceries" },
  
  // March 2025
  { id: 15, date: "2025-03-02", category: "Food", amount: 420, notes: "Lunch" },
  { id: 16, date: "2025-03-05", category: "Transport", amount: 450, notes: "Jeepney fares" },
  { id: 17, date: "2025-03-08", category: "Bills", amount: 1950, notes: "Meralco bill" },
  { id: 18, date: "2025-03-12", category: "Food", amount: 680, notes: "Restaurant" },
  { id: 19, date: "2025-03-18", category: "Entertainment", amount: 500, notes: "Coffee shop" },
  { id: 20, date: "2025-03-22", category: "Bills", amount: 1100, notes: "Internet bill" },
  { id: 21, date: "2025-03-28", category: "Food", amount: 520, notes: "Groceries" },
  
  // April 2025
  { id: 22, date: "2025-04-04", category: "Food", amount: 320, notes: "Breakfast" },
  { id: 23, date: "2025-04-07", category: "Transport", amount: 550, notes: "Transport pass" },
  { id: 24, date: "2025-04-10", category: "Bills", amount: 1700, notes: "Meralco bill" },
  { id: 25, date: "2025-04-15", category: "Entertainment", amount: 900, notes: "Cinema" },
  { id: 26, date: "2025-04-20", category: "Food", amount: 750, notes: "Dinner" },
  { id: 27, date: "2025-04-25", category: "Bills", amount: 950, notes: "Water bill" },
  { id: 28, date: "2025-04-30", category: "Food", amount: 480, notes: "Groceries" },
  
  // May 2025
  { id: 29, date: "2025-05-03", category: "Food", amount: 380, notes: "Lunch" },
  { id: 30, date: "2025-05-06", category: "Transport", amount: 480, notes: "Jeepney fares" },
  { id: 31, date: "2025-05-09", category: "Bills", amount: 1850, notes: "Meralco bill" },
  { id: 32, date: "2025-05-14", category: "Food", amount: 920, notes: "Restaurant" },
  { id: 33, date: "2025-05-19", category: "Entertainment", amount: 1100, notes: "Beach trip" },
  { id: 34, date: "2025-05-24", category: "Bills", amount: 1050, notes: "Internet bill" },
  { id: 35, date: "2025-05-29", category: "Food", amount: 560, notes: "Groceries" },
  
  // June 2025
  { id: 36, date: "2025-06-02", category: "Food", amount: 290, notes: "Breakfast" },
  { id: 37, date: "2025-06-05", category: "Transport", amount: 520, notes: "Grab rides" },
  { id: 38, date: "2025-06-08", category: "Bills", amount: 2100, notes: "Meralco bill (summer)" },
  { id: 39, date: "2025-06-13", category: "Entertainment", amount: 750, notes: "Movie" },
  { id: 40, date: "2025-06-18", category: "Food", amount: 680, notes: "Dinner" },
  { id: 41, date: "2025-06-23", category: "Bills", amount: 880, notes: "Water bill" },
  { id: 42, date: "2025-06-28", category: "Food", amount: 440, notes: "Groceries" },
  
  // July 2025
  { id: 43, date: "2025-07-04", category: "Food", amount: 410, notes: "Lunch" },
  { id: 44, date: "2025-07-07", category: "Transport", amount: 490, notes: "Transport pass" },
  { id: 45, date: "2025-07-10", category: "Bills", amount: 2200, notes: "Meralco bill" },
  { id: 46, date: "2025-07-15", category: "Food", amount: 850, notes: "Restaurant" },
  { id: 47, date: "2025-07-20", category: "Entertainment", amount: 600, notes: "Coffee" },
  { id: 48, date: "2025-07-25", category: "Bills", amount: 1150, notes: "Internet bill" },
  { id: 49, date: "2025-07-30", category: "Food", amount: 510, notes: "Groceries" },
  
  // August 2025
  { id: 50, date: "2025-08-03", category: "Food", amount: 360, notes: "Breakfast" },
  { id: 51, date: "2025-08-06", category: "Transport", amount: 540, notes: "Jeepney fares" },
  { id: 52, date: "2025-08-09", category: "Bills", amount: 2050, notes: "Meralco bill" },
  { id: 53, date: "2025-08-14", category: "Entertainment", amount: 1300, notes: "Concert" },
  { id: 54, date: "2025-08-19", category: "Food", amount: 720, notes: "Dinner" },
  { id: 55, date: "2025-08-24", category: "Bills", amount: 1000, notes: "Water bill" },
  { id: 56, date: "2025-08-29", category: "Food", amount: 490, notes: "Groceries" },
  
  // September 2025
  { id: 57, date: "2025-09-02", category: "Food", amount: 340, notes: "Lunch" },
  { id: 58, date: "2025-09-05", category: "Transport", amount: 510, notes: "Grab rides" },
  { id: 59, date: "2025-09-08", category: "Bills", amount: 1900, notes: "Meralco bill" },
  { id: 60, date: "2025-09-13", category: "Food", amount: 780, notes: "Restaurant" },
  { id: 61, date: "2025-09-18", category: "Entertainment", amount: 550, notes: "Movie" },
  { id: 62, date: "2025-09-23", category: "Bills", amount: 1080, notes: "Internet bill" },
  { id: 63, date: "2025-09-28", category: "Food", amount: 470, notes: "Groceries" },
  
  // October 2025
  { id: 64, date: "2025-10-03", category: "Food", amount: 310, notes: "Breakfast" },
  { id: 65, date: "2025-10-06", category: "Transport", amount: 530, notes: "Transport pass" },
  { id: 66, date: "2025-10-09", category: "Bills", amount: 1750, notes: "Meralco bill" },
  { id: 67, date: "2025-10-14", category: "Entertainment", amount: 850, notes: "Cinema" },
  { id: 68, date: "2025-10-19", category: "Food", amount: 690, notes: "Dinner" },
  { id: 69, date: "2025-10-24", category: "Bills", amount: 920, notes: "Water bill" },
  { id: 70, date: "2025-10-28", category: "Food", amount: 320, notes: "Groceries" },
  { id: 71, date: "2025-10-30", category: "Transport", amount: 120, notes: "Grab ride" },
  
  // November 2025
  { id: 72, date: "2025-11-02", category: "Food", amount: 250, notes: "Tapsilog breakfast" },
  { id: 73, date: "2025-11-03", category: "Transport", amount: 80, notes: "Jeepney fare" },
  { id: 74, date: "2025-11-03", category: "Bills", amount: 1500, notes: "Meralco bill" },
  { id: 75, date: "2025-11-04", category: "Entertainment", amount: 400, notes: "Cinema ticket" },
  { id: 76, date: "2025-11-05", category: "Food", amount: 180, notes: "Lunch at carinderia" },
  { id: 77, date: "2025-11-06", category: "Transport", amount: 120, notes: "Grab ride" },
  { id: 78, date: "2025-11-08", category: "Bills", amount: 999, notes: "PLDT internet" },
  { id: 79, date: "2025-11-09", category: "Entertainment", amount: 300, notes: "Coffee with friends" },
  { id: 80, date: "2025-11-10", category: "Food", amount: 220, notes: "Dinner" },
  { id: 81, date: "2025-11-11", category: "Transport", amount: 60, notes: "Tricycle fare" },
  { id: 82, date: "2025-11-15", category: "Food", amount: 450, notes: "Restaurant" },
  { id: 83, date: "2025-11-20", category: "Bills", amount: 850, notes: "Water bill" },
  { id: 84, date: "2025-11-25", category: "Food", amount: 380, notes: "Groceries" },
  
  // December 2025
  { id: 85, date: "2025-12-02", category: "Food", amount: 420, notes: "Lunch" },
  { id: 86, date: "2025-12-05", category: "Transport", amount: 580, notes: "Holiday transport" },
  { id: 87, date: "2025-12-08", category: "Bills", amount: 1950, notes: "Meralco bill" },
  { id: 88, date: "2025-12-12", category: "Entertainment", amount: 1500, notes: "Christmas party" },
  { id: 89, date: "2025-12-15", category: "Food", amount: 1200, notes: "Holiday dinner" },
  { id: 90, date: "2025-12-20", category: "Entertainment", amount: 2000, notes: "Gift shopping" },
  { id: 91, date: "2025-12-23", category: "Food", amount: 950, notes: "Christmas groceries" },
  { id: 92, date: "2025-12-25", category: "Entertainment", amount: 800, notes: "Christmas celebration" },
  { id: 93, date: "2025-12-28", category: "Bills", amount: 1100, notes: "Internet bill" },
  { id: 94, date: "2025-12-30", category: "Food", amount: 680, notes: "New Year prep" },
];

export const peso = (amount: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(amount);


