import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { hasRole } from "./lib/permissions";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/auth/signin",
    },
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        
        if (path.startsWith("/portal")) {
          return !!token;
        }
        
        if (path.startsWith("/owner")) {
          return token?.role === "OWNER";
        }
        
        if (path.startsWith("/admin")) {
          return token?.role === "OWNER" || token?.role === "ADMIN";
        }
        
        if (path.startsWith("/executive")) {
          return token?.role === "OWNER" || token?.role === "ADMIN" || token?.role === "ACCOUNT_EXECUTIVE";
        }
        
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/portal/:path*", 
    "/owner/:path*",
    "/admin/:path*", 
    "/executive/:path*",
    "/api/artists/:path*", 
    "/api/forum/:path*", 
    "/api/messages/:path*", 
    "/api/documents/:path*", 
    "/api/announcements/:path*",
    "/api/pages/:path*",
    "/api/users/:path*",
  ],
};