import { serve } from "inngest/next";
import { inngest } from "@/lib/inggest/client";
import { checkBudgetAlerts } from "@/lib/inggest/functions";

// import {
//   checkBudgetAlerts,
//   generateMonthlyReports,
//   processRecurringTransaction,
//   triggerRecurringTransactions,
// } from "@/lib/inngest/function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [checkBudgetAlerts],
  // functions: [processRecurringTransaction, triggerRecurringTransactions, generateMonthlyReports, checkBudgetAlerts],
});
