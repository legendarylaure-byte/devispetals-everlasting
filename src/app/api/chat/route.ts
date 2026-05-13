import { NextResponse } from 'next/server';
import { model } from '@/lib/gemini';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const chatSchema = z.object({
  message: z.string().min(1).max(500),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Task 4: Sanitize and validate input
    const validatedData = chatSchema.parse(body);

    if (!model) throw new Error('AI Model not initialized');
    const result = await model.generateContent(validatedData.message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json({ error: 'The Petal Oracle is resting. Please try again soon.' }, { status: 500 });
  }
}
