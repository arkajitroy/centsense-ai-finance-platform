import { AccountHeader } from "@/features/account/components/account-header";
import { TransactionTable } from "@/features/account/components/transactions-table";
import { getAccountWithTransactions } from "@/features/account/server/action";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";

const dummyAccountData = {
  id: "1",
  name: "Primary Checking",
  type: "CHECKING",
  balance: 5420.5,
  isDefault: true,
  _count: { transactions: 45 },
  transactions: [
    {
      id: "1",
      accountId: "1",
      description: "Grocery Shopping at Whole Foods",
      amount: 125.5,
      type: "EXPENSE",
      category: "Food & Dining",
      date: "2024-01-15",
      isRecurring: false,
    },
    {
      id: "2",
      accountId: "1",
      description: "Monthly Salary Deposit",
      amount: 3500.0,
      type: "INCOME",
      category: "Salary",
      date: "2024-01-14",
      isRecurring: true,
      recurringInterval: "MONTHLY",
      nextRecurringDate: "2024-02-14",
    },
    {
      id: "3",
      accountId: "1",
      description: "Electric Bill Payment",
      amount: 89.75,
      type: "EXPENSE",
      category: "Utilities",
      date: "2024-01-13",
      isRecurring: true,
      recurringInterval: "MONTHLY",
      nextRecurringDate: "2024-02-13",
    },
    {
      id: "4",
      accountId: "1",
      description: "Coffee Shop - Daily Brew",
      amount: 12.5,
      type: "EXPENSE",
      category: "Food & Dining",
      date: "2024-01-12",
      isRecurring: false,
    },
    {
      id: "5",
      accountId: "1",
      description: "Freelance Project Payment",
      amount: 850.0,
      type: "INCOME",
      category: "Freelance",
      date: "2024-01-11",
      isRecurring: false,
    },
    {
      id: "6",
      accountId: "1",
      description: "Gas Station Fill-up",
      amount: 45.25,
      type: "EXPENSE",
      category: "Transportation",
      date: "2024-01-10",
      isRecurring: false,
    },
    {
      id: "7",
      accountId: "1",
      description: "Netflix Subscription",
      amount: 15.99,
      type: "EXPENSE",
      category: "Entertainment",
      date: "2024-01-09",
      isRecurring: true,
      recurringInterval: "MONTHLY",
      nextRecurringDate: "2024-02-09",
    },
    {
      id: "8",
      accountId: "1",
      description: "Online Course Purchase",
      amount: 199.0,
      type: "EXPENSE",
      category: "Education",
      date: "2024-01-08",
      isRecurring: false,
    },
  ],
};

type TAccountPageProps = {
  params: {
    id: string;
  };
};

export default async function AccountPage({ params }: TAccountPageProps) {
  const accountData = await getAccountWithTransactions(params.id);

  // redirects to 404 page
  if (!accountData) notFound();

  const { transactions, ...account } = accountData;

  console.log("debug:accountData", accountData);

  return (
    <main className="py-4 px-10 space-y-4">
      <AccountHeader account={account} />

      {/* Transactions Table */}
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}>
        <TransactionTable transactions={transactions} />
      </Suspense>
    </main>
  );
}
