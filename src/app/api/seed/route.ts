import { seedTransactions } from "@/lib/scripts";

export async function GET() {
  const result = await seedTransactions();

  console.log("debug:GET result", result);
  return Response.json(result);
}
