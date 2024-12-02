import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  ProtectedPage,
  ProtectedRoutes,
  UnprotectedRoutes,
} from "./utils/Protectedpage";
import { routesUrl } from "./utils/pagesurl";

// Middleware function
export async function middleware(request) {
  const token = await getToken({ req: request });
  const role = token?.role;
  const allroutes = ProtectedRoutes[role] || ProtectedPage;
  const pathname = request.nextUrl.pathname;
  console.log("pathname", pathname);
  // Check if the route is protected
  const isProtectedRoute = allroutes?.some((route) =>
    pathname.startsWith(route)
  );
  // Check if the route is UnprotectedRoutes
  const isUnprotectedRoute = UnprotectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  // check if the user is authorized and token is  avaliable
  if (isUnprotectedRoute && token) {
    const redirectUrl = allroutes[0];
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }
  // check if the user is Unauthorized and token is not avaliable
  if (isProtectedRoute && !token) {
    const redirectUrl = UnprotectedRoutes[0];
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }
  if(token){
    const data = pathname === allroutes;
  if(data){
    return NextResponse.redirect(new URL(routesUrl.home, request.url));
  }
  }
  return NextResponse.next();
}
export const config = {
  matcher: [ProtectedPage],
};
