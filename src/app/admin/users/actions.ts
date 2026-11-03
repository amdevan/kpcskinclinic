"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { hashPassword, passwordStrength } from "@/lib/password";
import { requireSession } from "@/lib/security";

export async function createUser(
  data: Record<string, any>,
): Promise<{ ok: boolean; error?: string }> {
  if (!(await requireSession())) return { ok: false, error: "unauthorized" };
  try {
    const name = String(data?.name || "").trim();
    const email = String(data?.email || "").trim().toLowerCase();
    const password = String(data?.password || "").trim();
    const role = String(data?.role || "admin").trim();

    if (!name) return { ok: false, error: "Name is required" };
    if (!email) return { ok: false, error: "Email is required" };
    if (!password) return { ok: false, error: "Password is required" };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { ok: false, error: "Invalid email format" };
    }

    const strength = passwordStrength(password);
    if (!strength.ok) {
      return { ok: false, error: strength.error };
    }

    const hashed = hashPassword(password);

    // Create the user and its shadow password record atomically — a partial
    // write would leave the account unable to log in.
    await db.$transaction([
      db.user.create({
        data: { name, email, role },
      }),
      db.siteSetting.upsert({
        where: { key: `user_pass:${email}` },
        create: { key: `user_pass:${email}`, value: hashed, group: "auth" },
        update: { value: hashed, group: "auth" },
      }),
    ]);

    revalidatePath("/admin/users");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Create failed" };
  }
}

export async function saveUser(
  id: string,
  data: Record<string, any>,
): Promise<{ ok: boolean; error?: string }> {
  if (!(await requireSession())) return { ok: false, error: "unauthorized" };
  try {
    const existing = await db.user.findUnique({ where: { id } });
    if (!existing) return { ok: false, error: "User not found" };

    const name = String(data?.name ?? existing.name ?? "").trim();
    const email = String(data?.email ?? existing.email ?? "").trim().toLowerCase();
    const role = String(data?.role ?? existing.role ?? "admin").trim();
    const password = String(data?.password || "").trim();

    if (!name) return { ok: false, error: "Name is required" };
    if (!email) return { ok: false, error: "Email is required" };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { ok: false, error: "Invalid email format" };
    }

    // Validate a new password BEFORE touching the profile, so a weak
    // password doesn't half-apply the save.
    let hashed: string | null = null;
    if (password) {
      const strength = passwordStrength(password);
      if (!strength.ok) {
        return { ok: false, error: strength.error };
      }
      hashed = hashPassword(password);
    }

    // Update the profile and the shadow password record atomically.
    await db.$transaction(async (tx) => {
      await tx.user.update({
        where: { id },
        data: { name, email, role },
      });

      if (hashed) {
        if (email !== existing.email) {
          // Email changed: write the shadow under the NEW key, then remove
          // the old one so the previous login key no longer resolves.
          await tx.siteSetting.upsert({
            where: { key: `user_pass:${email}` },
            create: { key: `user_pass:${email}`, value: hashed, group: "auth" },
            update: { value: hashed, group: "auth" },
          });
          await tx.siteSetting
            .delete({ where: { key: `user_pass:${existing.email}` } })
            .catch(() => {
              // ignore — may already be gone
            });
        } else {
          await tx.siteSetting.upsert({
            where: { key: `user_pass:${email}` },
            create: { key: `user_pass:${email}`, value: hashed, group: "auth" },
            update: { value: hashed, group: "auth" },
          });
        }
      }
    });

    revalidatePath("/admin/users");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Save failed" };
  }
}

export async function deleteUser(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!(await requireSession())) return { ok: false, error: "unauthorized" };
  try {
    const existing = await db.user.findUnique({ where: { id } });
    if (!existing) return { ok: false, error: "User not found" };

    // Remove the user and its shadow password record atomically.
    await db.$transaction(async (tx) => {
      await tx.user.delete({ where: { id } });
      await tx.siteSetting
        .delete({ where: { key: `user_pass:${existing.email}` } })
        .catch(() => {
          // ignore — may already be gone
        });
    });

    revalidatePath("/admin/users");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Delete failed" };
  }
}
