import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const path = req.nextUrl.pathname;
      // Allow the login page itself without auth
      if (path === "/admin/login") return true;
      // All other /admin routes require a token
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
