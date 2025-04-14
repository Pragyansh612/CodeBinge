import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { sendBulkEmails } from '@/lib/emailService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Create authenticated Supabase client
  const supabaseServerClient = createServerSupabaseClient({ req, res });
    
  // Check if user is authenticated
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  // Check if user is admin
  const ADMIN_EMAILS = ['saxenaprgyansh@gmail.com'];
  if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { subject, content } = req.body;
      
    if (!subject || !content) {
      return res.status(400).json({ error: 'Subject and content are required' });
    }
      
    // Get all active subscribers
    const { data: subscribers, error } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('is_active', true);
      
    if (error) {
      throw new Error(error.message);
    }
      
    if (!subscribers || subscribers.length === 0) {
      return res.status(404).json({ error: 'No active subscribers found' });
    }
      
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
          <p>To unsubscribe from this newsletter, please <a href="${process.env.SITE_URL}/unsubscribe" style="color: #0066cc;">click here</a>.</p>
        </div>
      </div>
    `;
      
    // Send the newsletter
    const sentCount = await sendBulkEmails(
      recipientEmails,
      subject,
      htmlContent,
      content // Add this if your sendBulkEmails function expects a plain text version
    );
      
    return res.status(200).json({
      success: true,
      sentCount
    });
      
  } catch (error) {
    console.error('Error sending newsletter:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to send newsletter'
    });
  }
}