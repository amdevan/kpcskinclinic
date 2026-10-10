import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { randomBytes } from "crypto";
import { verifyPassword } from "@/lib/password";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@kpcskin.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "kpc-admin-2026";

// Account lockout thresholds — overridable via env so the admin security
// page can adjust them without a redeploy.
const LOGIN_MAX_ATTEMPTS = Number(process.env.LOGIN_MAX_ATTEMPTS) || 5;
const LOGIN_LOCKOUT_MINUTES = Number(process.env.LOGIN_LOCKOUT_MINUTES) || 15;

// Session secret — required, never expose fallback in production logs.
// Relies on .env value (NEXTAUTH_SECRET) for stability across restarts so
// JWT sessions don't invalidate every time the dev server reloads.
const SESSION_SECRET =
  process.env.NEXTAUTH_SECRET ||
  (() => {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[auth] WARNING: NEXTAUTH_SECRET not set! Using insecure fallback.",
      );
    }
    return "kpc-skin-clinic-dev-secret-" + randomBytes(16).toString("hex");
  })();

type AuthorizeRequest = {
  headers?: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
} | undefined;

function extractIp(req: AuthorizeRequest): string {
  if (!req) return "";
  const headers = req.headers || {};
  const xff = headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.length > 0) {
    return xff.split(",")[0].trim();
  }
  if (Array.isArray(xff) && xff.length > 0) {
    return String(xff[0]).split(",")[0].trim();
  }
  const realIp = headers["x-real-ip"];
  if (typeof realIp === "string" && realIp.length > 0) return realIp.trim();
  if (Array.isArray(realIp) && realIp.length > 0) return String(realIp[0]).trim();
  if (req.socket?.remoteAddress) return req.socket.remoteAddress;
  return "";
}

function extractUserAgent(req: AuthorizeRequest): string {
  if (!req) return "";
  const headers = req.headers || {};
  const ua = headers["user-agent"];
  if (typeof ua === "string") return ua.slice(0, 256);
  if (Array.isArray(ua) && ua.length > 0) {
    return String(ua[0]).slice(0, 256);
  }
  return "";
}

/**
 * Persist a login attempt to the DB. Failures here are swallowed so that
 * a DB hiccup never blocks the login flow.
 */
async function logAttempt(args: {
  email: string;
  ip: string;
  userAgent: string;
  success: boolean;
  reason: string;
}): Promise<void> {
  try {
    const { db } = await import("@/lib/db");
    await db.loginAttempt.create({
      data: {
        email: args.email,
        ip: args.ip,
        userAgent: args.userAgent,
        success: args.success,
        reason: args.reason,
      },
    });
  } catch (e) {
    console.error("[auth] Failed to log login attempt:", e);
  }
}

/**
 * Check whether an account is currently locked. Returns true when the
 * latest LOGIN_MAX_ATTEMPTS attempts within the LOGIN_LOCKOUT_MINUTES
 * window are all failures (i.e. the user has hit the lockout threshold).
 */
async function isAccountLocked(email: string): Promise<boolean> {
  try {
    const { db } = await import("@/lib/db");
    const windowMs = LOGIN_LOCKOUT_MINUTES * 60 * 1000;
    const since = new Date(Date.now() - windowMs);
    const recentFailures = await db.loginAttempt.findMany({
      where: {
        email,
        success: false,
        createdAt: { gte: since },
      },
      orderBy: { createdAt: "desc" },
      take: LOGIN_MAX_ATTEMPTS,
    });
    if (recentFailures.length < LOGIN_MAX_ATTEMPTS) return false;
    // All `take` rows returned are failures (filtered) AND we hit the
    // threshold count → locked.
    return true;
  } catch (e) {
    console.error("[auth] Failed to query login attempts:", e);
    return false;
  }
}

export const authOptions: NextAuthOptions = {
  secret: SESSION_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email?.trim().toLowerCase() || "";
        const password = credentials?.password || "";
        if (!email || !password) return null;

        const ip = extractIp(req as AuthorizeRequest);
        const userAgent = extractUserAgent(req as AuthorizeRequest);

        // Account lockout — short-circuit BEFORE touching credentials so
        // brute-force attempts can't keep probing.
        const locked = await isAccountLocked(email);
        if (locked) {
          await logAttempt({
            email,
            ip,
            userAgent,
            success: false,
            reason: "locked",
          });
          console.warn(
            `[auth] Login blocked for ${email} — account locked (${LOGIN_MAX_ATTEMPTS} failures in ${LOGIN_LOCKOUT_MINUTES}m)`,
          );
          return null;
        }

        // 1) Env-var super-admin — password compared in plaintext (do NOT hash)
        if (email === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
          await logAttempt({
            email,
            ip,
            userAgent,
            success: true,
            reason: "ok",
          });
          return {
            id: "env-admin",
            email: ADMIN_EMAIL,
            name: "Site Admin",
            role: "admin",
          } as any;
        }

        // 2) Match against DB users (lazy import to avoid hot reload issues)
        try {
          const { db } = await import("@/lib/db");
          const user = await db.user.findUnique({ where: { email } });
          if (!user) {
            await logAttempt({
              email,
              ip,
              userAgent,
              success: false,
              reason: "no_user",
            });
            return null;
          }

          // Password lives in a SiteSetting shadow record keyed by email
          // (key: `user_pass:{email}`). The User.password column itself
          // is intentionally left null.
          let storedHash = "";
          try {
            const passRow = await db.siteSetting.findUnique({
              where: { key: `user_pass:${email}` },
            });
            storedHash = passRow?.value || user.password || "";
          } catch {
            storedHash = user.password || "";
          }

          if (!storedHash) {
            await logAttempt({
              email,
              ip,
              userAgent,
              success: false,
              reason: "no_user",
            });
            return null;
          }

          const valid = verifyPassword(password, storedHash);
          if (!valid) {
            await logAttempt({
              email,
              ip,
              userAgent,
              success: false,
              reason: "bad_password",
            });
            return null;
          }

          await logAttempt({
            email,
            ip,
            userAgent,
            success: true,
            reason: "ok",
          });
          return {
            id: user.id,
            email: user.email,
            name: user.name || user.email,
            role: user.role || "admin",
          } as any;
        } catch (e) {
          console.error("[auth] DB user lookup failed:", e);
          await logAttempt({
            email,
            ip,
            userAgent,
            success: false,
            reason: "no_user",
          });
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.email = (user as any).email;
        token.name = (user as any).name;
        token.role = (user as any).role || "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        session.user.name = (token.name as string) || session.user.name;
        session.user.email = (token.email as string) || session.user.email;
      }
      return session;
    },
  },
  // Security headers for cookies
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};
