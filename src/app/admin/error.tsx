"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-8">
      <div className="h-16 w-16 rounded-full bg-rust/10 flex items-center justify-center">
        <AlertCircle className="h-8 w-8 text-rust" />
      </div>
      <div className="text-center">
        <h2 className="font-display text-xl font-bold text-ink mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-muted-foreground max-w-md">
          There was an error loading this page. This is usually a temporary
 database connection issue. Try refreshing.
        </p>
        {error?.message && (
          <p className="text-xs text-muted-foreground/60 mt-2 font-mono">
            {error.message}
          </p>
        )}
      </div>
      <Button onClick={reset} className="bg-brand hover:bg-brand/90 text-brand-foreground">
        <RefreshCw className="h-4 w-4 mr-1.5" />
        Try again
      </Button>
    </div>
  );
}
