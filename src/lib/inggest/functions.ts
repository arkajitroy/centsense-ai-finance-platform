import { isNewMonth } from "../utils";
import { inngest } from "./client";
import db from "@/lib/prisma";

export const checkBudgetAlerts = inngest.createFunction(
  {
    name: "Check Budget Alerts",
    id: "",
  },
  { cron: "0 */6 * * *" },
  async ({ step }) => {
    const budgets = await step.run("fetch-budgets", async () => {
      return await db.budget.findMany({
        include: {
          user: {
            include: {
              accounts: {
                where: { isDefault: true },
              },
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

        const totalExpenses = expenses._sum.amount?.toNumber() || 0;
        const percentageUsed = (totalExpenses / Number(budget.amount)) * 100;

        console.log("debug-percentageUsed and totalExpenses", {
          percentageUsed,
          totalExpenses,
          budget,
          lastAlertSent: budget.lastAlertSent,
        });

        if (percentageUsed >= 80 && (!budget.lastAlertSent || isNewMonth(new Date(budget.lastAlertSent), new Date()))) {
          console.log("debug-percentageUsed and totalExpenses", {
            percentageUsed,
            totalExpenses,
            budget,
            lastAlertSent: budget.lastAlertSent,
          });

          //   await sendEmail({
          //     to: budget.user.email,
          //     subject: `Budget Alert for ${defaultAccount.name}`,
          //     react: EmailTemplate({
          //       userName: budget.user.name,
          //       type: "budget-alert",
          //       data: {
          //         percentageUsed,
          //         budgetAmount: parseInt(budget.amount.toString()).toFixed(1),
          //         totalExpenses: parseInt(totalExpenses.toString()).toFixed(1),
          //         accountName: defaultAccount.name,
          //       },
          //     }),
          //   });

          await db.budget.update({
            where: { id: budget.id },
            data: { lastAlertSent: new Date() },
          });
        }
      });
    }
  }
);
