"use client";

import { MouseEvent, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import useFetch from "@/hooks/use-fetch";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
// import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";
import { TAccountSchema } from "@/features/account/schema/account";

type AccountCardProps = {
  key: string;
  account: TAccountSchema & {
    id: string;
  };
};

export function AccountCard({ account }: AccountCardProps) {
  const { id, name, balance, isDefault, type } = account;

  // const {
  //   loading: updateDefaultLoading,
  //   fn: updateDefaultFn,
  //   data: updatedAccount,
  //   error,
  // } = useFetch(updateDefaultAccount);

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "CHECKING":
        return "💳";
      case "SAVINGS":
        return "🏦";
      case "INVESTMENT":
        return "📈";
      default:
        return "💰";
    }
  };

  const handleDefaultChange = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id);
  };

  // useEffect(() => {
  //   if (updatedAccount?.success) {
  //     toast.success("Default account updated successfully");
  //   }
  // }, [updatedAccount]);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error.message || "Failed to update default account");
  //   }
  // }, [error]);

  return (
    <Card className="hover:shadow-lg transition-all duration-200 group relative overflow-hidden">
      <Link href={`/account/${id}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getAccountIcon(type)}</span>
            <CardTitle className="text-sm font-medium capitalize">{name}</CardTitle>
            {isDefault && (
              <Badge variant="default" className="text-xs">
                Default
              </Badge>
            )}
          </div>
          <Switch checked={isDefault} onClick={handleDefaultChange} />
        </CardHeader>
        <CardContent className="relative">
          <div className="text-3xl font-bold mb-1">${Number.parseFloat(String(balance)).toLocaleString()}</div>
          <p className="text-sm text-muted-foreground">{type.charAt(0) + type.slice(1).toLowerCase()} Account</p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground relative">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
