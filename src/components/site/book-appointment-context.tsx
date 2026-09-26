"use client";

import * as React from "react";
import { BookAppointmentDialog } from "./book-appointment-dialog";

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  prefillService?: string;
  setPrefillService: (s?: string) => void;
};

const BookCtx = React.createContext<Ctx | null>(null);

export function BookAppointmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [prefillService, setPrefillService] = React.useState<string | undefined>(
    undefined
  );
  return (
    <BookCtx.Provider
      value={{
        open,
        setOpen: (v: boolean) => {
          if (!v) setPrefillService(undefined);
          setOpen(v);
        },
        prefillService,
        setPrefillService: (s?: string) => setPrefillService(s),
      }}
    >
      {children}
      <BookAppointmentDialog
        open={open}
        onOpenChange={setOpen}
        prefillService={prefillService}
      />
    </BookCtx.Provider>
  );
}

export function useBookAppointment() {
  const ctx = React.useContext(BookCtx);
  if (!ctx)
    throw new Error("useBookAppointment must be used within BookAppointmentProvider");
  return ctx;
}
