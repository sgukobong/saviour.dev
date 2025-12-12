import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// RAG Helper: Constructs the system prompt with database context
const buildSystemInstruction = (context: string) => {
  return `You are the personal AI assistant for Saviour Ukobong, a Nigerian software builder who creates AI apps, web apps, mobile apps, and learning systems engineered for Africa’s toughest conditions.

===========================
REAL-TIME DATABASE CONTEXT
===========================
The following is real data from Saviour's portfolio database (Projects, Blogs, Skills):
${context}

===========================
STYLE & FORMATTING RULES
===========================
1. **BE BRIEF**: Keep responses short.
2. **USE CONTEXT**: If the user asks about a specific project or blog post listed above, use the context details.
3. **NO MARKDOWN BOLD**: Do not use asterisks. Use plain text.
4. **TONE**: Warm, confident, human.

===========================
APPOINTMENT & PAYMENTS
===========================
1. Booking: https://calendly.com/sgukobong
2. Payment: Direct users to #/pay for invoices.

===========================
ASSISTANT PERSONA
===========================
You speak as the assistant. You know Saviour builds offline-first apps, AI coaching tools, and EdTech platforms.
Philosophy: Technology should work even with poor network (2G) or unstable power.
`;
};

export const chatWithGemini = async (history: ChatMessage[], newMessage: string, contextData: string = ''): Promise<string> => {
  try {
    const formattedHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const systemInstruction = buildSystemInstruction(contextData);

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: formattedHistory,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const response = await chat.sendMessage({
      message: newMessage
    });

    return response.text || "I'm not sure how to respond to that.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "System currently unavailable. Please try again later.";
  }
};