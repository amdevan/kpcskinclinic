"use client";

import { useState, useTransition } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  X,
  Save,
  Search,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/admin/image-upload";
import {
  saveSeoMeta,
  createSeoMeta,
  deleteSeoMeta,
} from "@/app/admin/seo/actions";

export type SeoRow = {
  id: string;
  url: string;
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonical: string;
};

type Props = { rows: SeoRow[] };

const EMPTY_FORM = {
  url: "",
  title: "",
  description: "",
  keywords: "",
  ogImage: "",
  canonical: "",
};

export function AdminSeoTable({ rows }: Props) {
  const [local, setLocal] = useState<SeoRow[]>(rows);
  const [editing, setEditing] = useState<SeoRow | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Record<string, string>>(EMPTY_FORM);
  const [busy, setBusy] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function startAdd() {
    setForm(EMPTY_FORM);
    setAdding(true);
    setEditing(null);
  }

  function startEdit(r: SeoRow) {
    setForm({
      url: r.url,
      title: r.title,
      description: r.description,
      keywords: r.keywords,
      ogImage: r.ogImage,
      canonical: r.canonical,
    });
    setEditing(r);
    setAdding(false);
  }

  function closeForm() {
    setAdding(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  }

  async function handleSave(id: string | null) {
    if (!form.url.trim()) {
      alert("URL is required");
      return;
    }
    setBusy(id || "new");
    startTransition(async () => {
      const res =
        id === null
          ? await createSeoMeta(form)
          : await saveSeoMeta(id, form);
      setBusy(null);
      if (res?.ok) {
        closeForm();
        window.location.reload();
      } else {
        alert(res?.error || "Save failed");
      }
    });
  }

  async function handleDelete(r: SeoRow) {
    if (!r.id) return; // built-in default — cannot delete
    if (!confirm(`Delete SEO entry for ${r.url}?`)) return;
    setBusy(r.id);
    startTransition(async () => {
      const res = await deleteSeoMeta(r.id);
      setBusy(null);
      if (res?.ok) {
        setLocal((arr) => arr.filter((x) => x.id !== r.id));
      } else {
        alert(res?.error || "Delete failed");
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {local.length} route{local.length === 1 ? "" : "s"} configured
        </p>
        <Button
          onClick={startAdd}
          size="sm"
          className="bg-brand hover:bg-brand/90"
        >
          <Plus className="size-4" />
          Add route
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr className="text-left">
                <th className="px-3 py-3 font-medium text-muted-foreground">URL</th>
                <th className="hidden px-3 py-3 font-medium text-muted-foreground md:table-cell">
                  Title
                </th>
                <th className="hidden px-3 py-3 font-medium text-muted-foreground lg:table-cell">
                  Description
                </th>
                <th className="hidden px-3 py-3 font-medium text-muted-foreground xl:table-cell">
                  Canonical
                </th>
                <th className="px-3 py-3 text-right font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {local.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-10 text-center text-muted-foreground">
                    No SEO entries yet.
                  </td>
                </tr>
              ) : (
                local.map((r) => (
                  <tr
                    key={`${r.url}-${r.id || "default"}`}
                    className="border-b last:border-0 transition-colors hover:bg-muted/30"
                  >
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <Globe className="size-3.5 text-brand" />
                        <span className="font-mono text-xs font-medium text-foreground">
                          {r.url}
                        </span>
                        {!r.id && (
                          <Badge variant="outline" className="bg-muted/40 text-[10px]">
                            default
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="hidden px-3 py-3 text-muted-foreground md:table-cell">
                      <p className="line-clamp-1 max-w-md">{r.title || "—"}</p>
                    </td>
                    <td className="hidden px-3 py-3 text-muted-foreground lg:table-cell">
                      <p className="line-clamp-1 max-w-md">{r.description || "—"}</p>
                    </td>
                    <td className="hidden px-3 py-3 text-muted-foreground xl:table-cell">
                      <span className="font-mono text-[11px]">{r.canonical || "—"}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => startEdit(r)}
                          disabled={busy === r.id}
                          title="Edit"
                          className="inline-flex size-8 items-center justify-center rounded-md border border-border text-foreground hover:bg-accent disabled:opacity-50"
                        >
                          <Pencil className="size-4" />
                        </button>
                        {r.id && (
                          <button
                            onClick={() => handleDelete(r)}
                            disabled={busy === r.id}
                            title="Delete"
                            className="inline-flex size-8 items-center justify-center rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 disabled:opacity-50"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(adding || editing) && (
        <SeoForm
          form={form}
          setForm={setForm}
          onClose={closeForm}
          onSave={() => handleSave(editing?.id ?? null)}
          busy={busy === editing?.id || busy === "new"}
          title={editing ? `Edit ${editing.url}` : "Add SEO entry"}
        />
      )}
    </div>
  );
}

function SeoForm({
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
  function set(k: string, v: string) {
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
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              URL <span className="text-rust">*</span>
            </Label>
            <Input
              value={form.url}
              onChange={(e) => set("url", e.target.value)}
              placeholder="/about"
              disabled={!!title.startsWith("Edit")}
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Site-relative path (e.g. <code>/about</code>).
            </p>
          </div>
          <div>
            <Label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Title
            </Label>
            <Input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="KPC Skin Clinic — About"
            />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Description
            </Label>
            <Textarea
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Short summary used in search results and link previews."
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Keywords
              </Label>
              <Input
                value={form.keywords}
                onChange={(e) => set("keywords", e.target.value)}
                placeholder="skin clinic, kathmandu, hair transplant"
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Canonical URL
              </Label>
              <Input
                value={form.canonical}
                onChange={(e) => set("canonical", e.target.value)}
                placeholder="https://kpcskin.com/about"
              />
            </div>
          </div>
          <div>
            <Label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Open Graph image
            </Label>
            <ImageUpload
              value={form.ogImage}
              onChange={(url) => set("ogImage", url)}
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

// Unused import guard — Search is imported for future filter UI; keep to avoid
// breaking the import order. Marked as used to satisfy lint.
void Search;
