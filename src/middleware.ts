import { type NextRequest } from "next/server";
import { updateSession } from "@/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|^/$).*)",
  ],
};

// |^/$ this is making the home page accessible to all users
// |.*\\.(?:svg|png|jpg|jpeg|gif|webp)$ this is making all image files accessible to all users
// |favicon.ico this is making the favicon accessible to all users
// |_next/static this is making the static files accessible to all users
// |_next/image this is making the image files accessible to all users
