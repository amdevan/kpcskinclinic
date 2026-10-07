import { format } from "date-fns";
import { db } from "@/lib/db";
import { AdminUserList } from "@/components/admin/admin-user-list";

export const dynamic = "force-dynamic";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
};

export default async function AdminUsersPage() {
  let users: UserRow[] = [];

  try {
    const rows = await db.user.findMany({ orderBy: { createdAt: "desc" } });
    users = rows.map((u: any) => ({
      id: u.id,
      name: u.name ?? "",
      email: u.email,
      role: u.role ?? "admin",
      createdAt: u.createdAt,
    }));
  } catch {
    // DB not available — show empty state
  }

  const formatted = users.map((u) => ({
    ...u,
    createdAtLabel: format(new Date(u.createdAt), "dd MMM yyyy, HH:mm"),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Users</h1>
        <p className="text-sm text-muted-foreground">
          Manage administrator accounts that can log into this panel.
        </p>
      </div>

      <AdminUserList users={formatted} />
    </div>
  );
}
