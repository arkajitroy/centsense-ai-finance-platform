"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema, TAccountSchema } from "../schema/account";
import useFetch from "@/hooks/use-fetch";
import { createAccount } from "@/features/dashboard/server/action";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export function CreateAccountDrawer({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<TAccountSchema>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: 0,
      isDefault: false,
    },
  });

  const { loading: createAccountLoading, fn: createAccountFn, error, data: newAccount } = useFetch(createAccount);

  const onSubmit: SubmitHandler<TAccountSchema> = async (data) => {
    await createAccountFn({
      ...data,
      balance: data.balance.toString(),
    });
  };

  useEffect(() => {
    if (newAccount) {
      toast.success("Account created successfully");
      reset();
      setOpen(false);
    }
  }, [newAccount, reset]);

  useEffect(() => {
    if (error && error instanceof Error) {
      toast.error(error.message || "Failed to create account");
    }
  }, [error]);

  console.log("debug:getValues", watch());

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Create New Account</DrawerTitle>
            <DrawerDescription>Add a new financial account to track your money.</DrawerDescription>
          </DrawerHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="account-name">Account Name</Label>
              <Input id="account-name" placeholder="e.g., Primary Checking" {...register("name")} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Account Type</Label>
              <Select
                defaultValue={watch("type")}
                onValueChange={(value) => setValue("type", value as TAccountSchema["type"])}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SAVINGS">Savings</SelectItem>
                  <SelectItem value="CURRENT">Current</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="initial-balance">Initial Balance</Label>
              <Input
                id="initial-balance"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("balance", { valueAsNumber: true })}
              />
              {errors.balance && <p className="text-sm text-red-500">{errors.balance.message}</p>}
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <label htmlFor="isDefault" className="text-base font-medium cursor-pointer">
                  Set as Default
                </label>
                <p className="text-sm text-muted-foreground">
                  This account will be selected by default for transactions
                </p>
              </div>
              <Switch
                id="isDefault"
                checked={watch("isDefault")}
                onCheckedChange={(checked) => setValue("isDefault", checked)}
              />
            </div>

            <DrawerFooter>
              <Button type="submit" disabled={createAccountLoading}>
                {createAccountLoading ? "Creating..." : "Create Account"}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
