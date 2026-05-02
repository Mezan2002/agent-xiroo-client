import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function POST(req) {
  try {
    const { message, history = [], memories = [] } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error:
            "API Key not configured. Please add GEMINI_API_KEY to your .env.local file.",
        },
        { status: 500 },
      );
    }

    const systemPrompt = `You are Agent Xiroo, a powerful AI assistant. 
Here is what you remember about the user and context:
${memories.length > 0 ? memories.join("\n") : "No specific memories yet."}

Use this information to provide personalized and context-aware responses. 
If the user asks about something you remember, refer to these memories.
Keep your responses professional, helpful, and direct.`;

    // Use Gemini 3 Flash Preview
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview", // Using 1.5 Flash as it's more stable
      systemInstruction: systemPrompt,
      contents: [
        ...history.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
        { role: "user", parts: [{ text: message }] },
      ],
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to connect to AI." },
      { status: 500 },
    );
  }
}
