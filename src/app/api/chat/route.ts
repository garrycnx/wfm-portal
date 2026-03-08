import { NextRequest, NextResponse } from "next/server";
import ReactMarkdown from "react-markdown";



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
  try {
    const { messages } = await req.json();

    // Pollinations AI — completely free, no API key required
    const response = await fetch("https://text.pollinations.ai/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        model: "openai",
        seed: 42,
        private: true,
      }),
    });

    if (!response.ok) {
      console.error("Pollinations API error:", response.status);
      return NextResponse.json(
        { text: "Sorry, I couldn't get a response right now. Please try again in a moment." },
        { status: 200 }
      );
    }

      const raw = await response.text();
      let text = raw;

      try {
        const parsed = JSON.parse(raw);

        // Handle extended thinking / reasoning model responses
        const outputContent = parsed?.output?.[0]?.content;
        if (Array.isArray(outputContent)) {
          // Find the text block (skip reasoning_content blocks)
          const textBlock = outputContent.find(
            (block: { type: string }) => block.type === "text"
          );
          text = textBlock?.text ?? raw;
        } else {
          text =
            parsed?.choices?.[0]?.message?.content ||
            parsed?.content ||
            parsed?.message?.content ||
            parsed?.text ||
            raw;
        }
      } catch {
        text = raw;
      }

    return NextResponse.json({ text: text.trim() });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { text: "An error occurred. Please check your connection and try again." },
      { status: 200 }
    );
  }
}
