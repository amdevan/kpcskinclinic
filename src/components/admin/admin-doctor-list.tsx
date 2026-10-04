"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import {
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  X,
  Save,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { dbDoctorAction } from "@/app/admin/doctors/actions";

type Doctor = {
  id: string;
  slug: string;
  name: string;
  role: string;
  credentials: string;
  specialties: string[];
  bio: string;
  fullBio: string;
  education: string[];
  treatments: string[];
  approach: string;
  image: string;
  experience: string;
  published: boolean;
  order: number;
};

const emptyForm = {
  slug: "",
  name: "",
  role: "",
  credentials: "",
  specialties: "",
  bio: "",
  fullBio: "",
  education: "",
  treatments: "",
  approach: "",
  image: "",
  experience: "",
  published: "true",
  order: "0",
};

function listToStr(arr: string[] = []): string {
  return Array.isArray(arr) ? arr.join("\n") : "";
}

export function AdminDoctorList({ doctors }: { doctors: Doctor[] }) {
  const [local, setLocal] = useState<Doctor[]>(doctors);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Record<string, string>>(emptyForm);
  const [busy, setBusy] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function startEdit(d: Doctor) {
    setForm({
      slug: d.slug,
      name: d.name,
      role: d.role,
      credentials: d.credentials,
      specialties: listToStr(d.specialties),
      bio: d.bio,
      fullBio: d.fullBio,
      education: listToStr(d.education),
      treatments: listToStr(d.treatments),
      approach: d.approach,
      image: d.image,
      experience: d.experience,
      published: d.published ? "true" : "false",
      order: String(d.order ?? 0),
    });
    setEditingId(d.id);
    setAdding(false);
  }

  function startAdd() {
    setForm(emptyForm);
    setAdding(true);
    setEditingId(null);
  }

  function closeForm() {
    setEditingId(null);
    setAdding(false);
    setForm(emptyForm);
  }

  function listField(value: string): string[] {
    return value
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  async function handleSave(id: string | null) {
    setBusy(id || "new");
    const payload = {
      ...form,
      specialties: listField(form.specialties),
      education: listField(form.education),
      treatments: listField(form.treatments),
      order: Number(form.order || 0),
    };
    startTransition(async () => {
      const res =
        id === null
          ? await dbDoctorAction("new", "create", payload)
          : await dbDoctorAction(id, "update", payload);
      setBusy(null);
      if (res?.ok) {
        closeForm();
        // Refresh from server by reloading — simplest way to re-sync
        window.location.reload();
      } else {
        alert(res?.error || "Save failed");
      }
    });
  }

  async function handleTogglePublish(d: Doctor) {
    setBusy(d.id);
    startTransition(async () => {
      const res = await dbDoctorAction(d.id, "toggle-publish");
      setBusy(null);
      if (res?.ok) {
        setLocal((arr) =>
          arr.map((x) => (x.id === d.id ? { ...x, published: !x.published } : x)),
        );
      }
    });
  }

  async function handleDelete(d: Doctor) {
    if (!confirm(`Delete ${d.name}? This cannot be undone.`)) return;
    setBusy(d.id);
    startTransition(async () => {
      const res = await dbDoctorAction(d.id, "delete");
      setBusy(null);
      if (res?.ok) {
        setLocal((arr) => arr.filter((x) => x.id !== d.id));
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {local.length} doctor{local.length === 1 ? "" : "s"} total
        </p>
        <Button onClick={startAdd} size="sm" className="bg-brand hover:bg-brand/90">
          <Plus className="size-4" />
          Add new doctor
        </Button>
      </div>

      {adding && (
        <DoctorForm
          form={form}
          setForm={setForm}
          onClose={closeForm}
          onSave={() => handleSave(null)}
          busy={busy === "new"}
          title="Add new doctor"
        />
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {local.map((d) => (
          <div key={d.id} className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <div className="relative h-40 w-full bg-muted">
              {d.image ? (
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  className="object-cover"
                  sizes="400px"
                  unoptimized
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <Stethoscope className="size-8" />
                </div>
              )}
              <span className="absolute right-2 top-2">
                <Badge
                  variant="outline"
                  className={
                    d.published
                      ? "border-green/30 bg-green/15 text-green"
                      : "border-rust/30 bg-rust/15 text-rust"
                  }
                >
                  {d.published ? "Published" : "Draft"}
                </Badge>
              </span>
            </div>
            <div className="p-4">
              <p className="font-display text-lg font-semibold text-foreground">{d.name}</p>
              <p className="text-sm text-brand">{d.role}</p>
              <p className="mt-1 text-xs text-muted-foreground">{d.credentials}</p>
              <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{d.bio}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {d.specialties?.slice(0, 3).map((s, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-brand/10 px-2 py-0.5 text-[11px] font-medium text-brand"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Experience: <span className="font-medium text-foreground">{d.experience || "—"}</span>
              </p>

              <div className="mt-4 flex items-center gap-1">
                <button
                  onClick={() => startEdit(d)}
                  disabled={busy === d.id}
                  className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent disabled:opacity-50"
                >
                  <Pencil className="size-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => handleTogglePublish(d)}
                  disabled={busy === d.id}
                  className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent disabled:opacity-50"
                  title={d.published ? "Unpublish" : "Publish"}
                >
                  {d.published ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                  {d.published ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => handleDelete(d)}
                  disabled={busy === d.id}
                  className="ml-auto inline-flex items-center gap-1 rounded-md border border-destructive/30 bg-destructive/10 px-2.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 disabled:opacity-50"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingId && (
        <DoctorForm
          form={form}
          setForm={setForm}
          onClose={closeForm}
          onSave={() => handleSave(editingId)}
          busy={busy === editingId}
          title="Edit doctor"
        />
      )}
    </div>
  );
}

function DoctorForm({
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
          <Field label="Name" required>
            <Input value={form.name} onChange={(e) => set("name", e.target.value)} />
          </Field>
          <Field label="Slug" required>
            <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="dr-jane-doe" />
          </Field>
          <Field label="Role">
            <Input value={form.role} onChange={(e) => set("role", e.target.value)} />
          </Field>
          <Field label="Credentials">
            <Input value={form.credentials} onChange={(e) => set("credentials", e.target.value)} />
          </Field>
          <Field label="Experience">
            <Input value={form.experience} onChange={(e) => set("experience", e.target.value)} placeholder="5+ years" />
          </Field>
          <Field label="Image URL">
            <Input value={form.image} onChange={(e) => set("image", e.target.value)} />
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
          <Field label="Specialties (one per line)" full>
            <Textarea rows={3} value={form.specialties} onChange={(e) => set("specialties", e.target.value)} />
          </Field>
          <Field label="Treatments (one per line)" full>
            <Textarea rows={3} value={form.treatments} onChange={(e) => set("treatments", e.target.value)} />
          </Field>
          <Field label="Education (one per line)" full>
            <Textarea rows={3} value={form.education} onChange={(e) => set("education", e.target.value)} />
          </Field>
          <Field label="Short bio" full>
            <Textarea rows={2} value={form.bio} onChange={(e) => set("bio", e.target.value)} />
          </Field>
          <Field label="Full bio" full>
            <Textarea rows={4} value={form.fullBio} onChange={(e) => set("fullBio", e.target.value)} />
          </Field>
          <Field label="Approach" full>
            <Textarea rows={3} value={form.approach} onChange={(e) => set("approach", e.target.value)} />
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
