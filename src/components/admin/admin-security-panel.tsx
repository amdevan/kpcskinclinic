"use client";

import * as React from "react";
import { formatDistanceToNow } from "date-fns";
import {
  ShieldCheck,
  Lock,
  AlertTriangle,
  Trash2,
  Unlock,
  Save,
  Loader2,
  Activity,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  unlockAccount,
  clearLoginHistory,
  saveSecuritySettings,
} from "@/app/admin/security/actions";

export type Attempt = {
  id: string;
  email: string;
  ip: string;
  userAgent: string;
  success: boolean;
  reason: string;
  createdAt: string;
};

export type LockedAccount = {
  email: string;
  attempts: number;
  lastAttempt: string;
};

type Props = {
  attempts: Attempt[];
  total24h: number;
  failed24h: number;
  lockedAccounts: LockedAccount[];
  settings: {
    login_max_attempts: string;
    login_lockout_minutes: string;
  };
};

const reasonLabels: Record<string, string> = {
  ok: "Success",
  bad_password: "Wrong password",
  locked: "Account locked",
  no_user: "No such user",
  rate_limited: "Rate limited",
  "": "Unknown",
};

export function AdminSecurityPanel({
  attempts,
  total24h,
  failed24h,
  lockedAccounts,
  settings,
}: Props) {
  const [busyEmail, setBusyEmail] = React.useState<string | null>(null);
  const [clearing, setClearing] = React.useState(false);
  const [maxAttempts, setMaxAttempts] = React.useState(
    settings.login_max_attempts || "5",
  );
  const [lockoutMinutes, setLockoutMinutes] = React.useState(
    settings.login_lockout_minutes || "15",
  );
  const [savingSettings, setSavingSettings] = React.useState(false);
  const [settingsMsg, setSettingsMsg] = React.useState<{
    kind: "ok" | "err";
    text: string;
  } | null>(null);

  async function handleUnlock(email: string) {
    setBusyEmail(email);
    try {
      const res = await unlockAccount(email);
      if (res?.ok) {
        toast.success(`Unlocked ${email}`);
      } else {
        toast.error(res?.error || "Unlock failed");
      }
    } finally {
      setBusyEmail(null);
    }
  }

  async function handleClearHistory(email?: string) {
    setClearing(true);
    try {
      const res = await clearLoginHistory(email);
      if (res?.ok) {
        toast.success(email ? `Cleared history for ${email}` : "Login history cleared");
      } else {
        toast.error(res?.error || "Clear failed");
      }
    } finally {
      setClearing(false);
    }
  }

  async function handleSaveSettings() {
    setSavingSettings(true);
    setSettingsMsg(null);
    try {
      const res = await saveSecuritySettings({
        login_max_attempts: maxAttempts,
        login_lockout_minutes: lockoutMinutes,
      });
      if (res?.ok) {
        setSettingsMsg({ kind: "ok", text: "Settings saved." });
        toast.success("Security settings saved.");
      } else {
        setSettingsMsg({ kind: "err", text: res?.error || "Save failed" });
        toast.error(res?.error || "Save failed");
      }
    } finally {
      setSavingSettings(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminStatCard
          label="Attempts (24h)"
          value={total24h}
          icon={Activity}
          color="brand"
          hint="Total login attempts in the last 24 hours"
        />
        <AdminStatCard
          label="Failed (24h)"
          value={failed24h}
          icon={XCircle}
          color="rust"
          hint="Failed login attempts in the last 24 hours"
        />
        <AdminStatCard
          label="Locked accounts"
          value={lockedAccounts.length}
          icon={Lock}
          color="gold"
          hint="Emails currently blocked by lockout threshold"
        />
      </div>

      {/* Locked accounts */}
      <section className="rounded-xl border bg-card p-5 shadow-sm">
        <header className="mb-4 flex items-center gap-2">
          <Lock className="h-4 w-4 text-gold" />
          <h2 className="font-display text-base font-semibold text-foreground">
            Locked accounts
          </h2>
        </header>
        {lockedAccounts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No accounts are currently locked. Good.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {lockedAccounts.map((l) => (
              <li
                key={l.email}
                className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-foreground">{l.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {l.attempts} failed attempts · last attempt{" "}
                    {formatDistanceToNow(new Date(l.lastAttempt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={busyEmail === l.email}
                  onClick={() => handleUnlock(l.email)}
                >
                  {busyEmail === l.email ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Unlock className="h-4 w-4" />
                  )}
                  Unlock
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Recent attempts table */}
      <section className="rounded-xl border bg-card p-5 shadow-sm">
        <header className="mb-4 flex items-center gap-2">
          <Activity className="h-4 w-4 text-brand" />
          <h2 className="font-display text-base font-semibold text-foreground">
            Recent attempts
          </h2>
        </header>
        {attempts.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No login attempts recorded yet.
          </p>
        ) : (
          <div className="max-h-96 overflow-y-auto scrollbar-thin rounded-md border">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 bg-muted/80 backdrop-blur">
                <tr className="text-left">
                  <th className="px-3 py-2 font-medium text-muted-foreground">
                    Email
                  </th>
                  <th className="px-3 py-2 font-medium text-muted-foreground">
                    IP
                  </th>
                  <th className="px-3 py-2 font-medium text-muted-foreground">
                    When
                  </th>
                  <th className="px-3 py-2 font-medium text-muted-foreground">
                    Result
                  </th>
                  <th className="px-3 py-2 font-medium text-muted-foreground">
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((a) => (
                  <tr
                    key={a.id}
                    className="border-t border-border hover:bg-muted/40"
                  >
                    <td className="px-3 py-2 font-medium text-foreground">
                      {a.email}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {a.ip || "—"}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {formatDistanceToNow(new Date(a.createdAt), {
                        addSuffix: true,
                      })}
                    </td>
                    <td className="px-3 py-2">
                      {a.success ? (
                        <Badge
                          variant="outline"
                          className="border-green/30 bg-green/15 text-green"
                        >
                          <CheckCircle2 className="h-3 w-3" /> Success
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-rust/30 bg-rust/15 text-rust"
                        >
                          <XCircle className="h-3 w-3" /> Failed
                        </Badge>
                      )}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {reasonLabels[a.reason] || a.reason || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Security settings form */}
      <section className="rounded-xl border bg-card p-5 shadow-sm">
        <header className="mb-4 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-brand" />
          <h2 className="font-display text-base font-semibold text-foreground">
            Security settings
          </h2>
        </header>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Max failed attempts
            </Label>
            <Input
              type="number"
              min={1}
              max={50}
              value={maxAttempts}
              onChange={(e) => setMaxAttempts(e.target.value)}
              placeholder="5"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              After this many consecutive failures within the lockout window,
              the account is locked.
            </p>
          </div>
          <div>
            <Label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Lockout window (minutes)
            </Label>
            <Input
              type="number"
              min={1}
              max={1440}
              value={lockoutMinutes}
              onChange={(e) => setLockoutMinutes(e.target.value)}
              placeholder="15"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              How long the lockout counts failures for. After the window
              elapses, the counter resets.
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-md border border-gold/30 bg-gold/10 p-3 text-xs text-foreground/80">
          <AlertTriangle className="h-4 w-4 shrink-0 text-gold" />
          <p>
            Note: these values are read by the auth provider from environment
            variables at boot time. Saving here persists the audit record in
            the database; a redeploy with the matching <code>LOGIN_MAX_ATTEMPTS</code>{" "}
            and <code>LOGIN_LOCKOUT_MINUTES</code> env vars is required for
            the live authorize() flow to pick up new values.
          </p>
        </div>
        <div className="mt-4 flex items-center gap-2">
          {settingsMsg && (
            <span
              className={
                settingsMsg.kind === "ok"
                  ? "text-xs font-medium text-green"
                  : "text-xs font-medium text-rust"
              }
            >
              {settingsMsg.text}
            </span>
          )}
          <Button
            type="button"
            onClick={handleSaveSettings}
            disabled={savingSettings}
            className="ml-auto bg-brand hover:bg-brand/90"
          >
            {savingSettings ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save settings
          </Button>
        </div>
      </section>

      {/* Danger zone */}
      <section className="rounded-xl border border-rust/40 bg-rust/5 p-5 shadow-sm">
        <header className="mb-2 flex items-center gap-2">
          <Trash2 className="h-4 w-4 text-rust" />
          <h2 className="font-display text-base font-semibold text-foreground">
            Clear login history
          </h2>
        </header>
        <p className="mb-4 text-sm text-muted-foreground">
          Removes the LoginAttempt audit trail. Useful when the table has
          grown large or after a security incident has been reviewed. This
          also immediately unlocks any locked accounts (because lockout
          decisions are derived from these rows).
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" disabled={clearing}>
              {clearing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              Clear all history
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear all login history?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete every LoginAttempt row in the
                database. Locked accounts will be unlocked. This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleClearHistory(undefined)}
                className="bg-rust hover:bg-rust/90 text-white"
              >
                Yes, clear everything
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </div>
  );
}
