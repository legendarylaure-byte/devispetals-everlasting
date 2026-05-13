import { NextResponse } from 'next/server';
import { getChatModel } from '@/lib/gemini';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initiatePayment, type PaymentMethod } from '@/lib/payments';
import { sendOrderConfirmation } from '@/lib/email';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const orderSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10),
  product: z.string(),
  address: z.string().optional(),
  message: z.string().optional(),
  paymentMethod: z.string().optional().default('cod'),
});

const PRODUCT_PRICES: Record<string, number> = {
  'Eternal Rose Blush': 2500,
  'Kathmandu Gold Lily': 3200,
  'Pearl Orchid Bundle': 4800,
  'Midnight Velvet Tulip': 2900,
  'Custom Bouquet': 3500,
};

function estimatePrice(product: string): number {
  return PRODUCT_PRICES[product] || 3500;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = orderSchema.parse(body);

    // 1. Generate a unique poem for the customer
    const model = getChatModel();
    if (!model) throw new Error('AI Model not initialized');
    
    const poemPrompt = `Write a beautiful, short, and joyful poem (3-4 lines) for ${validatedData.customerName} who just pre-ordered a ${validatedData.product} from Devis Petals. Mention that it's 'Handmade with Love' in Kathmandu. Use colorful floral imagery.`;
    const result = await model.generateContent(poemPrompt);
    const poem = result.response.text();

    // 2. Save to Firestore
    if (!db) throw new Error('Database not initialized');
    const orderRef = await addDoc(collection(db, 'orders'), {
      customerName: validatedData.customerName,
      customerEmail: validatedData.customerEmail,
      customerPhone: validatedData.customerPhone,
      product: validatedData.product,
      address: validatedData.address,
      message: validatedData.message,
      paymentMethod: validatedData.paymentMethod,
      poem,
      status: 'confirmed',
      createdAt: serverTimestamp(),
    });

    // 3. Send poetic order confirmation email
    sendOrderConfirmation({
      to: validatedData.customerEmail,
      customerName: validatedData.customerName,
      product: validatedData.product,
      poem,
      orderId: orderRef.id,
    }).catch(() => {});

    // 4. Initiate payment if not COD
    let paymentUrl: string | undefined;
    if (validatedData.paymentMethod !== 'cod') {
      const payment: any = await initiatePayment(validatedData.paymentMethod as PaymentMethod, {
        amount: estimatePrice(validatedData.product),
        purchaseOrderId: orderRef.id,
        purchaseOrderName: validatedData.product,
        customerName: validatedData.customerName,
        customerEmail: validatedData.customerEmail,
        customerPhone: validatedData.customerPhone,
      });
      paymentUrl = payment.paymentUrl;
    }

    return NextResponse.json({ 
      success: true, 
      orderId: orderRef.id, 
      poem,
      paymentUrl,
      message: "Your everlasting bloom is reserved. The Petal Oracle has sent a poem to your soul."
    });
  } catch (error) {
    console.error('Order Error:', error);
    return NextResponse.json({ error: 'The garden is momentarily closed. Please try again.' }, { status: 500 });
  }
}
