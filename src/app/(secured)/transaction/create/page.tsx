import React from "react";
import { getUserAccounts } from "@/features/dashboard/server/action";
import { AddTransactionForm } from "@/features/transaction/components/add-transactional-form";

const dummyAccounts = [
  {
    id: "1",
    name: "Primary Checking",
    balance: "5420.50",
    isDefault: true,
  },
  {
    id: "2",
    name: "Savings Account",
    balance: "12750.00",
    isDefault: false,
  },
  {
    id: "3",
    name: "Investment Portfolio",
    balance: "8930.25",
    isDefault: false,
  },
];

const dummyCategories = [
  { id: "food-dining", name: "Food & Dining", type: "EXPENSE" },
  { id: "utilities", name: "Utilities", type: "EXPENSE" },
  { id: "transportation", name: "Transportation", type: "EXPENSE" },
  { id: "entertainment", name: "Entertainment", type: "EXPENSE" },
  { id: "shopping", name: "Shopping", type: "EXPENSE" },
  { id: "healthcare", name: "Healthcare", type: "EXPENSE" },
  { id: "education", name: "Education", type: "EXPENSE" },
  { id: "travel", name: "Travel", type: "EXPENSE" },
  { id: "salary", name: "Salary", type: "INCOME" },
  { id: "freelance", name: "Freelance", type: "INCOME" },
  { id: "investment", name: "Investment Returns", type: "INCOME" },
  { id: "interest", name: "Interest", type: "INCOME" },
];

export default async function AddTransactionPage() {
  const accounts = await getUserAccounts();

  console.log("debug:accounts", accounts);

  return (
    <AddTransactionForm accounts={dummyAccounts} categories={dummyCategories} editMode={false} initialData={null} />
  );
}
