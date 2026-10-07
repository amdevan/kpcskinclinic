"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import {
  ALL_SITE_INFO_FIELDS,
  SITE_INFO_KEY_TO_GROUP,
} from "./constants";

/**
 * Upsert a batch of SiteSetting key/value pairs.
 * `values` is a Record<key, value>. Keys that don't match a known field
 * are ignored. Empty values are stored as empty strings (not deleted) so the
 * admin UI can clear a field.
 */
export async function saveSiteInfo(values: Record<string, string>) {
  try {
    const allowedKeys = new Set(ALL_SITE_INFO_FIELDS.map((f) => f.key));
    const upserts = Object.entries(values)
      .filter(([k]) => allowedKeys.has(k))
      .map(([key, value]) => {
        const group = SITE_INFO_KEY_TO_GROUP[key] || "general";
        return db.siteSetting.upsert({
          where: { key },
          create: { key, value: String(value ?? ""), group },
          update: { value: String(value ?? ""), group },
        });
      });

    await Promise.all(upserts);

    // Revalidate every public route that reads SiteSettings
    revalidatePath("/admin/site-info");
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/services");
    revalidatePath("/doctors");
    revalidatePath("/packages");
    revalidatePath("/hair-transplant");
    revalidatePath("/success-stories");
    revalidatePath("/std-sti");
    revalidatePath("/blog");

    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Save failed" };
  }
}
