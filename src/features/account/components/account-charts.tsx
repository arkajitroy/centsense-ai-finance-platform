"use client";

import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const DATE_RANGES = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  ALL: { label: "All Time", days: null },
};

export function AccountChart({ transactions }) {
  const [dateRange, setDateRange] = useState("1M");

  const filteredData = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();
    const startDate = range.days ? startOfDay(subDays(now, range.days)) : startOfDay(new Date(0));

    // Filter transactions within date range
    const filtered = transactions.filter((t) => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startDate && transactionDate <= endOfDay(now);
    });

    // Group transactions by date
    const grouped = filtered.reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), "MMM dd");
      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }
      if (transaction.type === "INCOME") {
        acc[date].income += Number(transaction.amount);
      } else {
        acc[date].expense += Number(transaction.amount);
      }
      return acc;
    }, {});

    // Convert to array and sort by date
    const result = Object.values(grouped).sort((a, b) => {
      const dateA = new Date(a.date + ", 2024");
      const dateB = new Date(b.date + ", 2024");
      return dateA - dateB;
    });

    return result;
  }, [transactions, dateRange]);

  // Calculate totals for the selected period
  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, day) => ({
        income: acc.income + (day.income || 0),
        expense: acc.expense + (day.expense || 0),
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData]);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-2xl text-primary font-bold">Transaction Overview</CardTitle>
          <p className="text-sm text-muted-foreground">Income vs expenses over time</p>
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(DATE_RANGES).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Income</p>
            <p className="text-xl font-bold text-green-600">${totals.income.toFixed(2)}</p>
          </div>
          <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-xl font-bold text-red-600">${totals.expense.toFixed(2)}</p>
          </div>
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <p className="text-sm text-muted-foreground">Net</p>
            <div className="flex items-center justify-center gap-2">
              <p
                className={`text-xl font-bold ${
                  totals.income - totals.expense >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ${(totals.income - totals.expense).toFixed(2)}
              </p>
              <Badge variant={totals.income - totals.expense >= 0 ? "default" : "destructive"}>
                {totals.income - totals.expense >= 0 ? "Surplus" : "Deficit"}
              </Badge>
            </div>
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="h-[350px] flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="text-4xl">📊</div>
              <p className="text-muted-foreground">No transaction data available</p>
              <p className="text-sm text-muted-foreground">Try selecting a different date range</p>
            </div>
          </div>
        ) : (
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis
                  dataKey="date"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <Tooltip
                  formatter={(value, name) => [`$${Number(value).toFixed(2)}`, name]}
                  labelFormatter={(label) => `Date: ${label}`}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend />
                <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={60} />
                <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
