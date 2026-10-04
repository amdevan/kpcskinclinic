"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarPrimitive } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Calendar as CalendarIcon, CheckCircle2, Loader2, Package } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ALL_PACKAGES, STD_STI_PACKAGE_CARDS } from "@/lib/site-data";

const ALL_PACKAGE_NAMES = [...ALL_PACKAGES.map((p) => p.name), ...STD_STI_PACKAGE_CARDS.map((p) => p.name)];

export function PackageBookingDialog({ open, onOpenChange, prefillPackage }: { open: boolean; onOpenChange: (v: boolean) => void; prefillPackage?: string; }) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pkg, setPkg] = React.useState("");
  const [date, setDate] = React.useState<Date | undefined>();
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => { if (open && prefillPackage) setPkg(prefillPackage); }, [open, prefillPackage]);

  function reset() { setName(""); setPhone(""); setEmail(""); setPkg(""); setDate(undefined); setMessage(""); setLoading(false); setDone(false); }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !pkg || !date) { toast.error("Please fill name, phone, package and date."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/appointments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, phone, email, service: `Package: ${pkg}`, preferredDate: date.toISOString(), message, type: "package" }) });
      if (!res.ok) throw new Error("failed");
      setDone(true); toast.success("Package booking received!");
    } catch { toast.error("Something went wrong."); } finally { setLoading(false); }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setTimeout(reset, 300); }}>
      <DialogContent className="sm:max-w-[560px] max-h-[92vh] overflow-y-auto">
        {done ? (
          <div className="flex flex-col items-center justify-center text-center py-10 gap-3">
            <div className="h-14 w-14 rounded-full bg-brand/10 flex items-center justify-center"><CheckCircle2 className="h-8 w-8 text-brand" /></div>
            <DialogTitle className="text-2xl font-display">Package booked, {name.split(" ")[0]}!</DialogTitle>
            <p className="text-sm text-muted-foreground max-w-sm">Your booking for <strong>{pkg}</strong> on <strong>{date ? format(date, "PPP") : "your date"}</strong> has been received.</p>
            <Button className="mt-3 bg-brand hover:bg-brand/90 text-brand-foreground" onClick={() => { onOpenChange(false); setTimeout(reset, 300); }}>Close</Button>
          </div>
        ) : (
          <>
            <div className="-mx-6 -mt-6 mb-4 px-6 py-4 bg-rust/10 border-l-4 border-rust rounded-r-lg">
              <DialogTitle className="text-2xl font-display flex items-center gap-2"><Package className="h-5 w-5 text-rust" /> Book a Package</DialogTitle>
              <DialogDescription className="mt-1">Choose your package and preferred date.</DialogDescription>
            </div>
            <form onSubmit={onSubmit} className="space-y-4 mt-2">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label htmlFor="pb-name">Full name *</Label><Input id="pb-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required /></div>
                <div className="space-y-1.5"><Label htmlFor="pb-phone">Phone *</Label><Input id="pb-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+977-97XXXXXXXX" required /></div>
              </div>
              <div className="space-y-1.5"><Label htmlFor="pb-email">Email (optional)</Label><Input id="pb-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label>Package *</Label><Select value={pkg} onValueChange={setPkg}><SelectTrigger><SelectValue placeholder="Select a package" /></SelectTrigger><SelectContent className="max-h-72">{ALL_PACKAGE_NAMES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent></Select></div>
                <div className="space-y-1.5"><Label>Preferred date *</Label><Popover><PopoverTrigger asChild><Button type="button" variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{date ? format(date, "PPP") : "Pick a date"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><CalendarPrimitive mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0)) || d.getDay() === 6} initialFocus /></PopoverContent></Popover></div>
              </div>
              <div className="space-y-1.5"><Label htmlFor="pb-msg">Notes (optional)</Label><Textarea id="pb-msg" value={message} onChange={(e) => setMessage(e.target.value)} rows={2} /></div>
              <DialogFooter className="pt-2"><Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button type="submit" disabled={loading} className="bg-brand hover:bg-brand/90 text-brand-foreground">{loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Book Package</Button></DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
