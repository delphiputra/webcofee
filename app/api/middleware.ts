import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = "your-secret-key"; // Ganti dengan secret key Anda

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Redirect ke login jika token tidak ada
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Verifikasi token JWT
      const decoded = jwt.verify(token, SECRET);
      console.log("Token is valid:", decoded);
    } catch (error) {
      console.error("Invalid token:", error.message);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
