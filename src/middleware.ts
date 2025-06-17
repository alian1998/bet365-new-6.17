// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("gameToken")?.value;


//   if (!token && request.nextUrl.pathname !== "/login" && request.nextUrl.pathname !== "/sign-up") {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
//   if (token && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/sign-up")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
// }
// export const config = {
//   matcher: ["/deposit", "/withdraw", "/login", "/sign-up"],
// };


import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("gameToken")?.value;
  const url = request.nextUrl;
  const referral = url.searchParams.get("referral");

  // If referral exists and token exists, force logout by clearing the token
  if (referral && token && url.pathname === "/sign-up") {
    const response = NextResponse.next();
    response.cookies.delete("gameToken");
    return response;
  }

  // Redirect to login if no token and accessing protected routes
  if (!token && url.pathname !== "/login" && url.pathname !== "/sign-up") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to home if already logged in and trying to access login or sign-up
  if (token && (url.pathname === "/login" || url.pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/deposit", "/withdraw", "/login", "/sign-up"],
};
