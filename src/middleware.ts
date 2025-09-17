import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(_req) {
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/artists/sign-in",
    },
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        
        // Artists pages require authentication
        if (path.startsWith("/artists/dashboard") || 
            path.startsWith("/artists/analytics") || 
            path.startsWith("/artists/profile") ||
            path.startsWith("/artists/music") ||
            path.startsWith("/artists/events") ||
            path.startsWith("/artists/messages") ||
            path.startsWith("/artists/documents") ||
            path.startsWith("/artists/community") ||
            path.startsWith("/artists/settings")) {
          return !!token;
        }
        
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
    "/artists/dashboard/:path*",
    "/artists/analytics/:path*",
    "/artists/profile/:path*",
    "/artists/music/:path*",
    "/artists/events/:path*",
    "/artists/messages/:path*",
    "/artists/documents/:path*",
    "/artists/community/:path*",
    "/artists/settings/:path*",
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