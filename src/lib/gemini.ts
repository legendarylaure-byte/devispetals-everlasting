import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI | null = null;

export function getChatModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  
  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
  
  return genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction: "You are the 'Petal Oracle', the AI CEO of Devis Petals Pvt. Ltd. Your voice is poetic, meaningful, professional, and joyful. You specialize in handmade everlasting flowers. You help customers with queries and orders, and you provide business growth suggestions to the admin. Always maintain a 'World Elite' premium tone."
  });
}

/**
 * Generate a poetic response for customer interaction.
 */
export async function generatePoeticReply(prompt: string) {
  const model = getChatModel();
  if (!model) throw new Error('AI Model not initialized. Please check GEMINI_API_KEY.');
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

/**
 * AI CEO Business Insight Generator
 */
export async function generateBusinessInsight(salesData: any) {
  const model = getChatModel();
  if (!model) throw new Error('AI Model not initialized. Please check GEMINI_API_KEY.');
  
  const prompt = `Analyze this sales data and suggest a world-class growth strategy for Devis Petals: ${JSON.stringify(salesData)}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
