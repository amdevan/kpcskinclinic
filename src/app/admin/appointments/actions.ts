"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function dbAppointmentAction(
  id: string,
  action: "update" | "delete",
  data?: Record<string, any>,
) {
  try {
    if (action === "update") {
      await db.appointment.update({
        where: { id },
        data: {
          ...(data?.status ? { status: String(data.status) } : {}),
        },
      });
      revalidatePath("/admin/appointments");
      revalidatePath("/admin");
      return { ok: true };
    }

    if (action === "delete") {
      await db.appointment.delete({ where: { id } });
      revalidatePath("/admin/appointments");
      revalidatePath("/admin");
      return { ok: true };
    }

    return { ok: false, error: "Unknown action" };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Action failed" };
  }
}
