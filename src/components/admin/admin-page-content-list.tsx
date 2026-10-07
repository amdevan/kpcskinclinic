"use client";

import { useState, useTransition } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Save,
  Trash2,
  ExternalLink,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/admin/image-upload";
import {
  savePageContent,
  createPageContent,
  deletePageContent,
} from "@/app/admin/pages/actions";

type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "image";
  help?: string;
};

type GroupDef = {
  id: string;
  label: string;
  fields: FieldDef[];
  rows: ContentRow[];
};

type ContentRow = {
  id: string;
  page: string;
  section: string;
  title: string;
  body: string;
  image: string;
  order: number;
};

type PageDef = {
  page: string;
  label: string;
  href: string;
  groups: GroupDef[];
};

type Props = { pages: PageDef[] };

export function AdminPageContentList({ pages }: Props) {
  return (
    <Accordion type="multiple" className="space-y-3">
      {pages.map((p) => (
        <AccordionItem
          key={p.page}
          value={p.page}
          className="overflow-hidden rounded-xl border bg-card shadow-sm"
        >
          <AccordionTrigger className="px-4 hover:no-underline">
            <div className="flex w-full items-center justify-between gap-3 pr-2">
              <div className="flex items-center gap-3">
                <span className="font-display text-base font-semibold text-foreground">
                  {p.label}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  /{p.page === "home" ? "" : p.page}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-brand/5 text-brand">
                  {countRows(p)} entries
                </Badge>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                  aria-label="View page"
                >
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 px-4">
            {p.groups.map((g) => (
              <GroupEditor key={g.id} page={p.page} group={g} />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function countRows(p: PageDef) {
  return p.groups.reduce((acc, g) => acc + g.rows.length, 0);
}

function GroupEditor({ page, group }: { page: string; group: GroupDef }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [rows, setRows] = useState<ContentRow[]>(group.rows);
  const [, startTransition] = useTransition();

  function updateRow(id: string, patch: Partial<ContentRow>) {
    setRows((arr) => arr.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function handleSave(id: string) {
    const row = rows.find((r) => r.id === id);
    if (!row) return;
    setBusy(id);
    startTransition(async () => {
      const res = await savePageContent(id, {
        title: row.title,
        body: row.body,
        image: row.image,
        section: row.section,
        page: row.page,
        order: row.order,
      });
      setBusy(null);
      if (!res?.ok) alert(res?.error || "Save failed");
    });
  }

  async function handleAdd() {
    setBusy(`new-${group.id}`);
    startTransition(async () => {
      const res = await createPageContent({
        page,
        section: group.id,
        title: "",
        body: "",
        image: "",
        order: rows.length,
      });
      setBusy(null);
      if (res?.ok) {
        // Refresh to load the new row's id
        window.location.reload();
      } else {
        alert(res?.error || "Add failed");
      }
    });
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this content block?")) return;
    setBusy(id);
    startTransition(async () => {
      const res = await deletePageContent(id);
      setBusy(null);
      if (res?.ok) {
        setRows((arr) => arr.filter((r) => r.id !== id));
      } else {
        alert(res?.error || "Delete failed");
      }
    });
  }

  return (
    <div className="rounded-lg border border-border/70 bg-background/60 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">{group.label}</p>
          <p className="font-mono text-[11px] text-muted-foreground">
            section: {group.id}
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleAdd}
          disabled={busy === `new-${group.id}`}
        >
          <Plus className="size-3.5" />
          Add block
        </Button>
      </div>

      <div className="space-y-4">
        {rows.length === 0 ? (
          <p className="rounded-md bg-muted/40 px-3 py-4 text-center text-xs text-muted-foreground">
            No blocks yet. Click <strong>Add block</strong> to create one for
            this section.
          </p>
        ) : (
          rows.map((r) => (
            <BlockEditor
              key={r.id}
              row={r}
              fields={group.fields}
              onChange={(patch) => updateRow(r.id, patch)}
              onSave={() => handleSave(r.id)}
              onDelete={() => handleDelete(r.id)}
              busy={busy === r.id}
            />
          ))
        )}
      </div>
    </div>
  );
}

function BlockEditor({
  row,
  fields,
  onChange,
  onSave,
  onDelete,
  busy,
}: {
  row: ContentRow;
  fields: FieldDef[];
  onChange: (patch: Partial<ContentRow>) => void;
  onSave: () => void;
  onDelete: () => void;
  busy: boolean;
}) {
  // Field key maps to column on PageContent
  function value(key: string): string {
    if (key === "title") return row.title;
    if (key === "body") return row.body;
    if (key === "image") return row.image;
    // Aliases — for sections where the UI exposes eyebrow/highlight/description
    // we store them as JSON inside body. For admin ergonomics we still allow
    // raw editing of body.
    return "";
  }

  return (
    <div className="rounded-md border bg-card p-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map((f) => (
          <div
            key={f.key}
            className={
              f.type === "textarea" || f.type === "image" ? "sm:col-span-2" : ""
            }
          >
            <Label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {f.label}
            </Label>
            {f.type === "textarea" ? (
              <Textarea
                rows={3}
                value={f.key === "body" ? row.body : value(f.key)}
                onChange={(e) =>
                  f.key === "body"
                    ? onChange({ body: e.target.value })
                    : onChange({ body: e.target.value })
                }
              />
            ) : f.type === "image" ? (
              <ImageUpload
                value={f.key === "image" ? row.image : value(f.key)}
                onChange={(url) => onChange({ image: url })}
              />
            ) : (
              <Input
                value={f.key === "title" ? row.title : value(f.key)}
                onChange={(e) =>
                  f.key === "title"
                    ? onChange({ title: e.target.value })
                    : onChange({ body: e.target.value })
                }
              />
            )}
            {f.help && (
              <p className="mt-1 text-[10px] text-muted-foreground">{f.help}</p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <Badge variant="outline" className="font-mono text-[10px]">
          id: {row.id}
        </Badge>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onDelete}
            disabled={busy}
            className="inline-flex items-center gap-1 rounded-md border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive hover:bg-destructive/20 disabled:opacity-50"
          >
            <Trash2 className="size-3.5" />
            Delete
          </button>
          <Button
            type="button"
            size="sm"
            onClick={onSave}
            disabled={busy}
            className="bg-brand hover:bg-brand/90"
          >
            {busy ? "Saving…" : "Save"}
            <Save className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Re-export for reordering helpers if needed elsewhere
export function ReorderButtons({
  onUp,
  onDown,
  busy,
}: {
  onUp: () => void;
  onDown: () => void;
  busy: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={onUp}
        disabled={busy}
        aria-label="Move up"
        className="inline-flex size-7 items-center justify-center rounded-md border border-border text-foreground hover:bg-accent disabled:opacity-50"
      >
        <ChevronUp className="size-3.5" />
      </button>
      <button
        type="button"
        onClick={onDown}
        disabled={busy}
        aria-label="Move down"
        className="inline-flex size-7 items-center justify-center rounded-md border border-border text-foreground hover:bg-accent disabled:opacity-50"
      >
        <ChevronDown className="size-3.5" />
      </button>
    </div>
  );
}
