import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default async function AdminPage() {
  const session = await getServerSession();
  if (!session) redirect("/admin/login");

  return <AdminDashboard />;
}