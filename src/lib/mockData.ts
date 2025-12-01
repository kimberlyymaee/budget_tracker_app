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
  // January 2023
  { id: 100, date: "2023-01-05", category: "Food", amount: 320, notes: "Groceries" },
  { id: 101, date: "2023-01-08", category: "Bills", amount: 1650, notes: "Meralco bill" },
  { id: 102, date: "2023-01-10", category: "Transport", amount: 480, notes: "Monthly transport pass" },
  { id: 103, date: "2023-01-15", category: "Food", amount: 1100, notes: "Restaurant dinner" },
  { id: 104, date: "2023-01-20", category: "Entertainment", amount: 750, notes: "Movie tickets" },
  { id: 105, date: "2023-01-25", category: "Bills", amount: 1150, notes: "Internet bill" },
  { id: 106, date: "2023-01-28", category: "Food", amount: 420, notes: "Weekly groceries" },
  
  // February 2023
  { id: 200, date: "2023-02-03", category: "Food", amount: 280, notes: "Breakfast" },
  { id: 201, date: "2023-02-05", category: "Transport", amount: 580, notes: "Grab rides" },
  { id: 202, date: "2023-02-08", category: "Bills", amount: 1580, notes: "Meralco bill" },
  { id: 203, date: "2023-02-12", category: "Entertainment", amount: 1100, notes: "Concert tickets" },
  { id: 204, date: "2023-02-15", category: "Food", amount: 520, notes: "Valentine's dinner" },
  { id: 205, date: "2023-02-20", category: "Bills", amount: 800, notes: "Water bill" },
  { id: 206, date: "2023-02-25", category: "Food", amount: 360, notes: "Groceries" },
  
  // March 2023
  { id: 107, date: "2023-03-02", category: "Food", amount: 380, notes: "Lunch" },
  { id: 108, date: "2023-03-05", category: "Transport", amount: 420, notes: "Jeepney fares" },
  { id: 109, date: "2023-03-08", category: "Bills", amount: 1800, notes: "Meralco bill" },
  { id: 110, date: "2023-03-12", category: "Food", amount: 620, notes: "Restaurant" },
  { id: 111, date: "2023-03-18", category: "Entertainment", amount: 450, notes: "Coffee shop" },
  { id: 112, date: "2023-03-22", category: "Bills", amount: 1050, notes: "Internet bill" },
  { id: 113, date: "2023-03-28", category: "Food", amount: 500, notes: "Groceries" },
  
  // April 2023
  { id: 207, date: "2023-04-04", category: "Food", amount: 300, notes: "Breakfast" },
  { id: 208, date: "2023-04-07", category: "Transport", amount: 530, notes: "Transport pass" },
  { id: 209, date: "2023-04-10", category: "Bills", amount: 1620, notes: "Meralco bill" },
  { id: 210, date: "2023-04-15", category: "Entertainment", amount: 820, notes: "Cinema" },
  { id: 211, date: "2023-04-20", category: "Food", amount: 700, notes: "Dinner" },
  { id: 212, date: "2023-04-25", category: "Bills", amount: 900, notes: "Water bill" },
  { id: 213, date: "2023-04-30", category: "Food", amount: 460, notes: "Groceries" },
  
  // May 2023
  { id: 214, date: "2023-05-03", category: "Food", amount: 360, notes: "Lunch" },
  { id: 215, date: "2023-05-06", category: "Transport", amount: 460, notes: "Jeepney fares" },
  { id: 216, date: "2023-05-09", category: "Bills", amount: 1780, notes: "Meralco bill" },
  { id: 217, date: "2023-05-14", category: "Food", amount: 880, notes: "Restaurant" },
  { id: 218, date: "2023-05-19", category: "Entertainment", amount: 1050, notes: "Beach trip" },
  { id: 219, date: "2023-05-24", category: "Bills", amount: 1000, notes: "Internet bill" },
  { id: 220, date: "2023-05-29", category: "Food", amount: 540, notes: "Groceries" },
  
  // June 2023
  { id: 256, date: "2023-06-02", category: "Food", amount: 260, notes: "Breakfast" },
  { id: 257, date: "2023-06-05", category: "Transport", amount: 490, notes: "Grab rides" },
  { id: 258, date: "2023-06-08", category: "Bills", amount: 1950, notes: "Meralco bill (summer)" },
  { id: 259, date: "2023-06-13", category: "Entertainment", amount: 680, notes: "Movie" },
  { id: 260, date: "2023-06-18", category: "Food", amount: 640, notes: "Dinner" },
  { id: 261, date: "2023-06-23", category: "Bills", amount: 820, notes: "Water bill" },
  { id: 262, date: "2023-06-28", category: "Food", amount: 420, notes: "Groceries" },
  
  // July 2023
  { id: 221, date: "2023-07-04", category: "Food", amount: 390, notes: "Lunch" },
  { id: 222, date: "2023-07-07", category: "Transport", amount: 470, notes: "Transport pass" },
  { id: 223, date: "2023-07-10", category: "Bills", amount: 2100, notes: "Meralco bill" },
  { id: 224, date: "2023-07-15", category: "Food", amount: 810, notes: "Restaurant" },
  { id: 225, date: "2023-07-20", category: "Entertainment", amount: 570, notes: "Coffee" },
  { id: 226, date: "2023-07-25", category: "Bills", amount: 1100, notes: "Internet bill" },
  { id: 227, date: "2023-07-30", category: "Food", amount: 490, notes: "Groceries" },
  
  // August 2023
  { id: 228, date: "2023-08-03", category: "Food", amount: 340, notes: "Breakfast" },
  { id: 229, date: "2023-08-06", category: "Transport", amount: 520, notes: "Jeepney fares" },
  { id: 230, date: "2023-08-09", category: "Bills", amount: 1980, notes: "Meralco bill" },
  { id: 231, date: "2023-08-14", category: "Entertainment", amount: 1250, notes: "Concert" },
  { id: 232, date: "2023-08-19", category: "Food", amount: 690, notes: "Dinner" },
  { id: 233, date: "2023-08-24", category: "Bills", amount: 950, notes: "Water bill" },
  { id: 234, date: "2023-08-29", category: "Food", amount: 470, notes: "Groceries" },
  
  // September 2023
  { id: 263, date: "2023-09-02", category: "Food", amount: 300, notes: "Lunch" },
  { id: 264, date: "2023-09-05", category: "Transport", amount: 470, notes: "Grab rides" },
  { id: 265, date: "2023-09-08", category: "Bills", amount: 1750, notes: "Meralco bill" },
  { id: 266, date: "2023-09-13", category: "Food", amount: 720, notes: "Restaurant" },
  { id: 267, date: "2023-09-18", category: "Entertainment", amount: 500, notes: "Movie" },
  { id: 268, date: "2023-09-23", category: "Bills", amount: 1020, notes: "Internet bill" },
  { id: 269, date: "2023-09-28", category: "Food", amount: 450, notes: "Groceries" },
  
  // October 2023
  { id: 235, date: "2023-10-03", category: "Food", amount: 290, notes: "Breakfast" },
  { id: 236, date: "2023-10-06", category: "Transport", amount: 510, notes: "Transport pass" },
  { id: 237, date: "2023-10-09", category: "Bills", amount: 1680, notes: "Meralco bill" },
  { id: 238, date: "2023-10-14", category: "Entertainment", amount: 800, notes: "Cinema" },
  { id: 239, date: "2023-10-19", category: "Food", amount: 660, notes: "Dinner" },
  { id: 240, date: "2023-10-24", category: "Bills", amount: 890, notes: "Water bill" },
  { id: 241, date: "2023-10-28", category: "Food", amount: 300, notes: "Groceries" },
  { id: 242, date: "2023-10-30", category: "Transport", amount: 110, notes: "Grab ride" },
  
  // November 2023
  { id: 243, date: "2023-11-02", category: "Food", amount: 240, notes: "Tapsilog breakfast" },
  { id: 244, date: "2023-11-03", category: "Transport", amount: 70, notes: "Jeepney fare" },
  { id: 245, date: "2023-11-03", category: "Bills", amount: 1450, notes: "Meralco bill" },
  { id: 246, date: "2023-11-04", category: "Entertainment", amount: 380, notes: "Cinema ticket" },
  { id: 247, date: "2023-11-05", category: "Food", amount: 170, notes: "Lunch at carinderia" },
  { id: 248, date: "2023-11-06", category: "Transport", amount: 110, notes: "Grab ride" },
  { id: 249, date: "2023-11-08", category: "Bills", amount: 950, notes: "PLDT internet" },
  { id: 250, date: "2023-11-09", category: "Entertainment", amount: 280, notes: "Coffee with friends" },
  { id: 251, date: "2023-11-10", category: "Food", amount: 200, notes: "Dinner" },
  { id: 252, date: "2023-11-11", category: "Transport", amount: 50, notes: "Tricycle fare" },
  { id: 253, date: "2023-11-15", category: "Food", amount: 430, notes: "Restaurant" },
  { id: 254, date: "2023-11-20", category: "Bills", amount: 800, notes: "Water bill" },
  { id: 255, date: "2023-11-25", category: "Food", amount: 360, notes: "Groceries" },
  
  // December 2023
  { id: 270, date: "2023-12-02", category: "Food", amount: 380, notes: "Lunch" },
  { id: 271, date: "2023-12-05", category: "Transport", amount: 550, notes: "Holiday transport" },
  { id: 272, date: "2023-12-08", category: "Bills", amount: 1900, notes: "Meralco bill" },
  { id: 273, date: "2023-12-12", category: "Entertainment", amount: 1400, notes: "Christmas party" },
  { id: 274, date: "2023-12-15", category: "Food", amount: 1150, notes: "Holiday dinner" },
  { id: 275, date: "2023-12-20", category: "Entertainment", amount: 1800, notes: "Gift shopping" },
  { id: 276, date: "2023-12-23", category: "Food", amount: 900, notes: "Christmas groceries" },
  
  // January 2024
  { id: 132, date: "2024-01-05", category: "Food", amount: 340, notes: "Groceries" },
  { id: 133, date: "2024-01-08", category: "Bills", amount: 1720, notes: "Meralco bill" },
  { id: 134, date: "2024-01-10", category: "Transport", amount: 490, notes: "Monthly transport pass" },
  { id: 135, date: "2024-01-15", category: "Food", amount: 1150, notes: "Restaurant dinner" },
  { id: 136, date: "2024-01-20", category: "Entertainment", amount: 780, notes: "Movie tickets" },
  { id: 137, date: "2024-01-25", category: "Bills", amount: 1180, notes: "Internet bill" },
  { id: 138, date: "2024-01-28", category: "Food", amount: 440, notes: "Weekly groceries" },
  
  // February 2024
  { id: 139, date: "2024-02-03", category: "Food", amount: 270, notes: "Breakfast" },
  { id: 140, date: "2024-02-05", category: "Transport", amount: 580, notes: "Grab rides" },
  { id: 141, date: "2024-02-08", category: "Bills", amount: 1600, notes: "Meralco bill" },
  { id: 142, date: "2024-02-12", category: "Entertainment", amount: 1150, notes: "Concert tickets" },
  { id: 143, date: "2024-02-15", category: "Food", amount: 530, notes: "Valentine's dinner" },
  { id: 144, date: "2024-02-20", category: "Bills", amount: 800, notes: "Water bill" },
  { id: 172, date: "2024-02-25", category: "Food", amount: 380, notes: "Groceries" },
  { id: 173, date: "2024-02-28", category: "Transport", amount: 120, notes: "Jeepney fares" },
  
  // March 2024
  { id: 174, date: "2024-03-02", category: "Food", amount: 360, notes: "Lunch" },
  { id: 175, date: "2024-03-05", category: "Transport", amount: 440, notes: "Jeepney fares" },
  { id: 176, date: "2024-03-08", category: "Bills", amount: 1820, notes: "Meralco bill" },
  { id: 177, date: "2024-03-12", category: "Food", amount: 600, notes: "Restaurant" },
  { id: 178, date: "2024-03-18", category: "Entertainment", amount: 480, notes: "Coffee shop" },
  { id: 179, date: "2024-03-22", category: "Bills", amount: 1080, notes: "Internet bill" },
  { id: 180, date: "2024-03-28", category: "Food", amount: 490, notes: "Groceries" },
  { id: 181, date: "2024-03-30", category: "Transport", amount: 150, notes: "Grab ride" },
  
  // April 2024
  { id: 145, date: "2024-04-04", category: "Food", amount: 310, notes: "Breakfast" },
  { id: 146, date: "2024-04-07", category: "Transport", amount: 540, notes: "Transport pass" },
  { id: 147, date: "2024-04-10", category: "Bills", amount: 1680, notes: "Meralco bill" },
  { id: 148, date: "2024-04-15", category: "Entertainment", amount: 850, notes: "Cinema" },
  { id: 149, date: "2024-04-20", category: "Food", amount: 730, notes: "Dinner" },
  { id: 150, date: "2024-04-25", category: "Bills", amount: 920, notes: "Water bill" },
  { id: 182, date: "2024-04-28", category: "Food", amount: 450, notes: "Groceries" },
  { id: 183, date: "2024-04-30", category: "Transport", amount: 110, notes: "Jeepney fare" },
  
  // May 2024
  { id: 184, date: "2024-05-03", category: "Food", amount: 350, notes: "Lunch" },
  { id: 185, date: "2024-05-06", category: "Transport", amount: 470, notes: "Jeepney fares" },
  { id: 186, date: "2024-05-09", category: "Bills", amount: 1790, notes: "Meralco bill" },
  { id: 187, date: "2024-05-14", category: "Food", amount: 870, notes: "Restaurant" },
  { id: 188, date: "2024-05-19", category: "Entertainment", amount: 1080, notes: "Beach trip" },
  { id: 189, date: "2024-05-24", category: "Bills", amount: 1010, notes: "Internet bill" },
  { id: 190, date: "2024-05-29", category: "Food", amount: 520, notes: "Groceries" },
  { id: 191, date: "2024-05-31", category: "Transport", amount: 130, notes: "Grab ride" },
  
  // June 2024
  { id: 192, date: "2024-06-02", category: "Food", amount: 280, notes: "Breakfast" },
  { id: 193, date: "2024-06-05", category: "Transport", amount: 500, notes: "Grab rides" },
  { id: 194, date: "2024-06-08", category: "Bills", amount: 1970, notes: "Meralco bill (summer)" },
  { id: 195, date: "2024-06-13", category: "Entertainment", amount: 690, notes: "Movie" },
  { id: 196, date: "2024-06-18", category: "Food", amount: 650, notes: "Dinner" },
  { id: 197, date: "2024-06-23", category: "Bills", amount: 840, notes: "Water bill" },
  { id: 198, date: "2024-06-28", category: "Food", amount: 410, notes: "Groceries" },
  { id: 199, date: "2024-06-30", category: "Transport", amount: 140, notes: "Jeepney fare" },
  
  // July 2024
  { id: 151, date: "2024-07-04", category: "Food", amount: 400, notes: "Lunch" },
  { id: 152, date: "2024-07-07", category: "Transport", amount: 480, notes: "Transport pass" },
  { id: 153, date: "2024-07-10", category: "Bills", amount: 2150, notes: "Meralco bill" },
  { id: 154, date: "2024-07-15", category: "Food", amount: 830, notes: "Restaurant" },
  { id: 155, date: "2024-07-20", category: "Entertainment", amount: 580, notes: "Coffee" },
  { id: 156, date: "2024-07-25", category: "Bills", amount: 1120, notes: "Internet bill" },
  { id: 313, date: "2024-07-28", category: "Food", amount: 480, notes: "Groceries" },
  { id: 314, date: "2024-07-30", category: "Transport", amount: 160, notes: "Grab ride" },
  
  // August 2024
  { id: 315, date: "2024-08-03", category: "Food", amount: 330, notes: "Breakfast" },
  { id: 316, date: "2024-08-06", category: "Transport", amount: 530, notes: "Jeepney fares" },
  { id: 317, date: "2024-08-09", category: "Bills", amount: 1990, notes: "Meralco bill" },
  { id: 318, date: "2024-08-14", category: "Entertainment", amount: 1280, notes: "Concert" },
  { id: 319, date: "2024-08-19", category: "Food", amount: 680, notes: "Dinner" },
  { id: 320, date: "2024-08-24", category: "Bills", amount: 960, notes: "Water bill" },
  { id: 321, date: "2024-08-29", category: "Food", amount: 460, notes: "Groceries" },
  { id: 322, date: "2024-08-31", category: "Transport", amount: 125, notes: "Jeepney fare" },
  
  // September 2024
  { id: 323, date: "2024-09-02", category: "Food", amount: 310, notes: "Lunch" },
  { id: 324, date: "2024-09-05", category: "Transport", amount: 480, notes: "Grab rides" },
  { id: 325, date: "2024-09-08", category: "Bills", amount: 1760, notes: "Meralco bill" },
  { id: 326, date: "2024-09-13", category: "Food", amount: 710, notes: "Restaurant" },
  { id: 327, date: "2024-09-18", category: "Entertainment", amount: 510, notes: "Movie" },
  { id: 328, date: "2024-09-23", category: "Bills", amount: 1030, notes: "Internet bill" },
  { id: 329, date: "2024-09-28", category: "Food", amount: 440, notes: "Groceries" },
  { id: 330, date: "2024-09-30", category: "Transport", amount: 115, notes: "Jeepney fare" },
  
  // October 2024
  { id: 157, date: "2024-10-03", category: "Food", amount: 300, notes: "Breakfast" },
  { id: 158, date: "2024-10-06", category: "Transport", amount: 520, notes: "Transport pass" },
  { id: 159, date: "2024-10-09", category: "Bills", amount: 1730, notes: "Meralco bill" },
  { id: 160, date: "2024-10-14", category: "Entertainment", amount: 820, notes: "Cinema" },
  { id: 161, date: "2024-10-19", category: "Food", amount: 670, notes: "Dinner" },
  { id: 162, date: "2024-10-24", category: "Bills", amount: 900, notes: "Water bill" },
  { id: 163, date: "2024-10-28", category: "Food", amount: 310, notes: "Groceries" },
  { id: 312, date: "2024-10-30", category: "Transport", amount: 105, notes: "Grab ride" },
  
  // November 2024
  { id: 302, date: "2024-11-02", category: "Food", amount: 250, notes: "Tapsilog breakfast" },
  { id: 303, date: "2024-11-03", category: "Transport", amount: 75, notes: "Jeepney fare" },
  { id: 304, date: "2024-11-05", category: "Bills", amount: 1470, notes: "Meralco bill" },
  { id: 305, date: "2024-11-06", category: "Entertainment", amount: 390, notes: "Cinema ticket" },
  { id: 306, date: "2024-11-08", category: "Food", amount: 175, notes: "Lunch at carinderia" },
  { id: 307, date: "2024-11-10", category: "Transport", amount: 115, notes: "Grab ride" },
  { id: 308, date: "2024-11-12", category: "Bills", amount: 970, notes: "PLDT internet" },
  { id: 309, date: "2024-11-15", category: "Entertainment", amount: 290, notes: "Coffee with friends" },
  { id: 310, date: "2024-11-18", category: "Food", amount: 210, notes: "Dinner" },
  { id: 311, date: "2024-11-20", category: "Bills", amount: 810, notes: "Water bill" },
  { id: 301, date: "2024-11-25", category: "Food", amount: 370, notes: "Groceries" },
  { id: 300, date: "2024-11-28", category: "Transport", amount: 55, notes: "Tricycle fare" },
  
  // December 2024
  { id: 164, date: "2024-12-02", category: "Food", amount: 410, notes: "Lunch" },
  { id: 165, date: "2024-12-05", category: "Transport", amount: 570, notes: "Holiday transport" },
  { id: 166, date: "2024-12-08", category: "Bills", amount: 1920, notes: "Meralco bill" },
  { id: 167, date: "2024-12-12", category: "Entertainment", amount: 1450, notes: "Christmas party" },
  { id: 168, date: "2024-12-15", category: "Food", amount: 1180, notes: "Holiday dinner" },
  { id: 169, date: "2024-12-20", category: "Entertainment", amount: 1900, notes: "Gift shopping" },
  { id: 170, date: "2024-12-23", category: "Food", amount: 930, notes: "Christmas groceries" },
  { id: 171, date: "2024-12-25", category: "Entertainment", amount: 750, notes: "Christmas celebration" },
  
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


