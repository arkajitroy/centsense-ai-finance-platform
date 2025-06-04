import { Card, CardContent } from "@/components/ui/card";
import { dummyTransactions } from "@/data/dashboard";
import { CreateAccountDrawer } from "@/features/account/components/create-account-drawer";
import { getCurrentBudget } from "@/features/budget/server/action";
import { AccountCard } from "@/features/dashboard/components/account-card";
import { BudgetProgress } from "@/features/dashboard/components/budget-progress";
import { getUserAccounts } from "@/features/dashboard/server/action";
import { Plus } from "lucide-react";
import React from "react";

export default async function DashboardPage() {
  const accounts = await getUserAccounts();
  const transactions = dummyTransactions;
  let budgetData = null;

  const defaultAccount = accounts?.find((account) => account.isDefault);
  if (defaultAccount) budgetData = await getCurrentBudget(defaultAccount.id);

  // Calculate summary statistics
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  const monthlyIncome = transactions.filter((t) => t.type === "INCOME").reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = transactions.filter((t) => t.type === "EXPENSE").reduce((sum, t) => sum + t.amount, 0);

  const netIncome = monthlyIncome - monthlyExpenses;

  return (
    <div className="space-y-4">
      {/* Budget Progress */}
      <BudgetProgress initialBudget={budgetData?.budget} currentExpenses={budgetData?.currentExpenses || 0} />

      {/* Accounts Managment Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-all duration-200 cursor-pointer border-dashed hover:border-primary border-2">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-6 pb-6">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium">Add New Account</p>
              <p className="text-xs text-muted-foreground mt-1">Connect your bank or create manually</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {accounts.length > 0 && accounts?.map((account) => <AccountCard key={account.id} account={account} />)}
      </div>
    </div>
  );
}
