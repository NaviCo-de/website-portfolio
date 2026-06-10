import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, verifyAdminToken } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifyAdminToken(token);

  if (pathname.startsWith("/api/admin") && !session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  if (pathname === "/admin/login" && session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && !session) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
