import React, { PropsWithChildren } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TransactionLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Add Transaction
              </h1>
              <p className="text-muted-foreground">Create a new transaction or scan a receipt</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
