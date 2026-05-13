import { NextResponse } from 'next/server';
import { getChatModel } from '@/lib/gemini';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const orderSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10),
  product: z.string(),
  message: z.string().optional(),
});

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
      ...validatedData,
      poem,
      status: 'confirmed',
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ 
      success: true, 
      orderId: orderRef.id, 
      poem,
      message: "Your everlasting bloom is reserved. The Petal Oracle has sent a poem to your soul."
    });
  } catch (error) {
    console.error('Order Error:', error);
    return NextResponse.json({ error: 'The garden is momentarily closed. Please try again.' }, { status: 500 });
  }
}
