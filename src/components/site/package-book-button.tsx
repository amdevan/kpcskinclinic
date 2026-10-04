"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import * as React from "react";
import { PackageBookingDialog } from "./package-booking-dialog";

export function PackageBookButton({ packageName, className, label = "Book this package" }: { packageName: string; className?: string; label?: string; }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} className={className || "bg-brand hover:bg-brand/90 text-brand-foreground w-full"}>
        <Calendar className="mr-1.5 h-4 w-4" /> {label}
      </Button>
      <PackageBookingDialog open={open} onOpenChange={setOpen} prefillPackage={packageName} />
    </>
  );
}
