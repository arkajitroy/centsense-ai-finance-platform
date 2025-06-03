import { AccountChart } from "@/features/account/components/account-charts";
import { AccountHeader } from "@/features/account/components/account-header";
import { TransactionTable } from "@/features/account/components/transactions-table";
import { getAccountWithTransactions } from "@/features/account/server/action";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";

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

      {/* Chart Section */}
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}>
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Transactions Table */}
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}>
        <TransactionTable transactions={transactions} />
      </Suspense>
    </main>
  );
}
