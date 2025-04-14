import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Define admin emails array - you can move this to environment variables
const ADMIN_EMAILS = ['saxenaprgyansh@gmail.com']

export async function adminAuthMiddleware(req: NextRequest) {
  console.log("Running admin auth middleware");
  
  // Create supabase server client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = req.cookies.get(name);
          console.log(`Cookie ${name}:`, cookie?.value ? "exists" : "missing");
          return cookie?.value;
        },
        set() {
          // We can't set cookies in middleware
        },
        remove() {
          // We can't remove cookies in middleware
        },
      },
    }
  );

  // Get session
  const { data: { session } } = await supabase.auth.getSession();
  console.log("Session exists:", !!session);
  console.log("User email:", session?.user?.email);
  console.log("Is admin:", session?.user?.email ? ADMIN_EMAILS.includes(session.user.email) : false);

  // If no session or user email not in admin list
  if (!session || !session.user.email || !ADMIN_EMAILS.includes(session.user.email)) {
    console.log("Redirecting to login");
    const redirectUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  console.log("Allowing access to protected route");
  return NextResponse.next();
}