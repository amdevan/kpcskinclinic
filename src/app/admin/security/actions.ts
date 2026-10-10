"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

/**
 * Unlock an account by deleting all failed LoginAttempt rows for the given
 * email within the lockout window. The next authorize() call will see no
 * recent failures and proceed normally.
 */
export async function unlockAccount(
  email: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      return { ok: false, error: "Email is required" };
    }
    // We can't read the configured lockout window from env at runtime in a
    // server action reliably (it's hardcoded in auth.ts via the LOGIN_*
    // env vars). Use a generous 24-hour window — anything older than 24h
    // has already rolled off and can't affect lockout anyway.
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await db.loginAttempt.deleteMany({
      where: {
        email: normalizedEmail,
        success: false,
        createdAt: { gte: cutoff },
      },
    });
    revalidatePath("/admin/security");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Unlock failed" };
  }
}

/**
 * Clear login history. If `email` is provided, deletes only that user's
 * attempts; otherwise deletes the entire LoginAttempt table.
 */
export async function clearLoginHistory(
  email?: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    if (email && email.trim()) {
      const normalizedEmail = email.trim().toLowerCase();
      await db.loginAttempt.deleteMany({
        where: { email: normalizedEmail },
      });
    } else {
      await db.loginAttempt.deleteMany({});
    }
    revalidatePath("/admin/security");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Clear failed" };
  }
}

/**
 * Persist the security threshold settings (max attempts, lockout minutes)
 * to the SiteSetting table. The authorize() function reads these from env
 * with defaults — these rows are surfaced on the security page so the
 * admin can audit them. NOTE: changing them here updates the DB but does
 * NOT change the running process env — a redeploy is required for new
 * values to take effect. The page makes this clear.
 */
export async function saveSecuritySettings(
  values: Record<string, string>,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const maxAttempts = String(values?.login_max_attempts || "").trim();
    const lockoutMinutes = String(values?.login_lockout_minutes || "").trim();

    const upserts: Promise<any>[] = [];

    if (maxAttempts) {
      const n = Number(maxAttempts);
      if (!Number.isFinite(n) || n < 1 || n > 50) {
        return {
          ok: false,
          error: "Max attempts must be a number between 1 and 50",
        };
      }
      upserts.push(
        db.siteSetting.upsert({
          where: { key: "login_max_attempts" },
          create: {
            key: "login_max_attempts",
            value: String(Math.floor(n)),
            group: "auth",
          },
          update: {
            value: String(Math.floor(n)),
            group: "auth",
          },
        }),
      );
    }

    if (lockoutMinutes) {
      const n = Number(lockoutMinutes);
      if (!Number.isFinite(n) || n < 1 || n > 1440) {
        return {
          ok: false,
          error: "Lockout minutes must be a number between 1 and 1440",
        };
      }
      upserts.push(
        db.siteSetting.upsert({
          where: { key: "login_lockout_minutes" },
          create: {
            key: "login_lockout_minutes",
            value: String(Math.floor(n)),
            group: "auth",
          },
          update: {
            value: String(Math.floor(n)),
            group: "auth",
          },
        }),
      );
    }

    await Promise.all(upserts);
    revalidatePath("/admin/security");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Save failed" };
  }
}
