import { Card, CardContent } from "@/components/ui/card";
import { dummyAccounts, dummyBudgetData, dummyTransactions } from "@/data/dashboard";
import { CreateAccountDrawer } from "@/features/account/components/create-account-drawer";
import { AccountCard } from "@/features/dashboard/components/account-card";
import { Plus } from "lucide-react";
import React from "react";

export default function DashboardPage() {
  const accounts = dummyAccounts;
  const transactions = dummyTransactions;
  const budgetData = dummyBudgetData;

  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Calculate summary statistics
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  const monthlyIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const netIncome = monthlyIncome - monthlyExpenses;

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-all duration-200 cursor-pointer border-dashed hover:border-primary border-2">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-6 pb-6">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium">Add New Account</p>
              <p className="text-xs text-muted-foreground mt-1">
                Connect your bank or create manually
              </p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {accounts.length > 0 &&
          accounts?.map((account) => <AccountCard key={account.id} account={account} />)}
      </div>
    </div>
  );
}
