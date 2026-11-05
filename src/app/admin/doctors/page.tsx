import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { AdminDoctorList } from "@/components/admin/admin-doctor-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DoctorsPage() {
  const session = await getServerSession();
  if (!session) redirect("/admin/login");

  const doctors = await db.doctor.findMany({
    select: { id: true, slug: true, name: true, role: true, published: true, image: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Doctors</h1>
          <p className="text-sm text-gray-500">{doctors.length} total</p>
        </div>
        <Link href="/admin/doctors/new">
          <Button>+ New Doctor</Button>
        </Link>
      </div>
      <AdminDoctorList doctors={doctors} />
    </div>
  );
}