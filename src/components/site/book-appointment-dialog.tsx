"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarPrimitive } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, CheckCircle2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { SERVICE_CATEGORIES } from "@/lib/site-data";

export function BookAppointmentDialog({
  open,
  onOpenChange,
  prefillService,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  prefillService?: string;
}) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [service, setService] = React.useState("");
  const [date, setDate] = React.useState<Date | undefined>();
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  // Sync prefill service when dialog opens
  React.useEffect(() => {
    if (open && prefillService) {
      setService(prefillService);
    }
  }, [open, prefillService]);

  function reset() {
    setName("");
    setPhone("");
    setEmail("");
    setService("");
    setDate(undefined);
    setMessage("");
    setLoading(false);
    setDone(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !service || !date) {
      toast.error("Please fill in name, phone, service and preferred date.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          service,
          preferredDate: date.toISOString(),
          message,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setDone(true);
      toast.success("Appointment request received — we'll call you shortly!");
    } catch (err) {
      toast.error("Something went wrong. Please try again or call us.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setTimeout(reset, 300);
      }}
    >
      <DialogContent className="sm:max-w-[560px] max-h-[92vh] overflow-y-auto">
        {done ? (
          <div className="flex flex-col items-center justify-center text-center py-10 gap-3">
            <div className="h-14 w-14 rounded-full bg-brand/10 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-brand" />
            </div>
            <DialogTitle className="text-2xl font-display">
              Thank you, {name.split(" ")[0]}!
            </DialogTitle>
            <DialogDescription className="max-w-sm">
              Your appointment request for <strong>{service}</strong> on{" "}
              <strong>{date ? format(date, "PPP") : "your selected date"}</strong>{" "}
              has been received. Our front desk will call you within working
              hours to confirm.
            </DialogDescription>
            <Button
              className="mt-3 bg-brand hover:bg-brand/90 text-brand-foreground"
              onClick={() => {
                onOpenChange(false);
                setTimeout(reset, 300);
              }}
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-display">
                Book an Appointment
              </DialogTitle>
              <DialogDescription>
                Tell us a little about you and the treatment you're interested
                in. We'll confirm your slot by phone.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={onSubmit} className="space-y-4 mt-2">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="ba-name">Full name *</Label>
                  <Input
                    id="ba-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ba-phone">Phone *</Label>
                  <Input
                    id="ba-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+977-9747223514"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ba-email">Email (optional)</Label>
                <Input
                  id="ba-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Service *</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {SERVICE_CATEGORIES.flatMap((c) => [
                        <SelectItem
                          key={`grp-${c.id}`}
                          value={`grp-${c.id}`}
                          disabled
                          className="font-semibold text-brand uppercase tracking-wide text-[11px]"
                        >
                          {c.title}
                        </SelectItem>,
                        ...c.services.map((s) => (
                          <SelectItem key={s.title} value={s.title}>
                            {s.title}
                          </SelectItem>
                        )),
                      ])}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Preferred date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarPrimitive
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) =>
                          d < new Date(new Date().setHours(0, 0, 0, 0)) ||
                          d.getDay() === 6
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ba-msg">Message (optional)</Label>
                <Textarea
                  id="ba-msg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us anything we should know…"
                  rows={3}
                />
              </div>
              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-brand hover:bg-brand/90 text-brand-foreground"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    "Request Appointment"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
