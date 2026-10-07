"use client";

import { useState, useTransition } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  X,
  Save,
  Eye,
  EyeOff,
  Bell,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/admin/image-upload";
import {
  createPopup,
  savePopup,
  deletePopup,
} from "@/app/admin/popup/actions";

type Popup = {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  dismissible: boolean;
  showOnAll: boolean;
  pagePath: string;
  startDate: Date | null;
  endDate: Date | null;
  order: number;
};

const EMPTY_FORM = {
  title: "",
  description: "",
  image: "",
  buttonText: "",
  buttonLink: "",
  isActive: "false",
  dismissible: "true",
  showOnAll: "true",
  pagePath: "",
  startDate: "",
  endDate: "",
  order: "0",
};

export function AdminPopupEditor({ popups }: { popups: Popup[] }) {
  const [local, setLocal] = useState<Popup[]>(popups);
  const [editing, setEditing] = useState<Popup | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Record<string, string>>(EMPTY_FORM);
  const [busy, setBusy] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function startAdd() {
    setForm({ ...EMPTY_FORM, order: String(local.length) });
    setAdding(true);
    setEditing(null);
  }

  function startEdit(p: Popup) {
    setForm({
      title: p.title,
      description: p.description,
      image: p.image,
      buttonText: p.buttonText,
      buttonLink: p.buttonLink,
      isActive: p.isActive ? "true" : "false",
      dismissible: p.dismissible ? "true" : "false",
      showOnAll: p.showOnAll ? "true" : "false",
      pagePath: p.pagePath,
      startDate: p.startDate ? toInputDate(p.startDate) : "",
      endDate: p.endDate ? toInputDate(p.endDate) : "",
      order: String(p.order ?? 0),
    });
    setEditing(p);
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
      const res = id === null ? await createPopup(form) : await savePopup(id, form);
      setBusy(null);
      if (res?.ok) {
        closeForm();
        window.location.reload();
      } else {
        alert(res?.error || "Save failed");
      }
    });
  }

  async function handleToggleActive(p: Popup) {
    setBusy(p.id);
    startTransition(async () => {
      const res = await savePopup(p.id, { isActive: !p.isActive });
      setBusy(null);
      if (res?.ok) {
        setLocal((arr) =>
          arr.map((x) =>
            x.id === p.id ? { ...x, isActive: !x.isActive } : x,
          ),
        );
      }
    });
  }

  async function handleDelete(p: Popup) {
    if (!confirm(`Delete popup "${p.title}"?`)) return;
    setBusy(p.id);
    startTransition(async () => {
      const res = await deletePopup(p.id);
      setBusy(null);
      if (res?.ok) {
        setLocal((arr) => arr.filter((x) => x.id !== p.id));
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {local.length} popup{local.length === 1 ? "" : "s"} ·{" "}
          {local.filter((p) => p.isActive).length} active
        </p>
        <Button onClick={startAdd} size="sm" className="bg-brand hover:bg-brand/90">
          <Plus className="size-4" />
          Add popup
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {local.length === 0 ? (
          <p className="col-span-full rounded-xl border bg-card p-8 text-center text-sm text-muted-foreground">
            No popups yet. Click <strong>Add popup</strong> to create one.
          </p>
        ) : (
          local.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-xl border bg-card shadow-sm">
              <div className="relative aspect-[16/9] w-full bg-muted">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="400px"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <Bell className="size-7" />
                  </div>
                )}
                <span className="absolute right-2 top-2">
                  <Badge
                    variant="outline"
                    className={
                      p.isActive
                        ? "border-green/30 bg-green/15 text-green"
                        : "border-rust/30 bg-rust/15 text-rust"
                    }
                  >
                    {p.isActive ? "Active" : "Inactive"}
                  </Badge>
                </span>
              </div>
              <div className="p-4">
                <p className="font-display text-base font-semibold text-foreground line-clamp-1">
                  {p.title}
                </p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {p.description || "—"}
                </p>
                <div className="mt-2 space-y-1 text-[11px] text-muted-foreground">
                  <p>
                    Shows on:{" "}
                    <span className="font-medium text-foreground">
                      {p.showOnAll ? "all pages" : p.pagePath || "—"}
                    </span>
                  </p>
                  <p>
                    Dismissible: <span className="font-medium text-foreground">{p.dismissible ? "Yes" : "No"}</span>
                  </p>
                  {(p.startDate || p.endDate) && (
                    <p>
                      Schedule: {p.startDate ? toInputDate(p.startDate) : "—"} → {p.endDate ? toInputDate(p.endDate) : "—"}
                    </p>
                  )}
                  {p.buttonText && (
                    <p>
                      Button: <span className="font-medium text-foreground">{p.buttonText}</span> →{" "}
                      <span className="font-mono text-[10px]">{p.buttonLink}</span>
                    </p>
                  )}
                </div>
                <div className="mt-3 flex items-center gap-1">
                  <button
                    onClick={() => startEdit(p)}
                    disabled={busy === p.id}
                    className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent disabled:opacity-50"
                  >
                    <Pencil className="size-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleActive(p)}
                    disabled={busy === p.id}
                    title={p.isActive ? "Deactivate" : "Activate"}
                    className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent disabled:opacity-50"
                  >
                    {p.isActive ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                  </button>
                  <button
                    onClick={() => handleDelete(p)}
                    disabled={busy === p.id}
                    className="ml-auto inline-flex items-center gap-1 rounded-md border border-destructive/30 bg-destructive/10 px-2.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 disabled:opacity-50"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {(adding || editing) && (
        <PopupForm
          form={form}
          setForm={setForm}
          onClose={closeForm}
          onSave={() => handleSave(editing?.id ?? null)}
          busy={busy === editing?.id || busy === "new"}
          title={editing ? `Edit popup` : "Add popup"}
        />
      )}
    </div>
  );
}

function PopupForm({
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
          <Field label="Title" required full>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} />
          </Field>
          <Field label="Description" full>
            <Textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} />
          </Field>
          <Field label="Image" full>
            <ImageUpload value={form.image} onChange={(url) => set("image", url)} />
          </Field>
          <Field label="Button text">
            <Input value={form.buttonText} onChange={(e) => set("buttonText", e.target.value)} placeholder="Book now" />
          </Field>
          <Field label="Button link">
            <Input value={form.buttonLink} onChange={(e) => set("buttonLink", e.target.value)} placeholder="/packages" />
          </Field>
          <Field label="Page path (if not all pages)">
            <Input value={form.pagePath} onChange={(e) => set("pagePath", e.target.value)} placeholder="/offers" />
          </Field>
          <Field label="Order">
            <Input type="number" value={form.order} onChange={(e) => set("order", e.target.value)} />
          </Field>
          <Field label="Start date">
            <Input type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
          </Field>
          <Field label="End date">
            <Input type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} />
          </Field>

          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:gap-6">
            <ToggleField
              label="Active"
              checked={form.isActive === "true"}
              onChange={(v) => set("isActive", v ? "true" : "false")}
            />
            <ToggleField
              label="Dismissible"
              checked={form.dismissible === "true"}
              onChange={(v) => set("dismissible", v ? "true" : "false")}
            />
            <ToggleField
              label="Show on all pages"
              checked={form.showOnAll === "true"}
              onChange={(v) => set("showOnAll", v ? "true" : "false")}
            />
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

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Switch checked={checked} onCheckedChange={onChange} />
      <Label className="text-xs font-medium text-foreground">{label}</Label>
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

function toInputDate(d: Date | string | null | undefined): string {
  if (!d) return "";
  const dt = typeof d === "string" ? new Date(d) : d;
  try {
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const dd = String(dt.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  } catch {
    return "";
  }
}
