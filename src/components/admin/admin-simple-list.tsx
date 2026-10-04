"use client";

import { useState, useTransition } from "react";
import {
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  X,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export type AdminField = {
  key: string;
  label: string;
  type?: "text" | "textarea";
  required?: boolean;
  full?: boolean;
  placeholder?: string;
};

export type AdminItem = Record<string, any> & {
  id: string;
  published: boolean;
};

type ActionFn = (
  id: string,
  action: "create" | "update" | "delete" | "toggle-publish",
  data?: Record<string, any>,
) => Promise<{ ok?: boolean; error?: string } | null | undefined>;

export function AdminSimpleList({
  title,
  subtitle,
  items,
  fields,
  action,
}: {
  title: string;
  subtitle?: string;
  items: AdminItem[];
  fields: AdminField[];
  action: ActionFn;
}) {
  const [local, setLocal] = useState<AdminItem[]>(items);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const titleField = fields.find((f) => f.key === "title") || fields.find((f) => f.key === "name") || fields[0];
  const categoryField = fields.find((f) => f.key === "category");

  function emptyForm() {
    const f: Record<string, string> = {};
    for (const field of fields) f[field.key] = "";
    return f;
  }

  function startAdd() {
    setForm(emptyForm());
    setAdding(true);
    setEditingId(null);
  }

  function startEdit(item: AdminItem) {
    const f: Record<string, string> = {};
    for (const field of fields) {
      const v = item[field.key];
      if (v === undefined || v === null) f[field.key] = "";
      else if (typeof v === "boolean") f[field.key] = v ? "true" : "false";
      else if (Array.isArray(v) || typeof v === "object") f[field.key] = JSON.stringify(v, null, 2);
      else f[field.key] = String(v);
    }
    setForm(f);
    setEditingId(item.id);
    setAdding(false);
  }

  function closeForm() {
    setEditingId(null);
    setAdding(false);
    setForm({});
  }

  async function handleSave(id: string | null) {
    setBusy(id || "new");
    // Make sure required fields are filled
    for (const f of fields) {
      if (f.required && !form[f.key]?.trim()) {
        alert(`${f.label} is required`);
        setBusy(null);
        return;
      }
    }
    startTransition(async () => {
      const res =
        id === null
          ? await action("new", "create", form)
          : await action(id, "update", form);
      setBusy(null);
      if (res?.ok) {
        closeForm();
        window.location.reload();
      } else {
        alert(res?.error || "Save failed");
      }
    });
  }

  async function handleTogglePublish(item: AdminItem) {
    setBusy(item.id);
    startTransition(async () => {
      const res = await action(item.id, "toggle-publish");
      setBusy(null);
      if (res?.ok) {
        setLocal((arr) =>
          arr.map((x) =>
            x.id === item.id ? { ...x, published: !x.published } : x,
          ),
        );
      }
    });
  }

  async function handleDelete(item: AdminItem) {
    const label = String(item[titleField.key] || "item");
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;
    setBusy(item.id);
    startTransition(async () => {
      const res = await action(item.id, "delete");
      setBusy(null);
      if (res?.ok) {
        setLocal((arr) => arr.filter((x) => x.id !== item.id));
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <Button onClick={startAdd} size="sm" className="bg-brand hover:bg-brand/90">
          <Plus className="size-4" />
          Add new
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr className="text-left">
                <th className="px-3 py-3 font-medium text-muted-foreground">Title</th>
                {categoryField && (
                  <th className="px-3 py-3 font-medium text-muted-foreground">Category</th>
                )}
                <th className="px-3 py-3 font-medium text-muted-foreground">Status</th>
                <th className="px-3 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {local.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-10 text-center text-muted-foreground">
                    No items yet. Click <span className="font-medium text-foreground">Add new</span> to create one.
                  </td>
                </tr>
              ) : (
                local.map((item) => (
                  <tr key={item.id} className="border-b last:border-0 transition-colors hover:bg-muted/30">
                    <td className="px-3 py-3">
                      <p className="font-medium text-foreground">
                        {String(item[titleField.key] || "—")}
                      </p>
                      {item.slug && (
                        <p className="text-[11px] font-mono text-muted-foreground">/{item.slug}</p>
                      )}
                    </td>
                    {categoryField && (
                      <td className="px-3 py-3 text-muted-foreground">
                        {String(item[categoryField.key] || "—")}
                      </td>
                    )}
                    <td className="px-3 py-3">
                      <Badge
                        variant="outline"
                        className={
                          item.published
                            ? "border-green/30 bg-green/15 text-green"
                            : "border-rust/30 bg-rust/15 text-rust"
                        }
                      >
                        {item.published ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => startEdit(item)}
                          disabled={busy === item.id}
                          title="Edit"
                          className="inline-flex size-8 items-center justify-center rounded-md border border-border text-foreground hover:bg-accent disabled:opacity-50"
                        >
                          <Pencil className="size-4" />
                        </button>
                        <button
                          onClick={() => handleTogglePublish(item)}
                          disabled={busy === item.id}
                          title={item.published ? "Unpublish" : "Publish"}
                          className="inline-flex size-8 items-center justify-center rounded-md border border-border text-foreground hover:bg-accent disabled:opacity-50"
                        >
                          {item.published ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          disabled={busy === item.id}
                          title="Delete"
                          className="inline-flex size-8 items-center justify-center rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 disabled:opacity-50"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(adding || editingId) && (
        <SimpleForm
          fields={fields}
          form={form}
          setForm={setForm}
          onClose={closeForm}
          onSave={() => handleSave(editingId)}
          busy={busy === editingId || busy === "new"}
          title={editingId ? "Edit item" : "Add new item"}
        />
      )}
    </div>
  );
}

function SimpleForm({
  fields,
  form,
  setForm,
  onClose,
  onSave,
  busy,
  title,
}: {
  fields: AdminField[];
  form: Record<string, string>;
  setForm: (f: Record<string, string>) => void;
  onClose: () => void;
  onSave: () => void;
  busy: boolean;
  title: string;
}) {
  function set(k: string, v: string) {
    setForm({ ...form, [k]: v });
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
          {fields.map((f) => (
            <div key={f.key} className={f.full ? "sm:col-span-2" : ""}>
              <Label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {f.label}
                {f.required && <span className="text-rust">*</span>}
              </Label>
              {f.type === "textarea" ? (
                <Textarea
                  rows={4}
                  value={form[f.key] ?? ""}
                  onChange={(e) => set(f.key, e.target.value)}
                  placeholder={f.placeholder}
                />
              ) : (
                <Input
                  value={form[f.key] ?? ""}
                  onChange={(e) => set(f.key, e.target.value)}
                  placeholder={f.placeholder}
                />
              )}
            </div>
          ))}
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
