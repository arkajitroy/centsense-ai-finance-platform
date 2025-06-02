// Dummy data for demonstration
export const dummyAccounts = [
  {
    id: "1",
    name: "Primary Checking",
    type: "CHECKING",
    balance: 5420.5,
    isDefault: true,
  },
  {
    id: "2",
    name: "Savings Account",
    type: "SAVINGS",
    balance: 12750.0,
    isDefault: false,
  },
  {
    id: "3",
    name: "Investment Portfolio",
    type: "INVESTMENT",
    balance: 8930.25,
    isDefault: false,
  },
];

export const dummyTransactions = [
  {
    id: "1",
    accountId: "1",
    description: "Grocery Shopping",
    amount: 125.5,
    type: "EXPENSE",
    category: "Food & Dining",
    date: "2024-01-15",
  },
  {
    id: "2",
    accountId: "1",
    description: "Salary Deposit",
    amount: 3500.0,
    type: "INCOME",
    category: "Salary",
    date: "2024-01-14",
  },
  {
    id: "3",
    accountId: "1",
    description: "Electric Bill",
    amount: 89.75,
    type: "EXPENSE",
    category: "Utilities",
    date: "2024-01-13",
  },
  {
    id: "4",
    accountId: "1",
    description: "Coffee Shop",
    amount: 12.5,
    type: "EXPENSE",
    category: "Food & Dining",
    date: "2024-01-12",
  },
  {
    id: "5",
    accountId: "2",
    description: "Interest Payment",
    amount: 45.2,
    type: "INCOME",
    category: "Interest",
    date: "2024-01-10",
  },
];

export const dummyBudgetData = {
  budget: { amount: 2000 },
  currentExpenses: 1250.75,
};
