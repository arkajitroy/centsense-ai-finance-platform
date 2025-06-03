"use client";

import { ArrowLeft, Settings, TrendingUp, Shield, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function AccountHeader({ account }: any) {
  const router = useRouter();

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "CHECKING":
        return "💳";
      case "SAVINGS":
        return "🏦";
      case "INVESTMENT":
        return "📈";
      case "CREDIT":
        return "💎";
      default:
        return "💰";
    }
  };

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case "CHECKING":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "SAVINGS":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "INVESTMENT":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "CREDIT":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-4">
      {/* Navigation */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm text-muted-foreground">
          <span>Dashboard</span> <span className="mx-1">/</span> <span>Accounts</span> <span className="mx-1">/</span>{" "}
          <span className="text-foreground">{account.name}</span>
        </div>
      </div>

      {/* Account Header Card */}
      <Card className="overflow-hidden">
        <div className="">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{getAccountIcon(account.type)}</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold tracking-tight">{account.name}</h1>
                    {account.isDefault && (
                      <Badge variant="secondary" className="gap-1">
                        <Star className="h-3 w-3" />
                        Default
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getAccountTypeColor(account.type)}>
                      {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Shield className="h-3 w-3" />
                      Secured
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    {account._count.transactions} transactions • Last updated today
                  </p>
                </div>
              </div>

              <div className="text-right space-y-2">
                <div className="text-3xl font-bold">${Number.parseFloat(account.balance).toLocaleString()}</div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>+2.5% this month</span>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Manage Account
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
