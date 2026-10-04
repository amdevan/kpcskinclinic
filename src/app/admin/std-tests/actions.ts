"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function dbStdTestAction(
  id: string,
  action: "create" | "update" | "delete" | "toggle-publish",
  data?: Record<string, any>,
) {
  try {
    if (action === "create") {
      const name = String(data?.name || "").trim();
      if (!name) return { ok: false, error: "Name is required" };
      await db.stdTest.create({
        data: {
          name,
          price: String(data?.price ?? ""),
          composition: String(data?.composition ?? ""),
          isPackage: parseBool(data?.isPackage, false),
          tests: parseInt(String(data?.tests ?? "0"), 10) || 0,
          recommended: parseBool(data?.recommended, false),
          published: parseBool(data?.published, true),
        },
      });
      revalidatePath("/admin/std-tests");
      revalidatePath("/std-sti");
      return { ok: true };
    }

    if (action === "update") {
      await db.stdTest.update({
        where: { id },
        data: {
          ...(data?.name !== undefined ? { name: String(data.name) } : {}),
          ...(data?.price !== undefined ? { price: String(data.price) } : {}),
          ...(data?.composition !== undefined ? { composition: String(data.composition) } : {}),
          ...(data?.isPackage !== undefined ? { isPackage: parseBool(data.isPackage, false) } : {}),
          ...(data?.tests !== undefined ? { tests: parseInt(String(data.tests), 10) || 0 } : {}),
          ...(data?.recommended !== undefined ? { recommended: parseBool(data.recommended, false) } : {}),
          ...(data?.published !== undefined ? { published: parseBool(data.published, true) } : {}),
        },
      });
      revalidatePath("/admin/std-tests");
      revalidatePath("/std-sti");
      return { ok: true };
    }

    if (action === "toggle-publish") {
      const existing = await db.stdTest.findUnique({ where: { id } });
      if (!existing) return { ok: false, error: "Not found" };
      await db.stdTest.update({
        where: { id },
        data: { published: !existing.published },
      });
      revalidatePath("/admin/std-tests");
      revalidatePath("/std-sti");
      return { ok: true };
    }

    if (action === "delete") {
      await db.stdTest.delete({ where: { id } });
      revalidatePath("/admin/std-tests");
      revalidatePath("/std-sti");
      return { ok: true };
    }

    return { ok: false, error: "Unknown action" };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Action failed" };
  }
}

function parseBool(v: any, fallback: boolean): boolean {
  if (v === true || v === "true") return true;
  if (v === false || v === "false") return false;
  return fallback;
}
