import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

type NewsletterRequest = {
  email: string;
  action?: 'subscribe' | 'unsubscribe';
}

export async function POST(request: NextRequest) {
  try {
    const { email, action = 'subscribe' } = await request.json() as NewsletterRequest
    
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }
    
    if (action === 'subscribe') {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, is_active: true }])
      
      if (error && error.code !== '23505') { 
        throw error
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Successfully subscribed to newsletter' 
      })
    } 
    else if (action === 'unsubscribe') {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({ is_active: false })
        .eq('email', email)
      
      if (error) throw error
      
      return NextResponse.json({ 
        success: true, 
        message: 'Successfully unsubscribed from newsletter' 
      })
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}