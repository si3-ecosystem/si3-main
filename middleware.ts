"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const url = request.nextUrl;

    const res = NextResponse.next();

    console.log("Middleware:", url.pathname);

    return res;
  } catch (error) {
    console.error("Middleware error:", error);
  }
}

export const config = {
  matcher: ["/"],
};
