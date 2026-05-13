import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM = 'Devis Petals <onboarding@resend.dev>';

export async function sendOrderConfirmation(params: {
  to: string;
  customerName: string;
  product: string;
  poem: string;
  orderId: string;
}) {
  const { to, customerName, product, poem, orderId } = params;

  if (!resend) {
    console.log('📧 RESEND_API_KEY not configured. Skipping email send.');
    console.log(`   To: ${to} | Order: ${orderId} | Product: ${product}`);
    console.log(`   Poem: ${poem}`);
    return { success: false, status: 'skipped' };
  }

  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: `Your Everlasting Bloom — Order #${orderId.slice(-6).toUpperCase()}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background:#fdf4f5;font-family:Georgia,serif;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding:40px 20px;">
                <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#fffefe;border-radius:24px;overflow:hidden;box-shadow:0 4px 40px rgba(10,10,10,0.08);">
                  
                  <tr>
                    <td style="background:#0a0a0a;padding:32px 40px;text-align:center;">
                      <h1 style="color:#fffefe;font-size:22px;margin:0;letter-spacing:-0.5px;font-weight:700;">Devis Petals</h1>
                      <p style="color:#e3b0b8;font-size:11px;margin:4px 0 0;text-transform:uppercase;letter-spacing:3px;">Handmade Everlasting Flowers</p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:40px;">
                      <p style="color:#0a0a0a;font-size:18px;margin:0 0 24px;">Dear ${customerName},</p>
                      <p style="color:#666;font-size:15px;line-height:1.6;margin:0 0 32px;">
                        Your <strong style="color:#0a0a0a;">${product}</strong> has been reserved by the Petal Oracle.
                        Our artisans in Kathmandu have begun crafting your everlasting bloom with love and devotion.
                      </p>

                      <div style="background:#fdf4f5;border-radius:16px;padding:24px;margin-bottom:32px;text-align:center;border:1px solid #e3b0b822;">
                        <p style="color:#e3b0b8;font-size:11px;text-transform:uppercase;letter-spacing:3px;margin:0 0 12px;">A Poem for You</p>
                        <p style="color:#0a0a0a;font-size:16px;line-height:1.8;font-style:italic;margin:0;white-space:pre-line;">${poem}</p>
                      </div>

                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                            <span style="color:#999;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Order</span>
                            <span style="float:right;color:#0a0a0a;font-weight:600;">#${orderId.slice(-6).toUpperCase()}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                            <span style="color:#999;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Product</span>
                            <span style="float:right;color:#0a0a0a;font-weight:600;">${product}</span>
                          </td>
                        </tr>
                      </table>

                      <p style="color:#999;font-size:13px;line-height:1.6;margin:32px 0 0;text-align:center;">
                        Crafted with love in Kathmandu, Nepal. <br/>
                        Devis Petals Pvt. Ltd. &mdash; Est. 2026
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return { success: true, status: 'sent' };
  } catch (error) {
    console.error('Email send failed:', error);
    return { success: false, status: 'failed', error };
  }
}
