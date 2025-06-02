/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth } from "@clerk/nextjs/server";
import { Account, Transaction } from "../../../../prisma/generated";
import { request } from "@arcjet/next";
import aj from "@/lib/arkjet";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type SerializedAccount = Omit<Account, "balance"> & { balance: number };
type SerializedTransaction = Omit<Transaction, "amount"> & { amount: number };

// You can add more strict input types for account creation
interface CreateAccountInput {
  name: string;
  balance: string;
  isDefault: boolean;
}

export const createAccount = async (
  data: CreateAccountInput
): Promise<{ success: boolean; data: SerializedAccount }> => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const req = await request();

    const decision = await aj.protect(req, {
      userId,
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        const { remaining, reset } = decision.reason;
        console.error({
          code: "RATE_LIMIT_EXCEEDED",
          details: { remaining, resetInSeconds: reset },
        });
        throw new Error("Too many requests. Please try again later.");
      }

      throw new Error("Request blocked");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) throw new Error("Invalid balance amount");

    const existingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    const shouldBeDefault = existingAccounts.length === 0 ? true : data.isDefault;

    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault, // Override the isDefault based on our logic
      },
    });

    revalidatePath("/dashboard");
    return { success: true, data: serializeTransaction(account) };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export async function getUserAccounts(): Promise<SerializedAccount[]> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    return accounts.map(serializeTransaction);
  } catch (error) {
    console.error((error as Error).message);
    throw new Error("Failed to fetch user accounts");
  }
}

export async function getDashboardData(): Promise<SerializedTransaction[]> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return transactions.map(serializeTransaction);
}

function serializeTransaction(obj: any): any {
  const serialized = { ...obj };
  if (obj.balance !== undefined && obj.balance !== null) {
    serialized.balance = Number(obj.balance);
  }
  if (obj.amount !== undefined && obj.amount !== null) {
    serialized.amount = Number(obj.amount);
  }
  return serialized;
}
