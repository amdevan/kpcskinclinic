"use client";

import { useState, useTransition } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  X,
  Save,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  LayoutGrid,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/admin/image-upload";
import {
  createServiceCategory,
  saveServiceCategory,
  deleteServiceCategory,
} from "@/app/admin/services/actions";

type ServiceItem = { title: string; href: string; description: string };
type Category = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  services: ServiceItem[];
  published: boolean;
  order: number;
};

const EMPTY_FORM = {
  slug: "",
  title: "",
  tagline: "",
  description: "",
  image: "",
  published: "true",
  order: "0",
};

export function AdminServicesEditor({ categories }: { categories: Category[] }) {
  const [local, setLocal] = useState<Category[]>(categories);
  const [editing, setEditing] = useState<Category | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Record<string, string>>(EMPTY_FORM);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function startAdd() {
    setForm(EMPTY_FORM);
    setServices([]);
    setAdding(true);
    setEditing(null);
  }

  function startEdit(c: Category) {
    setForm({
      slug: c.slug,
      title: c.title,
      tagline: c.tagline,
      description: c.description,
      image: c.image,
      published: c.published ? "true" : "false",
      order: String(c.order ?? 0),
    });
    setServices(c.services?.length ? c.services : []);
    setEditing(c);
    setAdding(false);
  }

  function closeForm() {
    setAdding(false);
    setEditing(null);
    setForm(EMPTY_FORM);
    setServices([]);
  }

  async function handleSave(id: string | null) {
    if (!form.slug.trim() || !form.title.trim()) {
      alert("Slug and title are required");
      return;
    }
    setBusy(id || "new");
    startTransition(async () => {
      const payload = { ...form, services };
      const res =
        id === null
          ? await createServiceCategory(payload)
          : await saveServiceCategory(id, payload);
      setBusy(null);
      if (res?.ok) {
        closeForm();
        window.location.reload();
      } else {
        alert(res?.error || "Save failed");
      }
    });
  }

  async function handleTogglePublish(c: Category) {
    setBusy(c.id);
    startTransition(async () => {
      const res = await saveServiceCategory(c.id, {
        published: !c.published,
      });
      setBusy(null);
      if (res?.ok) {
        setLocal((arr) =>
          arr.map((x) =>
            x.id === c.id ? { ...x, published: !x.published } : x,
          ),
        );
      } else {
        alert(res?.error || "Toggle failed");
      }
    });
  }

  async function handleDelete(c: Category) {
    if (c.id.startsWith("static-")) {
      alert("This is a static fallback row — DB is unavailable.");
      return;
    }
    if (!confirm(`Delete category "${c.title}"?`)) return;
    setBusy(c.id);
    startTransition(async () => {
      const res = await deleteServiceCategory(c.id);
      setBusy(null);
      if (res?.ok) {
        setLocal((arr) => arr.filter((x) => x.id !== c.id));
      } else {
        alert(res?.error || "Delete failed");
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {local.length} categor{local.length === 1 ? "y" : "ies"}
        </p>
        <Button onClick={startAdd} size="sm" className="bg-brand hover:bg-brand/90">
          <Plus className="size-4" />
          Add category
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {local.map((c) => (
          <div key={c.id} className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <div className="relative h-32 w-full bg-muted">
              {c.image ? (
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover"
                  sizes="400px"
                  unoptimized
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <LayoutGrid className="size-7" />
                </div>
              )}
              <span className="absolute right-2 top-2">
                <Badge
                  variant="outline"
                  className={
                    c.published
                      ? "border-green/30 bg-green/15 text-green"
                      : "border-rust/30 bg-rust/15 text-rust"
                  }
                >
                  {c.published ? "Published" : "Draft"}
                </Badge>
              </span>
            </div>
            <div className="p-4">
              <p className="font-display text-base font-semibold text-foreground">
                {c.title}
              </p>
              <p className="font-mono text-[11px] text-brand">{c.slug}</p>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {c.tagline || c.description}
              </p>
              <p className="mt-2 text-[11px] font-medium text-muted-foreground">
                {c.services?.length || 0} services
              </p>
              <div className="mt-3 flex items-center gap-1">
                <button
                  onClick={() => startEdit(c)}
                  disabled={busy === c.id}
                  className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent disabled:opacity-50"
                >
                  <Pencil className="size-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => handleTogglePublish(c)}
                  disabled={busy === c.id || c.id.startsWith("static-")}
                  className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent disabled:opacity-50"
                >
                  {c.published ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                </button>
                <button
                  onClick={() => handleDelete(c)}
                  disabled={busy === c.id || c.id.startsWith("static-")}
                  className="ml-auto inline-flex items-center gap-1 rounded-md border border-destructive/30 bg-destructive/10 px-2.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 disabled:opacity-50"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(adding || editing) && (
        <CategoryForm
          form={form}
          setForm={setForm}
          services={services}
          setServices={setServices}
          onClose={closeForm}
          onSave={() => handleSave(editing?.id ?? null)}
          busy={busy === editing?.id || busy === "new"}
          title={editing ? `Edit ${editing.title}` : "Add service category"}
        />
      )}
    </div>
  );
}

function CategoryForm({
  form,
  setForm,
  services,
  setServices,
  onClose,
  onSave,
  busy,
  title,
}: {
  form: Record<string, string>;
  setForm: (f: Record<string, string>) => void;
  services: ServiceItem[];
  setServices: (arr: ServiceItem[]) => void;
  onClose: () => void;
  onSave: () => void;
  busy: boolean;
  title: string;
}) {
  function set<K extends string>(k: K, v: string) {
    setForm({ ...form, [k]: v });
  }

  function updateService(i: number, patch: Partial<ServiceItem>) {
    const next = [...services];
    next[i] = { ...next[i], ...patch };
    setServices(next);
  }
  function addService() {
    setServices([...services, { title: "", href: "#services", description: "" }]);
  }
  function removeService(i: number) {
    setServices(services.filter((_, idx) => idx !== i));
  }
  function moveService(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= services.length) return;
    const next = [...services];
    [next[i], next[j]] = [next[j], next[i]];
    setServices(next);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto scrollbar-thin rounded-2xl border bg-card p-6 shadow-xl">
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
          <Field label="Title" required>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} />
          </Field>
          <Field label="Slug" required>
            <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="hair-transplant" />
          </Field>
          <Field label="Tagline">
            <Input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </Field>
          <Field label="Order">
            <Input type="number" value={form.order} onChange={(e) => set("order", e.target.value)} />
          </Field>
          <Field label="Published">
            <select
              value={form.published}
              onChange={(e) => set("published", e.target.value)}
              className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm"
            >
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </select>
          </Field>
          <Field label="Image" full>
            <ImageUpload value={form.image} onChange={(url) => set("image", url)} />
          </Field>
          <Field label="Description" full>
            <Textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} />
          </Field>
        </div>

        <div className="mt-6 rounded-lg border bg-muted/30 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">
              Services in this category
            </p>
            <Button type="button" size="sm" variant="outline" onClick={addService}>
              <Plus className="size-3.5" />
              Add service
            </Button>
          </div>

          <div className="space-y-3">
            {services.length === 0 ? (
              <p className="rounded-md bg-background px-3 py-4 text-center text-xs text-muted-foreground">
                No services yet. Click <strong>Add service</strong> to create one.
              </p>
            ) : (
              services.map((s, i) => (
                <div
                  key={i}
                  className="rounded-md border bg-card p-3"
                >
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr,1fr]">
                    <Field label="Service title">
                      <Input
                        value={s.title}
                        onChange={(e) => updateService(i, { title: e.target.value })}
                      />
                    </Field>
                    <Field label="Link href">
                      <Input
                        value={s.href}
                        onChange={(e) => updateService(i, { href: e.target.value })}
                      />
                    </Field>
                    <Field label="Description" full>
                      <Textarea
                        rows={2}
                        value={s.description}
                        onChange={(e) => updateService(i, { description: e.target.value })}
                      />
                    </Field>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveService(i, -1)}
                      disabled={i === 0}
                      aria-label="Move up"
                      className="inline-flex size-7 items-center justify-center rounded-md border border-border text-foreground hover:bg-accent disabled:opacity-30"
                    >
                      <ChevronUp className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveService(i, 1)}
                      disabled={i === services.length - 1}
                      aria-label="Move down"
                      className="inline-flex size-7 items-center justify-center rounded-md border border-border text-foreground hover:bg-accent disabled:opacity-30"
                    >
                      <ChevronDown className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeService(i)}
                      className="ml-auto inline-flex items-center gap-1 rounded-md border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive hover:bg-destructive/20"
                    >
                      <Trash2 className="size-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
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
