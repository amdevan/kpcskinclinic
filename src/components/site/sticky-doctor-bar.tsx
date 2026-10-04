"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { useBookAppointment } from "./book-appointment-context";

export function StickyDoctorBar({ doctorName, doctorRole, experience }: { doctorName: string; doctorRole: string; experience?: string; }) {
  const [visible, setVisible] = React.useState(false);
  const { setOpen, setPrefillService } = useBookAppointment();

  React.useEffect(() => {
    const onScroll = () => { const y = window.scrollY; const max = document.body.scrollHeight - window.innerHeight - 600; setVisible(y > 400 && y < max); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur border-t border-border shadow-lg">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="hidden sm:block">
            <p className="font-display text-sm font-bold text-ink truncate">{doctorName}</p>
            <p className="text-[11px] text-muted-foreground truncate">{doctorRole}{experience && <span className="text-brand ml-2">· {experience}</span>}</p>
          </div>
          <div className="sm:hidden"><p className="font-display text-sm font-bold text-ink truncate">{doctorName.split(" ").slice(0, 2).join(" ")}</p></div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a href="tel:+9779747223514" aria-label="Call" className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-green/10 text-green hover:bg-green hover:text-cream transition-colors"><Phone className="h-4 w-4" /></a>
          <a href="https://wa.me/9779747223514" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"><MessageCircle className="h-4 w-4" /></a>
          <Button onClick={() => { setPrefillService(`Consultation with ${doctorName}`); setOpen(true); }} className="bg-brand hover:bg-brand/90 text-brand-foreground"><span className="hidden sm:inline">Book Appointment</span><span className="sm:hidden">Book</span></Button>
        </div>
      </div>
    </div>
  );
}
