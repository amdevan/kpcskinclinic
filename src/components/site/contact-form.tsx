"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
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
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";
import { SERVICE_CATEGORIES } from "@/lib/site-data";

export function ContactForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [service, setService] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !message) {
      toast.error("Please fill in your name, phone, and message.");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service, message }),
      });
      if (!res.ok) throw new Error("failed");
      setDone(true);
      toast.success("Message sent — we'll be in touch within one working day.");
    } catch (err) {
      toast.error("Something went wrong. Please call us instead.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 gap-3 border border-border rounded-2xl bg-card">
        <div className="h-14 w-14 rounded-full bg-brand/10 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-brand" />
        </div>
        <p className="font-display text-2xl font-semibold text-ink">
          Thanks, {name.split(" ")[0]}!
        </p>
        <p className="text-sm text-muted-foreground max-w-sm font-serif-body">
          Your message has been received. Sunita or one of our patient care
          team will call you back within one working day.
        </p>
        <Button
          variant="outline"
          className="mt-2 border-brand/30 text-brand hover:bg-brand hover:text-brand-foreground"
          onClick={() => {
            setDone(false);
            setName("");
            setEmail("");
            setPhone("");
            setService("");
            setMessage("");
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 bg-card border border-border rounded-2xl p-6 sm:p-8"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="c-name">Full name *</Label>
          <Input
            id="c-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-phone">Phone *</Label>
          <Input
            id="c-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+977-98XXXXXXXX"
            required
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="c-email">Email (optional)</Label>
        <Input
          id="c-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <div className="space-y-1.5">
        <Label>Service of interest (optional)</Label>
        <Select value={service} onValueChange={setService}>
          <SelectTrigger>
            <SelectValue placeholder="Select a service — or skip if you're not sure" />
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
        <Label htmlFor="c-msg">Your message *</Label>
        <Textarea
          id="c-msg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what you're looking for, your timeline, or any questions you have…"
          rows={5}
          required
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-brand hover:bg-brand/90 text-brand-foreground"
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Send className="mr-2 h-4 w-4" />
        )}
        Send message
      </Button>
      <p className="text-[11px] text-muted-foreground text-center font-serif-body italic">
        We typically reply within one working day. For urgent queries, please
        call.
      </p>
    </form>
  );
}
