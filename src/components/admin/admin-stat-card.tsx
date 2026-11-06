import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  trend?: string;
}

export function StatCard({ label, value, trend }: StatCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
      {trend && <p className="mt-1 text-xs text-green-600">{trend}</p>}
    </div>
  );
}

// Backwards-compatible wrapper used by the security panel.
interface AdminStatCardProps {
  label: string;
  value: number;
  icon?: LucideIcon;
  color?: "brand" | "rust" | "gold" | "green";
  hint?: string;
}

const COLOR_MAP: Record<NonNullable<AdminStatCardProps["color"]>, string> = {
  brand: "border-blue-200 bg-blue-50",
  rust: "border-red-200 bg-red-50",
  gold: "border-amber-200 bg-amber-50",
  green: "border-emerald-200 bg-emerald-50",
};

export function AdminStatCard({
  label,
  value,
  icon: Icon,
  color = "brand",
  hint,
}: AdminStatCardProps) {
  return (
    <div className={`rounded-lg border p-4 shadow-sm ${COLOR_MAP[color]}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        {Icon && <Icon className="h-4 w-4 text-gray-500" />}
      </div>
      <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}