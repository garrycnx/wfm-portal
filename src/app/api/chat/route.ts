import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the WFM Clubs Assistant — a friendly, expert AI assistant built into the WFM Clubs platform. You can answer any question on any topic.

You especially excel at Workforce Management (WFM) topics for contact centres and BPOs:
- Erlang C calculations and staffing formulas (show step-by-step working)
- Shrinkage, capacity planning, headcount modelling
- Forecasting methods (WMA, Holt-Winters, ARIMA, ML)
- Service level, occupancy, AHT, ASA definitions and benchmarks
- Schedule adherence, Real-Time Analysis (RTA), intraday management
- WFM career guidance and interview preparation

For WFM calculations, always show the formula, inputs, and working clearly using bullet points.
For general questions, answer helpfully and concisely.
Keep responses clear and well-structured. Use **bold** for key terms and numbers.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      text: "⚠️ GROQ_API_KEY is missing from .env.local — please add it and restart the server.",
    });
  }

  try {
    const { messages } = await req.json();

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",  // Current active free model
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({
        text: `⚠️ Groq error ${res.status}: ${data?.error?.message ?? JSON.stringify(data).slice(0, 200)}`,
      });
    }

    const text = data?.choices?.[0]?.message?.content?.trim();

    if (!text) {
      return NextResponse.json({
        text: `⚠️ Empty response. Raw: ${JSON.stringify(data).slice(0, 300)}`,
      });
    }

    return NextResponse.json({ text });
  } catch (err: any) {
    return NextResponse.json({
      text: `⚠️ Request failed: ${err?.message ?? String(err)}`,
    });
  }
}