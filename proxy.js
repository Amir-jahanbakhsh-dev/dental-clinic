import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev_secret_change_me"
);

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  // صفحه ورود ادمین باید همیشه در دسترس باشد
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("adminToken")?.value;

  if (!token) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "admin") {
      throw new Error("دسترسی غیرمجاز");
    }
    return NextResponse.next();
  } catch (error) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("adminToken");
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
