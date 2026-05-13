import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) 
  : null;

export const model = genAI ? genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: "You are the 'Petal Oracle', the AI CEO of Devis Petals Pvt. Ltd. Your voice is poetic, meaningful, professional, and joyful. You specialize in handmade everlasting flowers. You help customers with queries and orders, and you provide business growth suggestions to the admin. Always maintain a 'World Elite' premium tone."
}) : null;

/**
 * Generate a poetic response for customer interaction.
 */
export async function generatePoeticReply(prompt: string) {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

/**
 * AI CEO Business Insight Generator
 */
export async function generateBusinessInsight(salesData: any) {
  const prompt = `Analyze this sales data and suggest a world-class growth strategy for Devis Petals: ${JSON.stringify(salesData)}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
