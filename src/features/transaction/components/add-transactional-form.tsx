"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2, DollarSign, FileText, Repeat, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
// import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { cn } from "@/lib/utils";
import { CreateAccountDrawer } from "@/features/account/components/create-account-drawer";
import { z } from "zod";
// import { createTransaction, updateTransaction } from "@/actions/transaction";
// import { transactionSchema } from "@/app/lib/schema";
// import { ReceiptScanner } from "./receipt-scanner";

export const transactionSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]),
  amount: z.string().min(1, "Amount is required"),
  description: z.string().min(1, "Description is required"),
  accountId: z.string().min(1, "Account is required"),
  category: z.string().min(1, "Category is required"),
  date: z.date(),
  isRecurring: z.boolean(),
  recurringInterval: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]).optional(),
});

interface Account {
  id: string;
  name: string;
  balance: string;
  isDefault: boolean;
}

interface Category {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
}

interface TransactionFormProps {
  accounts: Account[];
  categories: Category[];
  editMode?: boolean;
  initialData?: any;
}

export function AddTransactionForm({
  accounts,
  categories,
  editMode = false,
  initialData = null,
}: TransactionFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  //   const editId = searchParams.get("edit");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues:
      editMode && initialData
        ? {
            type: initialData.type,
            amount: initialData.amount.toString(),
            description: initialData.description,
            accountId: initialData.accountId,
            category: initialData.category,
            date: new Date(initialData.date),
            isRecurring: initialData.isRecurring,
            ...(initialData.recurringInterval && {
              recurringInterval: initialData.recurringInterval,
            }),
          }
        : {
            type: "EXPENSE",
            amount: "",
            description: "",
            accountId: accounts.find((ac) => ac.isDefault)?.id,
            date: new Date(),
            isRecurring: false,
          },
  });

  //   const {
  //     loading: transactionLoading,
  //     fn: transactionFn,
  //     data: transactionResult,
  //   } = useFetch(editMode ? updateTransaction : createTransaction);

  //   const onSubmit = (data: any) => {
  //     const formData = {
  //       ...data,
  //       amount: Number.parseFloat(data.amount),
  //     };

  //     if (editMode) {
  //       transactionFn(editId, formData);
  //     } else {
  //       transactionFn(formData);
  //     }
  //   };

  const handleScanComplete = (scannedData: any) => {
    if (scannedData) {
      setValue("amount", scannedData.amount.toString());
      setValue("date", new Date(scannedData.date));
      if (scannedData.description) {
        setValue("description", scannedData.description);
      }
      if (scannedData.category) {
        setValue("category", scannedData.category);
      }
      toast.success("Receipt scanned successfully");
    }
  };

  //   useEffect(() => {
  //     if (transactionResult?.success && !transactionLoading) {
  //       toast.success(editMode ? "Transaction updated successfully" : "Transaction created successfully");
  //       reset();
  //       router.push(`/account/${transactionResult.data.accountId}`);
  //     }
  //   }, [transactionResult, transactionLoading, editMode, reset, router]);

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");
  const selectedAccount = accounts.find((acc) => acc.id === getValues("accountId"));

  const filteredCategories = categories.filter((category) => category.type === type);

  const getCategoryEmoji = (categoryName: string) => {
    const emojiMap: Record<string, string> = {
      "Food & Dining": "🍽️",
      Utilities: "⚡",
      Transportation: "🚗",
      Entertainment: "🎬",
      Shopping: "🛍️",
      Healthcare: "🏥",
      Education: "📚",
      Travel: "✈️",
      Salary: "💰",
      Freelance: "💼",
      "Investment Returns": "📈",
      Interest: "🏦",
    };
    return emojiMap[categoryName] || "💰";
  };

  return (
    <div className="space-y-6">
      {/* Receipt Scanner - Only show in create mode */}
      {!editMode && (
        <Card className="overflow-hidden border-2 border-dashed border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-lg">
              <span className="text-2xl">🤖</span>
              AI Receipt Scanner
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Upload a receipt and let AI extract transaction details automatically
            </p>
          </CardHeader>
          {/* <CardContent>
            <ReceiptScanner onScanComplete={handleScanComplete} />
          </CardContent> */}
        </Card>
      )}

      {/* Transaction Form */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Transaction Details
          </CardTitle>
          <p className="text-sm text-muted-foreground">Fill in the transaction information below</p>
        </CardHeader>
        <CardContent className="p-6">
          <form
            // onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Transaction Type */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <span className="text-lg">💱</span>
                Transaction Type
              </label>
              <Select onValueChange={(value) => setValue("type", value)} defaultValue={type}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EXPENSE" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      Expense
                    </div>
                  </SelectItem>
                  <SelectItem value="INCOME" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      Income
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {/* {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>} */}
            </div>

            {/* Amount and Account */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Amount
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="h-12 pl-8 text-lg font-semibold"
                    {...register("amount")}
                  />
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                {/* {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>} */}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Account
                </label>
                <Select onValueChange={(value) => setValue("accountId", value)} defaultValue={getValues("accountId")}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{account.name}</span>
                          <Badge variant="outline" className="ml-2">
                            ${Number.parseFloat(account.balance).toFixed(2)}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                    <Separator className="my-2" />
                    <CreateAccountDrawer>
                      <Button
                        variant="ghost"
                        className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                      >
                        + Create New Account
                      </Button>
                    </CreateAccountDrawer>
                  </SelectContent>
                </Select>
                {selectedAccount && (
                  <div className="text-xs text-muted-foreground">
                    Current balance: ${Number.parseFloat(selectedAccount.balance).toFixed(2)}
                  </div>
                )}
                {/* {errors.accountId && <p className="text-sm text-red-500">{errors.accountId.message}</p>} */}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <span className="text-lg">🏷️</span>
                Category
              </label>
              <Select onValueChange={(value) => setValue("category", value)} defaultValue={getValues("category")}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {filteredCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <span>{getCategoryEmoji(category.name)}</span>
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>} */}
            </div>

            {/* Date */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 pl-3 text-left font-normal justify-start",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => setValue("date", date)}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>} */}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Description
              </label>
              <Input placeholder="Enter transaction description" className="h-12" {...register("description")} />
              {/* {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>} */}
            </div>

            {/* Recurring Toggle */}
            <Card className="border-2 border-dashed border-primary/20">
              <CardContent className="p-4">
                <div className="flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-base font-medium flex items-center gap-2">
                      <Repeat className="h-4 w-4" />
                      Recurring Transaction
                    </label>
                    <div className="text-sm text-muted-foreground">
                      Set up a recurring schedule for this transaction
                    </div>
                  </div>
                  <Switch checked={isRecurring} onCheckedChange={(checked) => setValue("isRecurring", checked)} />
                </div>
              </CardContent>
            </Card>

            {/* Recurring Interval */}
            {isRecurring && (
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Repeat className="h-4 w-4" />
                  Recurring Interval
                </label>
                <Select
                  onValueChange={(value) => setValue("recurringInterval", value)}
                  defaultValue={getValues("recurringInterval")}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DAILY">🗓️ Daily</SelectItem>
                    <SelectItem value="WEEKLY">📅 Weekly</SelectItem>
                    <SelectItem value="MONTHLY">🗓️ Monthly</SelectItem>
                    <SelectItem value="YEARLY">📆 Yearly</SelectItem>
                  </SelectContent>
                </Select>
                {/* {errors.recurringInterval && <p className="text-sm text-red-500">{errors.recurringInterval.message}</p>} */}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <Button type="button" variant="outline" className="w-full h-12" onClick={() => router.back()}>
                Cancel
              </Button>
              {/* <Button type="submit" className="w-full h-12" disabled={transactionLoading}>
                {transactionLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {editMode ? "Updating..." : "Creating..."}
                  </>
                ) : editMode ? (
                  "Update Transaction"
                ) : (
                  "Create Transaction"
                )}
              </Button> */}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
