import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { DoctorForm } from "@/components/admin/admin-doctor-form";

export default async function NewDoctorPage() {
  const session = await getServerSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">New Doctor</h1>
      <DoctorForm />
    </div>
  );
}