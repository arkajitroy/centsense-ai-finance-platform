"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X, Target } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
// import { updateBudget } from "@/actions/budget";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(initialBudget?.amount?.toString() || "");

  //   const { loading: isLoading, fn: updateBudgetFn, data: updatedBudget, error } = useFetch(updateBudget);

  const percentUsed = initialBudget ? (currentExpenses / initialBudget.amount) * 100 : 0;

  const remainingBudget = initialBudget ? initialBudget.amount - currentExpenses : 0;

  const handleUpdateBudget = async () => {
    const amount = Number.parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    // await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  //   useEffect(() => {
  //     if (updatedBudget?.success) {
  //       setIsEditing(false);
  //       toast.success("Budget updated successfully");
  //     }
  //   }, [updatedBudget]);

  //   useEffect(() => {
  //     if (error) {
  //       toast.error(error.message || "Failed to update budget");
  //     }
  //   }, [error]);

  const getBudgetStatus = () => {
    if (percentUsed >= 100) return { label: "Over Budget", variant: "destructive" };
    if (percentUsed >= 90) return { label: "Almost Exceeded", variant: "destructive" };
    if (percentUsed >= 75) return { label: "High Usage", variant: "secondary" };
    return { label: "On Track", variant: "default" };
  };

  const status = getBudgetStatus();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold">Monthly Budget</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="w-32"
                    placeholder="Enter amount"
                    autoFocus
                    // disabled={isLoading}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleUpdateBudget}
                    // disabled={isLoading}
                    className="h-8 w-8"
                  >
                    <Check className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCancel}
                    //</div>disabled={isLoading}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ) : (
                <>
                  <CardDescription className="text-sm">
                    {initialBudget
                      ? `$${currentExpenses.toFixed(2)} of $${initialBudget.amount.toFixed(2)} spent`
                      : "No budget set for this month"}
                  </CardDescription>
                  <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} className="h-6 w-6">
                    <Pencil className="h-3 w-3" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        {initialBudget && (
          <Badge variant={status.variant} className="ml-auto">
            {status.label}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {initialBudget ? (
          <>
            <div className="space-y-3">
              <Progress
                value={Math.min(percentUsed, 100)}
                className="h-3"
                extraStyles={`${
                  percentUsed >= 90 ? "bg-red-500" : percentUsed >= 75 ? "bg-yellow-500" : "bg-green-500"
                }`}
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{percentUsed.toFixed(1)}% used</span>
                <span className={`font-medium ${remainingBudget >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ${Math.abs(remainingBudget).toFixed(2)} {remainingBudget >= 0 ? "remaining" : "over budget"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="text-center p-3 rounded-lg">
                <div className="text-lg font-semibold text-green-600">${currentExpenses.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">Spent</div>
              </div>
              <div className="text-center p-3 rounded-lg">
                <div className="text-lg font-semibold text-primary">${initialBudget.amount.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">Budget</div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-muted-foreground mb-2">No budget set</p>
            <p className="text-sm text-muted-foreground">Click the edit button to set your monthly budget</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
