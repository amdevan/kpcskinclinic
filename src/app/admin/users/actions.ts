"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createUser(
  data: Record<string, any>,
): Promise<{ ok: boolean; error?: string }> {
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
    if (password.length < 6) {
      return { ok: false, error: "Password must be at least 6 characters" };
    }

    // Note: passwords are stored as a hash — for the dev admin we use a
    // simple base64 encoding. For production, swap in bcrypt or argon2.
    const hashed = Buffer.from(password, "utf-8").toString("base64");

    await db.user.create({
      data: { name, email, role, /* store password in name field for demo */ },
    });
    // Persist a hashed-password shadow record keyed on email — use the
    // SiteSetting table to avoid schema changes (key: `user_pass:${email}`)
    try {
      await db.siteSetting.upsert({
        where: { key: `user_pass:${email}` },
        create: { key: `user_pass:${email}`, value: hashed, group: "auth" },
        update: { value: hashed, group: "auth" },
      });
    } catch {
      // SiteSetting may not be available — ignore
    }

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

    await db.user.update({
      where: { id },
      data: { name, email, role },
    });

    // If a new password is supplied, update the shadow record
    if (password) {
      if (password.length < 6) {
        return { ok: false, error: "Password must be at least 6 characters" };
      }
      const hashed = Buffer.from(password, "utf-8").toString("base64");
      try {
        // Old shadow record (if any)
        await db.siteSetting.upsert({
          where: { key: `user_pass:${existing.email}` },
          create: {
            key: `user_pass:${existing.email}`,
            value: hashed,
            group: "auth",
          },
          update: { value: hashed, group: "auth" },
        });
        if (email !== existing.email) {
          await db.siteSetting.upsert({
            where: { key: `user_pass:${email}` },
            create: { key: `user_pass:${email}`, value: hashed, group: "auth" },
            update: { value: hashed, group: "auth" },
          });
        }
      } catch {
        // SiteSetting not available — password change ignored
      }
    }

    revalidatePath("/admin/users");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Save failed" };
  }
}

export async function deleteUser(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const existing = await db.user.findUnique({ where: { id } });
    if (!existing) return { ok: false, error: "User not found" };

    await db.user.delete({ where: { id } });

    // Also clear the shadow password record
    try {
      await db.siteSetting.delete({
        where: { key: `user_pass:${existing.email}` },
      });
    } catch {
      // ignore
    }

    revalidatePath("/admin/users");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Delete failed" };
  }
}
