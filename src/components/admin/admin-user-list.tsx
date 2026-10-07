"use client";

import { useState, useTransition } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  X,
  Save,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  createUser,
  saveUser,
  deleteUser,
} from "@/app/admin/users/actions";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  createdAtLabel: string;
};

const EMPTY_FORM = {
  name: "",
  email: "",
  password: "",
  role: "admin",
};

const ROLES = ["admin", "editor", "viewer"];

export function AdminUserList({ users }: { users: UserRow[] }) {
  const [local, setLocal] = useState<UserRow[]>(users);
  const [editing, setEditing] = useState<UserRow | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Record<string, string>>(EMPTY_FORM);
  const [busy, setBusy] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function startAdd() {
    setForm(EMPTY_FORM);
    setAdding(true);
    setEditing(null);
  }

  function startEdit(u: UserRow) {
    setForm({
      name: u.name,
      email: u.email,
      password: "",
      role: u.role,
    });
    setEditing(u);
    setAdding(false);
  }

  function closeForm() {
    setAdding(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  }

  async function handleSave(id: string | null) {
    if (!form.name.trim() || !form.email.trim()) {
      alert("Name and email are required");
      return;
    }
    if (id === null && !form.password.trim()) {
      alert("Password is required when creating a user");
      return;
    }
    setBusy(id || "new");
    startTransition(async () => {
      const res = id === null ? await createUser(form) : await saveUser(id, form);
      setBusy(null);
      if (res?.ok) {
        closeForm();
        window.location.reload();
      } else {
        alert(res?.error || "Save failed");
      }
    });
  }

  async function handleDelete(u: UserRow) {
    if (!confirm(`Delete user ${u.email}? This cannot be undone.`)) return;
    setBusy(u.id);
    startTransition(async () => {
      const res = await deleteUser(u.id);
      setBusy(null);
      if (res?.ok) {
        setLocal((arr) => arr.filter((x) => x.id !== u.id));
      } else {
        alert(res?.error || "Delete failed");
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {local.length} user{local.length === 1 ? "" : "s"}
        </p>
        <Button onClick={startAdd} size="sm" className="bg-brand hover:bg-brand/90">
          <Plus className="size-4" />
          Add user
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr className="text-left">
                <th className="px-3 py-3 font-medium text-muted-foreground">User</th>
                <th className="hidden px-3 py-3 font-medium text-muted-foreground md:table-cell">
                  Email
                </th>
                <th className="px-3 py-3 font-medium text-muted-foreground">Role</th>
                <th className="hidden px-3 py-3 font-medium text-muted-foreground lg:table-cell">
                  Created
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
                    No users in the database. The env-var superadmin always works.
                  </td>
                </tr>
              ) : (
                local.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b last:border-0 transition-colors hover:bg-muted/30"
                  >
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex size-8 items-center justify-center rounded-full bg-brand/10 text-brand">
                          <UserIcon className="size-4" />
                        </span>
                        <span className="font-medium text-foreground">
                          {u.name || "(no name)"}
                        </span>
                      </div>
                    </td>
                    <td className="hidden px-3 py-3 text-muted-foreground md:table-cell">
                      {u.email}
                    </td>
                    <td className="px-3 py-3">
                      <Badge
                        variant="outline"
                        className={
                          u.role === "admin"
                            ? "border-brand/30 bg-brand/10 text-brand"
                            : u.role === "editor"
                              ? "border-cyan/30 bg-cyan/10 text-cyan"
                              : "border-muted-foreground/30 bg-muted/30 text-muted-foreground"
                        }
                      >
                        <ShieldCheck className="mr-1 size-3" />
                        {u.role}
                      </Badge>
                    </td>
                    <td className="hidden px-3 py-3 text-muted-foreground lg:table-cell">
                      {u.createdAtLabel}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => startEdit(u)}
                          disabled={busy === u.id}
                          title="Edit"
                          className="inline-flex size-8 items-center justify-center rounded-md border border-border text-foreground hover:bg-accent disabled:opacity-50"
                        >
                          <Pencil className="size-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(u)}
                          disabled={busy === u.id}
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

      {(adding || editing) && (
        <UserForm
          form={form}
          setForm={setForm}
          onClose={closeForm}
          onSave={() => handleSave(editing?.id ?? null)}
          busy={busy === editing?.id || busy === "new"}
          title={editing ? `Edit ${editing.email}` : "Add new user"}
          isEdit={!!editing}
        />
      )}
    </div>
  );
}

function UserForm({
  form,
  setForm,
  onClose,
  onSave,
  busy,
  title,
  isEdit,
}: {
  form: Record<string, string>;
  setForm: (f: Record<string, string>) => void;
  onClose: () => void;
  onSave: () => void;
  busy: boolean;
  title: string;
  isEdit: boolean;
}) {
  function set(k: string, v: string) {
    setForm({ ...form, [k]: v });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto scrollbar-thin rounded-2xl border bg-card p-6 shadow-xl">
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
              Name <span className="text-rust">*</span>
            </Label>
            <Input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Dr. Jane Doe"
            />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Email <span className="text-rust">*</span>
            </Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="jane@kpcskin.com"
            />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Password {isEdit ? "(leave blank to keep current)" : " *"}
            </Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              placeholder={isEdit ? "•••••••" : "Minimum 6 characters"}
            />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Role
            </Label>
            <select
              value={form.role}
              onChange={(e) => set("role", e.target.value)}
              className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
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
