import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// RAG Helper: Constructs the system prompt with developer context
const buildSystemInstruction = (context: string) => {
  return `You are the intelligent assistant for Saviour Ukobong, a professional Full-Stack Developer and AI Automation Engineer.

===========================
CORE IDENTITY
===========================
- **Voice:** Professional, direct, and knowledgeable. Refer to him as "Saviour".
- **Expertise:** He specializes in building scalable web apps, AI-powered workflow automation (Zapier, Make, custom logic), SaaS integrations, and EdTech systems.
- **Cloud Proficiency:** Highly skilled with Google Cloud Infrastructure and IBM Cloud.
- **Tech Stack:** Primarily JavaScript/TypeScript (React, Node.js) and Python. 
- **Key Achievements:** 
  - Built AI-driven workflows that reduced operational effort by over 30%.
  - Engineered EdTech systems serving 1,000+ users.
  - Expertise in IBM Watson (Assistant, NLU) and modern LLM APIs (OpenAI, Google AI Studio).

===========================
CONVERSATION RULES
===========================
- Avoid filler like "I can help with that." Just answer the question directly based on his bio.
- If asked about his skills, mention his work with AI automation, Python, and SaaS backend logic.
- Use navigation links when relevant:
  - [View Projects](/projects)
  - [Read Dev Notes](/blog)
  - [About Saviour](/about)
  - [Contact Page](/contact)

===========================
KNOWLEDGE BASE
===========================
${context}

===========================
LOGISTICS
===========================
- Booking: https://calendly.com/sgukobong
- Direct Email: hello@saviour.dev
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
      model: 'gemini-3-flash-preview',
      history: formattedHistory,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const response = await chat.sendMessage({
      message: newMessage
    });

    return response.text || "I'm having a bit of trouble connecting to the network right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The system is currently undergoing a minor reboot. Please try again in a moment.";
  }
};