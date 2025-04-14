import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { sendBulkEmails } from '@/lib/emailService';

export async function POST(request: Request) {
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
    const ADMIN_EMAILS = ['saxenaprgyansh@gmail.com'];
    if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get request body
    const { subject, content } = await request.json();
    
    if (!subject || !content) {
      return NextResponse.json({ error: 'Subject and content are required' }, { status: 400 });
    }
    
    // Get all active subscribers - use the same authenticated supabase client
    const { data: subscribers, error } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('is_active', true);
    
    if (error) {
      throw new Error(error.message);
    }
    
    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ error: 'No active subscribers found' }, { status: 404 });
    }
    
    console.log(`Found ${subscribers.length} active subscribers`);
    
    // Extract just the email addresses
    const recipientEmails = subscribers.map(sub => sub.email);
    
    // Create HTML content from the plain text
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">${subject}</h2>
        <div style="line-height: 1.6;">
          ${content.replace(/\n/g, '<br>')}
        </div>
        <div style="margin-top: 20px; font-size: 12px; color: #666;">
          <p>To unsubscribe from this newsletter, please <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe" style="color: #0066cc;">click here</a>.</p>
        </div>
      </div>
    `;
    
    // Send the newsletter
    const sentCount = await sendBulkEmails(
      recipientEmails,
      subject,
      htmlContent,
      content // plain text version
    );
    
    console.log(`Successfully sent email to ${sentCount} subscribers`);
    
    return NextResponse.json({
      success: true,
      sentCount
    });
  } catch (error) {
    console.error('Error sending newsletter:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Failed to send newsletter'
    }, { status: 500 });
  }
}