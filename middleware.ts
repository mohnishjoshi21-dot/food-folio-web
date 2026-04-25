import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.SECRET_TOKEN as string
);

export async function middleware(request: NextRequest) {

  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  


  // 🔓 Allow login page
  if (pathname === "/admin/login") {

    if (token) {
      try {

        await jwtVerify(token, secret);

        return NextResponse.redirect(
          new URL("/admin", request.url)
        );

      } catch (err) {
        return NextResponse.next();
      }
    }

    return NextResponse.next();
  }



  // 🔐 Protect admin routes
  if (pathname.startsWith("/admin")) {

    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }

    try {

      await jwtVerify(token, secret);

      return NextResponse.next();

    } catch (err) {

      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );

    }
  }


  return NextResponse.next();
}



export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*"
  ],
};