import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-sidebar-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md mr-2 bg-primary"></div>
            <h1 className="text-2xl font-bold tracking-tight text-primary">
              Centsense<span className="text-sidebar-accent">AI</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-sm hover:text-white cursor-pointer"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
              </Link>
              <Link href="/transaction/create">
                <Button className="flex items-center gap-2 text-sm bg-primary text-primary-foreground cursor-pointer">
                  <PenBox className="h-4 w-4" />
                  <span className="hidden md:inline">Add Transaction</span>
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-sm font-medium"
                >
                  Sign In
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
