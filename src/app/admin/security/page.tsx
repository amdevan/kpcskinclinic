import { db } from "@/lib/db";
import { AdminSecurityPanel } from "@/components/admin/admin-security-panel";

export const dynamic = "force-dynamic";

export default async function AdminSecurityPage() {
  let attempts: any[] = [];
  let lockedAccounts: { email: string; attempts: number; lastAttempt: Date }[] = [];
  let total24h = 0;
  let failed24h = 0;
  let loginMaxAttempts = process.env.LOGIN_MAX_ATTEMPTS || "5";
  let loginLockoutMinutes = process.env.LOGIN_LOCKOUT_MINUTES || "15";

  try {
    // Pull the threshold settings from SiteSetting (if present) so the
    // form shows the persisted DB values rather than just the env defaults.
    const settingsRows = await db.siteSetting.findMany({
      where: {
        key: { in: ["login_max_attempts", "login_lockout_minutes"] },
      },
    });
    for (const r of settingsRows) {
      if (r.key === "login_max_attempts") loginMaxAttempts = r.value;
      if (r.key === "login_lockout_minutes") loginLockoutMinutes = r.value;
    }
  } catch {
    // ignore
  }

  try {
    const maxN = Number(loginMaxAttempts) || 5;
    const lockoutMs = (Number(loginLockoutMinutes) || 15) * 60 * 1000;
    const lockoutCutoff = new Date(Date.now() - lockoutMs);
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    [attempts, total24h, failed24h] = await Promise.all([
      db.loginAttempt.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
      db.loginAttempt.count({ where: { createdAt: { gte: dayAgo } } }),
      db.loginAttempt.count({
        where: { createdAt: { gte: dayAgo }, success: false },
      }),
    ]);

    // Compute locked accounts: distinct emails that have `maxN` or more
    // recent failures within the lockout window.
    const recentFails = await db.loginAttempt.findMany({
      where: {
        success: false,
        createdAt: { gte: lockoutCutoff },
      },
      orderBy: { createdAt: "desc" },
    });
    const byEmail = new Map<string, { count: number; last: Date }>();
    for (const f of recentFails) {
      const cur = byEmail.get(f.email);
      if (cur) {
        cur.count += 1;
        if (f.createdAt > cur.last) cur.last = f.createdAt;
      } else {
        byEmail.set(f.email, { count: 1, last: f.createdAt });
      }
    }
    for (const [email, info] of byEmail) {
      if (info.count >= maxN) {
        lockedAccounts.push({
          email,
          attempts: info.count,
          lastAttempt: info.last,
        });
      }
    }
    lockedAccounts.sort((a, b) => b.attempts - a.attempts);
  } catch {
    // DB not available — show zeros
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Security
        </h1>
        <p className="text-sm text-muted-foreground">
          Live login-attempt audit trail, account lockout controls and the
          configured security thresholds for admin sign-in.
        </p>
      </div>
      <AdminSecurityPanel
        attempts={attempts.map((a) => ({
          id: a.id,
          email: a.email,
          ip: a.ip,
          userAgent: a.userAgent,
          success: a.success,
          reason: a.reason,
          createdAt:
            a.createdAt instanceof Date
              ? a.createdAt.toISOString()
              : String(a.createdAt),
        }))}
        total24h={total24h}
        failed24h={failed24h}
        lockedAccounts={lockedAccounts.map((l) => ({
          email: l.email,
          attempts: l.attempts,
          lastAttempt: l.lastAttempt.toISOString(),
        }))}
        settings={{
          login_max_attempts: loginMaxAttempts,
          login_lockout_minutes: loginLockoutMinutes,
        }}
      />
    </div>
  );
}
