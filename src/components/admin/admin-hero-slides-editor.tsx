"use client";

import { useState, useTransition } from "react";
import {
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/admin/image-upload";
import {
  createHeroSlide,
  saveHeroSlide,
  deleteHeroSlide,
} from "@/app/admin/hero/actions";

type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  primaryCta: string;
  secondaryCta: string;
  isActive: boolean;
  order: number;
};

const EMPTY_FORM = {
  eyebrow: "",
  title: "",
  highlight: "",
  description: "",
  image: "",
  primaryCta: "Request an Appointment",
  secondaryCta: "Explore our Services",
  isActive: "true",
  order: "0",
};

export function AdminHeroSlidesEditor({ slides }: { slides: Slide[] }) {
  const [local, setLocal] = useState<Slide[]>(slides);
  const [editing, setEditing] = useState<Slide | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Record<string, string>>(EMPTY_FORM);
  const [busy, setBusy] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function startAdd() {
    setForm({ ...EMPTY_FORM, order: String(local.length) });
    setAdding(true);
    setEditing(null);
  }
  function startEdit(s: Slide) {
    setForm({
      eyebrow: s.eyebrow,
      title: s.title,
      highlight: s.highlight,
      description: s.description,
      image: s.image,
      primaryCta: s.primaryCta,
      secondaryCta: s.secondaryCta,
      isActive: s.isActive ? "true" : "false",
      order: String(s.order ?? 0),
    });
    setEditing(s);
    setAdding(false);
  }
  function closeForm() {
    setAdding(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  }

  async function handleSave(id: string | null) {
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }
    setBusy(id || "new");
    startTransition(async () => {
      const res = id === null ? await createHeroSlide(form) : await saveHeroSlide(id, form);
      setBusy(null);
      if (res?.ok) {
        closeForm();
        window.location.reload();
      } else {
        alert(res?.error || "Save failed");
      }
    });
  }

  async function handleToggleActive(s: Slide) {
    if (s.id.startsWith("static-")) {
      alert("Static fallback — DB is unavailable.");
      return;
    }
    setBusy(s.id);
    startTransition(async () => {
      const res = await saveHeroSlide(s.id, { isActive: !s.isActive });
      setBusy(null);
      if (res?.ok) {
        setLocal((arr) =>
          arr.map((x) =>
            x.id === s.id ? { ...x, isActive: !x.isActive } : x,
          ),
        );
      }
    });
  }

  async function handleDelete(s: Slide) {
    if (s.id.startsWith("static-")) {
      alert("Static fallback — DB is unavailable.");
      return;
    }
    if (!confirm("Delete this slide?")) return;
    setBusy(s.id);
    startTransition(async () => {
      const res = await deleteHeroSlide(s.id);
      setBusy(null);
      if (res?.ok) {
        setLocal((arr) => arr.filter((x) => x.id !== s.id));
      }
    });
  }

  async function handleReorder(s: Slide, dir: -1 | 1) {
    const idx = local.findIndex((x) => x.id === s.id);
    const j = idx + dir;
    if (j < 0 || j >= local.length) return;

    // Swap locally and persist new order via save
    const next = [...local];
    [next[idx], next[j]] = [next[j], next[idx]];
    // Re-number order indices
    next.forEach((s, i) => (s.order = i));
    setLocal(next);

    if (s.id.startsWith("static-")) return;

    setBusy(s.id);
    startTransition(async () => {
      // Save both swapped slides with their new order
      await Promise.all([
        saveHeroSlide(next[idx].id, { order: next[idx].order }),
        saveHeroSlide(next[j].id, { order: next[j].order }),
      ]);
      setBusy(null);
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {local.length} slide{local.length === 1 ? "" : "s"}
        </p>
        <Button onClick={startAdd} size="sm" className="bg-brand hover:bg-brand/90">
          <Plus className="size-4" />
          Add slide
        </Button>
      </div>

      <div className="space-y-3">
        {local.map((s, i) => (
          <div key={s.id} className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-stretch">
              <div className="relative aspect-[16/9] w-full max-w-[260px] overflow-hidden rounded-lg bg-muted">
                {s.image ? (
                  <Image
                    src={s.image}
                    alt={s.title || "Slide"}
                    fill
                    className="object-cover"
                    sizes="260px"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <ImageIcon className="size-7" />
                  </div>
                )}
                <span className="absolute right-2 top-2">
                  <Badge
                    variant="outline"
                    className={
                      s.isActive
                        ? "border-green/30 bg-green/15 text-green"
                        : "border-rust/30 bg-rust/15 text-rust"
                    }
                  >
                    {s.isActive ? "Active" : "Hidden"}
                  </Badge>
                </span>
              </div>

              <div className="flex-1 space-y-2">
                {s.eyebrow && (
                  <p className="text-[11px] font-medium uppercase tracking-wider text-brand">
                    {s.eyebrow}
                  </p>
                )}
                <p className="font-display text-base font-semibold text-foreground">
                  {s.title}{" "}
                  {s.highlight && (
                    <span className="text-brand">{s.highlight}</span>
                  )}
                </p>
                <p className="line-clamp-2 text-xs text-muted-foreground">
                  {s.description}
                </p>
                <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                  <span>Primary CTA: <strong className="text-foreground">{s.primaryCta || "—"}</strong></span>
                  <span>Secondary CTA: <strong className="text-foreground">{s.secondaryCta || "—"}</strong></span>
                </div>
              </div>

              <div className="flex items-start gap-1">
                <button
                  onClick={() => handleReorder(s, -1)}
                  disabled={busy === s.id || i === 0}
                  aria-label="Move up"
                  className="inline-flex size-8 items-center justify-center rounded-md border border-border text-foreground hover:bg-accent disabled:opacity-30"
                >
                  <ChevronUp className="size-4" />
                </button>
                <button
                  onClick={() => handleReorder(s, 1)}
                  disabled={busy === s.id || i === local.length - 1}
                  aria-label="Move down"
                  className="inline-flex size-8 items-center justify-center rounded-md border border-border text-foreground hover:bg-accent disabled:opacity-30"
                >
                  <ChevronDown className="size-4" />
                </button>
                <button
                  onClick={() => startEdit(s)}
                  disabled={busy === s.id}
                  title="Edit"
                  className="inline-flex size-8 items-center justify-center rounded-md border border-border text-foreground hover:bg-accent disabled:opacity-50"
                >
                  <Pencil className="size-4" />
                </button>
                <button
                  onClick={() => handleToggleActive(s)}
                  disabled={busy === s.id || s.id.startsWith("static-")}
                  title={s.isActive ? "Hide" : "Show"}
                  className="inline-flex size-8 items-center justify-center rounded-md border border-border text-foreground hover:bg-accent disabled:opacity-50"
                >
                  {s.isActive ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
                <button
                  onClick={() => handleDelete(s)}
                  disabled={busy === s.id || s.id.startsWith("static-")}
                  title="Delete"
                  className="inline-flex size-8 items-center justify-center rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 disabled:opacity-50"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(adding || editing) && (
        <SlideForm
          form={form}
          setForm={setForm}
          onClose={closeForm}
          onSave={() => handleSave(editing?.id ?? null)}
          busy={busy === editing?.id || busy === "new"}
          title={editing ? "Edit slide" : "Add hero slide"}
        />
      )}
    </div>
  );
}

function SlideForm({
  form,
  setForm,
  onClose,
  onSave,
  busy,
  title,
}: {
  form: Record<string, string>;
  setForm: (f: Record<string, string>) => void;
  onClose: () => void;
  onSave: () => void;
  busy: boolean;
  title: string;
}) {
  function set<K extends string>(k: K, v: string) {
    setForm({ ...form, [k]: v });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto scrollbar-thin rounded-2xl border bg-card p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
          <button
            onClick={onClose}
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Eyebrow">
            <Input value={form.eyebrow} onChange={(e) => set("eyebrow", e.target.value)} />
          </Field>
          <Field label="Order">
            <Input type="number" value={form.order} onChange={(e) => set("order", e.target.value)} />
          </Field>
          <Field label="Title" required full>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} />
          </Field>
          <Field label="Highlight (accent)" full>
            <Input value={form.highlight} onChange={(e) => set("highlight", e.target.value)} />
          </Field>
          <Field label="Primary CTA text">
            <Input value={form.primaryCta} onChange={(e) => set("primaryCta", e.target.value)} />
          </Field>
          <Field label="Secondary CTA text">
            <Input value={form.secondaryCta} onChange={(e) => set("secondaryCta", e.target.value)} />
          </Field>
          <Field label="Active">
            <select
              value={form.isActive}
              onChange={(e) => set("isActive", e.target.value)}
              className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm"
            >
              <option value="true">Active</option>
              <option value="false">Hidden</option>
            </select>
          </Field>
          <Field label="Description" full>
            <Textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} />
          </Field>
          <Field label="Background image" full>
            <ImageUpload value={form.image} onChange={(url) => set("image", url)} />
          </Field>
        </div>
        <div className="mt-6 flex items-center justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button onClick={onSave} disabled={busy} className="bg-brand hover:bg-brand/90">
            {busy ? "Saving…" : "Save"}
            <Save className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  full,
  required,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
  required?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <Label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="text-rust">*</span>}
      </Label>
      {children}
    </div>
  );
}
