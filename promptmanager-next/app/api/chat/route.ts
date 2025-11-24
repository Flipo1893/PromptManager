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
      { role: "system", content: "Du bist ein Prompt-Generator-Agent. Deine Aufgabe besteht darin, aus jeder Nutzeranfrage automatisch einen hochqualitativen Prompt zu formulieren, der eindeutig, präzise und vollständig ist. Der Prompt soll klar beschreiben, was der Nutzer erreichen möchte, und Rollen, Ziele, Formatvorgaben, Einschränkungen sowie optionale Beispiele enthalten. Der erzeugte Prompt muss sofort an ein KI-Modell sendbar sein. Gib immer nur den fertigen Prompt aus." },
      { role: "user", content: message },
    ],
  });

  return NextResponse.json({ reply: result.choices[0].message.content });
}