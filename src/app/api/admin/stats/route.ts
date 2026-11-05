import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const [doctors, treatments, packages, appointments, subscribers, posts] =
    await Promise.all([
      db.doctor.count(),
      db.treatment.count(),
      db.package.count(),
      db.appointment.count(),
      db.newsletterSubscriber.count(),
      db.post.count(),
    ]);

  return NextResponse.json({
    doctors,
    treatments,
    packages,
    appointments,
    subscribers,
    posts,
  });
}