import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createHash, randomBytes } from "crypto";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@kpcskin.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "kpc-admin-2026";

// Hash passwords for comparison (simple SHA-256)
function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

// Session secret — required, never expose fallback in production logs
const SESSION_SECRET = process.env.NEXTAUTH_SECRET || (() => {
  // Generate a random secret for dev only (changes per restart — not for production)
  if (process.env.NODE_ENV === "production") {
    console.error("[auth] WARNING: NEXTAUTH_SECRET not set! Using insecure fallback.");
  }
  return "kpc-skin-clinic-dev-secret-" + randomBytes(16).toString("hex");
})();

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
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;
        if (!email || !password) return null;

        // Rate limiting: prevent brute force (in-memory, per process)
        const key = `auth-fail-${email}`;
        const fails = (globalThis as any)[key] || { count: 0, reset: 0 };
        const now = Date.now();
        if (fails.reset < now) {
          (globalThis as any)[key] = { count: 0, reset: now + 60000 };
        } else {
          fails.count++;
          if (fails.count > 5) {
            console.warn(`[auth] Rate limit exceeded for ${email}`);
            return null;
          }
        }

        // 1) Match against env-var superadmin
        if (email === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
          return {
            id: "env-admin",
            email: ADMIN_EMAIL,
            name: "Site Admin",
            role: "admin",
          } as any;
        }

        // 2) Match against DB users (lazy import)
        try {
          const { db } = await import("@/lib/db");
          const user = await db.user.findUnique({ where: { email } });
          if (user && user.password) {
            // Compare hashed password from DB
            if (hashPassword(password) === user.password || password === user.password) {
              return {
                id: user.id,
                email: user.email,
                name: user.name || user.email,
                role: user.role || "admin",
              } as any;
            }
          }
        } catch (e) {
          console.error("[auth] DB user lookup failed:", e);
        }

        // Track failed attempt
        fails.count++;
        console.warn(`[auth] Failed login attempt for ${email} from ${email}`);
        return null;
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
