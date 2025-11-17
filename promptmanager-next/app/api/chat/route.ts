import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const body = await req.json();
  const message = body.message;

  if (!message) {
    return NextResponse.json({ error: "Keine Nachricht erhalten" }, { status: 400 });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const result = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Du bist ein professioneller Prompt-Engineer." },
      { role: "user", content: message },
    ],
  });

  return NextResponse.json({ reply: result.choices[0].message.content });
}
