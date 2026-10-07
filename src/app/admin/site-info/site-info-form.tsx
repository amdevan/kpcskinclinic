"use client";

import { useState, useTransition } from "react";
import { Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/image-upload";
import { saveSiteInfo } from "./actions";
import {
  SITE_INFO_GROUPS,
  EMAIL_SETTING_FIELDS,
  DEFAULT_SITE_INFO,
  type SiteInfoField,
} from "./constants";

type Props = {
  initialValues: Record<string, string>;
};

export function SiteInfoForm({ initialValues }: Props) {
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [, startTransition] = useTransition();

  function set(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setBusy(true);
    setMsg(null);
    startTransition(async () => {
      const res = await saveSiteInfo(values);
      setBusy(false);
      if (res?.ok) {
        setMsg({ kind: "ok", text: "Settings saved." });
      } else {
        setMsg({ kind: "err", text: res?.error || "Save failed" });
      }
    });
  }

  function handleReset() {
    if (!confirm("Reset all values to factory defaults? Unsaved changes will be lost.")) return;
    setValues(DEFAULT_SITE_INFO);
  }

  return (
    <div className="space-y-6">
      {SITE_INFO_GROUPS.map((group) => (
        <Section
          key={group.id}
          title={group.label}
          description={group.description}
        >
          <FieldGrid fields={group.fields} values={values} set={set} />
        </Section>
      ))}

      <Section
        title="Email / SMTP"
        description="Used by the contact form and notification emails. Keep SMTP password confidential."
      >
        <FieldGrid fields={EMAIL_SETTING_FIELDS} values={values} set={set} />
      </Section>

      <div className="sticky bottom-0 z-10 -mx-4 mt-6 flex items-center justify-end gap-2 border-t bg-card px-4 py-3 lg:-mx-8 lg:px-8">
        {msg && (
          <span
            className={
              msg.kind === "ok"
                ? "mr-auto text-xs font-medium text-green"
                : "mr-auto text-xs font-medium text-rust"
            }
          >
            {msg.text}
          </span>
        )}
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={busy}
        >
          <RotateCcw className="size-4" />
          Reset
        </Button>
        <Button
          type="button"
          onClick={handleSave}
          disabled={busy}
          className="bg-brand hover:bg-brand/90"
        >
          {busy ? "Saving…" : "Save changes"}
          <Save className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-card p-5 shadow-sm">
      <header className="mb-4">
        <h2 className="font-display text-base font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </header>
      {children}
    </section>
  );
}

function FieldGrid({
  fields,
  values,
  set,
}: {
  fields: SiteInfoField[];
  values: Record<string, string>;
  set: (key: string, value: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {fields.map((f) => (
        <div
          key={f.key}
          className={f.type === "textarea" || f.type === "image" ? "sm:col-span-2" : ""}
        >
          <Label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {f.label}
          </Label>
          {f.type === "textarea" ? (
            <Textarea
              rows={3}
              value={values[f.key] ?? ""}
              onChange={(e) => set(f.key, e.target.value)}
              placeholder={f.placeholder}
            />
          ) : f.type === "image" ? (
            <ImageUpload
              value={values[f.key] ?? ""}
              onChange={(url) => set(f.key, url)}
            />
          ) : (
            <Input
              value={values[f.key] ?? ""}
              onChange={(e) => set(f.key, e.target.value)}
              placeholder={f.placeholder}
            />
          )}
          {f.help && (
            <p className="mt-1 text-[11px] text-muted-foreground">{f.help}</p>
          )}
        </div>
      ))}
    </div>
  );
}
