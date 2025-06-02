import { getAccountWithTransactions } from "@/features/account/server/action";
import React from "react";

type TAccountPageProps = {
  params: {
    id: string;
  };
};

export default async function AccountPage({ params }: TAccountPageProps) {
  const accountData = await getAccountWithTransactions(params.id);

  console.log("debug:accountData", accountData);

  return <div>Account Page</div>;
}
