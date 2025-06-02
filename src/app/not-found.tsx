import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16 text-center bg-background">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] h-[300px] bg-gradient-to-br from-indigo-500 via-slate-500 to-indigo-500 opacity-20 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-xl">
        <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-sm mb-6">
          404
        </h1>
        <h2 className="text-3xl font-semibold mb-4 text-foreground">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="default" size="lg" className="px-6">
            Return Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
