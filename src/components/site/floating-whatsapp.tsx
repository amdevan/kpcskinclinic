"use client";

import * as React from "react";
import { Phone, MessageCircle, X, Plus } from "lucide-react";

export function FloatingButtons() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      <a href="tel:+9779747223514" aria-label="Call us" className={`inline-flex items-center gap-2 rounded-full bg-green px-4 py-3 text-cream shadow-lg transition-all duration-300 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        <Phone className="h-5 w-5" /><span className="text-sm font-semibold whitespace-nowrap">Call</span>
      </a>
      <a href="https://wa.me/9779747223514" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className={`inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-all duration-300 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        <MessageCircle className="h-5 w-5" /><span className="text-sm font-semibold whitespace-nowrap">WhatsApp</span>
      </a>
      <button onClick={() => setOpen((v) => !v)} aria-label={open ? "Close contact options" : "Open contact options"} className={`inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-cream shadow-xl hover:scale-105 transition-all ${open ? "rotate-45" : ""}`}>
        {open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </button>
    </div>
  );
}
