import { withAuth, NextRequestWithAuth, NextAuthMiddlewareOptions } from "next-auth/middleware";
import { NextResponse } from "next/server";
const middleware = (req: NextRequestWithAuth) => {
   const isPrivateRoutes = req.nextUrl.pathname.startsWith("/private");
  const isAdminUser = req.nextauth.token?.role === "admin"; // colocar dentro de um contexto

   if (isPrivateRoutes && !isAdminUser) {
     return NextResponse.rewrite(new URL("/denied", req.url));
   }
};

const callbackOptions: NextAuthMiddlewareOptions= {};

export default withAuth(middleware, callbackOptions);

export const config = {
  matcher: "/(private)/:path*",
};
