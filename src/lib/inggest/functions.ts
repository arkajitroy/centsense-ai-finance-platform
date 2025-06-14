import { isNewMonth } from "../utils";
import { inngest } from "./client";
import db from "@/lib/prisma";

export const checkBudgetAlerts = inngest.createFunction(
  { name: "Check Budget Alerts", id: "" },
  { cron: "0 */6 * * *" },
  async ({ step }) => {
    const budgets = await step.run("fetch-budgets", async () => {
      return db.budget.findMany({
        include: {
          user: {
            include: {
              accounts: { where: { isDefault: true } },
            },
          },
        },
      });
    });

    for (const budget of budgets) {
      const defaultAccount = budget.user.accounts[0];
      if (!defaultAccount) continue;

      await step.run(`check-budget-${budget.id}`, async () => {
        const startDate = new Date();
        startDate.setDate(1);

        const expenses = await db.transaction.aggregate({
          where: {
            userId: budget.userId,
            accountId: defaultAccount.id,
            type: "EXPENSE",
            date: { gte: startDate },
          },
          _sum: { amount: true },
        });

        const totalExpenses = expenses._sum.amount?.toNumber() ?? 0;
        const budgetAmount = budget.amount;
        const percentageUsed = (totalExpenses / parseFloat(budgetAmount)) * 100;

        console.log("debug-cron:", { budgetAmount, percentageUsed });

        if (percentageUsed >= 80 && (!budget.lastAlertSent || isNewMonth(new Date(budget.lastAlertSent), new Date()))) {
          console.log("debug-cron-inside:", { budgetAmount, percentageUsed });
          // await sendEmail({
          //   to: budget.user.email,
          //   subject: `Budget Alert for ${defaultAccount.name}`,
          //   react: EmailTemplate({
          //     userName: budget.user.name,
          //     type: "budget-alert",
          //     data: {
          //       percentageUsed,
          //       budgetAmount: budgetAmount.toFixed(1),
          //       totalExpenses: totalExpenses.toFixed(1),
          //       accountName: defaultAccount.name,
          //     },
          //   }),
          // });

          await db.budget.update({
            where: { id: budget.id },
            data: { lastAlertSent: new Date() },
          });
        }
      });
    }
  }
);
