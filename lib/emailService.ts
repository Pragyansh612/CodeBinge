import nodemailer from 'nodemailer';

// Define types for our email functions
export interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
}

// Create a transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send a single email
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Send bulk emails
export async function sendBulkEmails(
  recipients: string[],
  subject: string,
  htmlContent: string,
  textContent?: string
): Promise<number> {
  let successCount = 0;

  for (const recipient of recipients) {
    try {
      const result = await sendEmail({
        to: recipient,
        subject,
        text: textContent || htmlContent.replace(/<[^>]*>/g, ''),
        html: htmlContent,
      });
      
      if (result) successCount++;
    } catch (error) {
      console.error(`Failed to send email to ${recipient}:`, error);
    }
  }

  return successCount;
}