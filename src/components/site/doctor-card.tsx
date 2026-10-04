"use client";

import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { useBookAppointment } from "./book-appointment-context";
import type { DOCTORS } from "@/lib/site-data";

type Doctor = (typeof DOCTORS)[number];

const STYLES = [
  { bar: "bg-brand", role: "text-brand", soft: "bg-brand/10" },
  { bar: "bg-cyan", role: "text-cyan", soft: "bg-cyan/10" },
  { bar: "bg-green", role: "text-green", soft: "bg-green/10" },
  { bar: "bg-gold", role: "text-gold", soft: "bg-gold/10" },
  { bar: "bg-rust", role: "text-rust", soft: "bg-rust/10" },
  { bar: "bg-brand", role: "text-brand", soft: "bg-brand/10" },
];

export function DoctorCard({ d, index }: { d: Doctor; index: number }) {
  const { setOpen, setPrefillService } = useBookAppointment();
  const s = STYLES[index % STYLES.length];

  return (
    <article className="group bg-card rounded-xl border border-border overflow-hidden card-lift">
      <div className="relative overflow-hidden aspect-square bg-secondary">
        <img src={d.image} alt={d.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${s.bar}`} />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink/80 to-transparent">
          <p className={`text-[11px] font-semibold uppercase tracking-wider ${index % 2 === 0 ? "text-gold" : "text-cyan"}`}>{d.experience}</p>
        </div>
        <div className="absolute inset-0 bg-ink/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6">
          <button onClick={() => { setPrefillService(`Consultation with ${d.name}`); setOpen(true); }} className="inline-flex items-center gap-2 rounded-full bg-brand hover:bg-brand/90 text-cream px-5 py-2.5 text-sm font-semibold transition-colors">
            <Calendar className="h-4 w-4" /> Appointment
          </button>
          <Link href={`/doctors/${d.slug}`} className="inline-flex items-center gap-2 rounded-full border border-cream/40 text-cream hover:bg-cream hover:text-ink px-5 py-2.5 text-sm font-semibold transition-colors">
            Details <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <p className={`text-xs font-medium ${s.role}`}>{d.role}</p>
        <h3 className="font-display text-base font-bold text-ink mt-0.5">{d.name}</h3>
        <p className="text-[10px] text-muted-foreground mt-0.5">{d.credentials}</p>
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">{d.bio}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {d.specialties.map((sp: string) => (
            <span key={sp} className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${s.soft} ${s.role}`}>{sp}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
