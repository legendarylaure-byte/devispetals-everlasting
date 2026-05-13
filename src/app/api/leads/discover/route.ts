import { NextResponse } from 'next/server';
import { getChatModel } from '@/lib/gemini';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const prompt = `Act as an expert business developer for Devis Petals (Everlasting Flowers in Kathmandu). 
    Identify 5 potential corporate leads in Nepal (Hotels, Luxury Spas, Wedding Planners, or Banks) that would benefit from premium everlasting floral decor. 
    For each lead, provide:
    1. Name
    2. Why they are a good lead
    3. A draft poetic WhatsApp message to send them.
    Format as JSON.`;

    const model = getChatModel();
    if (!model) throw new Error('AI Model not initialized');
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up JSON if necessary (sometimes AI adds markdown blocks)
    const jsonStr = text.replace(/```json|```/g, '').trim();
    const leads = JSON.parse(jsonStr);

    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Lead Gen Error:', error);
    return NextResponse.json({ error: 'The Oracle is observing the market. Please wait.' }, { status: 500 });
  }
}
