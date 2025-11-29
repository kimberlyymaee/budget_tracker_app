export type ExpenseCategory = "Food" | "Transport" | "Bills" | "Entertainment";

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
  monthlyBudget: number;
};

export const mockUser: User = {
  id: 1,
  name: "Juan Dela Cruz",
  email: "juan@example.com",
  monthlyBudget: 20000,
};

export const mockExpenses: Expense[] = [
  {
    id: 1,
    date: "2025-11-02",
    category: "Food",
    amount: 250,
    notes: "Tapsilog breakfast",
  },
  {
    id: 2,
    date: "2025-11-03",
    category: "Transport",
    amount: 80,
    notes: "Jeepney fare",
  },
  {
    id: 3,
    date: "2025-11-03",
    category: "Bills",
    amount: 1500,
    notes: "Meralco bill",
  },
  {
    id: 4,
    date: "2025-11-04",
    category: "Entertainment",
    amount: 400,
    notes: "Cinema ticket",
  },
  {
    id: 5,
    date: "2025-11-05",
    category: "Food",
    amount: 180,
    notes: "Lunch at carinderia",
  },
  {
    id: 6,
    date: "2025-11-06",
    category: "Transport",
    amount: 120,
    notes: "Grab ride",
  },
  {
    id: 7,
    date: "2025-11-08",
    category: "Bills",
    amount: 999,
    notes: "PLDT internet",
  },
  {
    id: 8,
    date: "2025-11-09",
    category: "Entertainment",
    amount: 300,
    notes: "Coffee with friends",
  },
  {
    id: 9,
    date: "2025-11-10",
    category: "Food",
    amount: 220,
    notes: "Dinner",
  },
  {
    id: 10,
    date: "2025-11-11",
    category: "Transport",
    amount: 60,
    notes: "Tricycle fare",
  },
  {
    id: 11,
    date: "2025-10-28",
    category: "Bills",
    amount: 700,
    notes: "Water bill",
  },
  {
    id: 12,
    date: "2025-10-30",
    category: "Food",
    amount: 320,
    notes: "Groceries",
  },
];

export const peso = (amount: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(amount);


