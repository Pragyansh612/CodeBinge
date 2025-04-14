import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    // Create authenticated Supabase client
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            const cookie = cookieStore.get(name);
            return cookie?.value;
          },
        },
      }
    );

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();

    // Check if user is admin
    // const ADMIN_EMAILS = ['saxenaprgyansh@gmail.com'];
    // if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Get the count of active subscribers - use the same supabase client
    const { count, error } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    if (error) {
      throw new Error(error.message);
    }

    console.log("Subscriber count:", count);
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error getting subscriber count:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Failed to get subscriber count'
    }, { status: 500 });
  }
}