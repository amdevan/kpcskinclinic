import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@kpcskin.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "kpc-admin-2026";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "kpc-skin-clinic-fallback-secret-2026-secure",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@kpcskin.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;
        if (!email || !password) return null;

        // 1) Match against env-var superadmin
        if (email === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
          return {
            id: "env-admin",
            email: ADMIN_EMAIL,
            name: "Site Admin",
            role: "admin",
          } as any;
        }

        // 2) Match against DB users (lazy import to avoid crash if DB unavailable)
        try {
          const { db } = await import("@/lib/db");
          const user = await db.user.findUnique({ where: { email } });
          if (user && password === ADMIN_PASSWORD) {
            return {
              id: user.id,
              email: user.email,
              name: user.name || user.email,
              role: user.role || "admin",
            } as any;
          }
        } catch (e) {
          // DB not yet migrated — fall through
          console.error("[auth] DB user lookup failed:", e);
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
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
  secret: process.env.NEXTAUTH_SECRET,
};
