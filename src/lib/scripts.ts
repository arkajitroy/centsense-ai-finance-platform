/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/prisma";
import { subDays } from "date-fns";
import { TransactionType, TransactionStatus } from "@prisma/client"; // Assumes these enums exist

const ACCOUNT_ID = "08c4bcbf-b65e-493f-9f63-5b28d0009272";
const USER_ID = "8e8b1bcf-44c6-4224-ae2b-a91ff517f442";

type CategoryType = "INCOME" | "EXPENSE";

type CategoryRange = {
  name: string;
  range: [number, number];
};

const CATEGORIES: Record<CategoryType, CategoryRange[]> = {
  INCOME: [
    { name: "salary", range: [5000, 8000] },
    { name: "freelance", range: [1000, 3000] },
    { name: "investments", range: [500, 2000] },
    { name: "other-income", range: [100, 1000] },
  ],
  EXPENSE: [
    { name: "housing", range: [1000, 2000] },
    { name: "transportation", range: [100, 500] },
    { name: "groceries", range: [200, 600] },
    { name: "utilities", range: [100, 300] },
    { name: "entertainment", range: [50, 200] },
    { name: "food", range: [50, 150] },
    { name: "shopping", range: [100, 500] },
    { name: "healthcare", range: [100, 1000] },
    { name: "education", range: [200, 1000] },
    { name: "travel", range: [500, 2000] },
  ],
};

function getRandomAmount(min: number, max: number): number {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

function getRandomCategory(type: CategoryType): { category: string; amount: number } {
  const categories = CATEGORIES[type];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const amount = getRandomAmount(category.range[0], category.range[1]);
  return { category: category.name, amount };
}

export async function seedTransactions(): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  try {
    const transactions: {
      id: string;
      type: TransactionType;
      amount: number;
      description: string;
      date: Date;
      category: string;
      status: TransactionStatus;
      userId: string;
      accountId: string;
      createdAt: Date;
      updatedAt: Date;
    }[] = [];

    let totalBalance = 0;

    for (let i = 90; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const transactionsPerDay = Math.floor(Math.random() * 3) + 1;

      for (let j = 0; j < transactionsPerDay; j++) {
        const type: TransactionType = Math.random() < 0.4 ? "INCOME" : "EXPENSE";
        const { category, amount } = getRandomCategory(type);

        const transaction = {
          id: crypto.randomUUID(),
          type,
          amount,
          description: `${type === "INCOME" ? "Received" : "Paid for"} ${category}`,
          date,
          category,
          status: "COMPLETED" as TransactionStatus,
          userId: USER_ID,
          accountId: ACCOUNT_ID,
          createdAt: date,
          updatedAt: date,
        };

        totalBalance += type === "INCOME" ? amount : -amount;
        transactions.push(transaction);
      }
    }

    // Step 1: Delete existing transactions
    await db.transaction.deleteMany({ where: { accountId: ACCOUNT_ID } });

    // Step 2: Insert new transactions in batches
    const BATCH_SIZE = 100;
    for (let i = 0; i < transactions.length; i += BATCH_SIZE) {
      const batch = transactions.slice(i, i + BATCH_SIZE);
      await db.transaction.createMany({ data: batch });
    }

    // Step 3: Update account balance
    await db.account.update({
      where: { id: ACCOUNT_ID },
      data: { balance: totalBalance },
    });

    return {
      success: true,
      message: `Created ${transactions.length} transactions`,
    };
  } catch (error: any) {
    console.error("Error seeding transactions:", error);
    return { success: false, error: error.message };
  }
}
