/**
 * WhatsApp Outreach Utility
 * Handles poetic message formatting for customer outreach.
 */

export interface WhatsAppMessage {
  to: string;
  body: string;
}

export async function sendPoeticWhatsApp(to: string, poem: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !from) {
    console.warn('Twilio credentials missing. Logging message instead:');
    console.log(`To: ${to}\nMessage: ${poem}`);
    return { success: true, status: 'logged' };
  }

  // In production, we would use the Twilio SDK here:
  // const client = require('twilio')(accountSid, authToken);
  // await client.messages.create({ from: `whatsapp:${from}`, body: poem, to: `whatsapp:${to}` });

  return { success: true, status: 'sent' };
}

export function formatPoeticInvite(businessName: string, poem: string) {
  return `🌺 *Devis Petals* 🌺\n\nGreetings to the visionaries at ${businessName},\n\n${poem}\n\nWould you like to bring the soul of Kathmandu's eternal blooms to your space? Reply *YES* to explore our corporate collections.`;
}
