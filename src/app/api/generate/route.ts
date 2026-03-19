import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { description, industry, vibe } = await req.json();
  if (!description)
    return NextResponse.json(
      { error: "Description required" },
      { status: 400 }
    );

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey)
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            'You are a creative branding expert who generates startup names. Return JSON only: { "names": [{ "name": string, "tagline": string, "domain": string, "explanation": string }] }. Generate exactly 10 unique, memorable startup names.',
        },
        {
          role: "user",
          content: `Startup description: ${description}\nIndustry: ${industry || "General"}\nVibe: ${vibe || "Professional"}`,
        },
      ],
      temperature: 0.9,
      max_tokens: 2048,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok)
    return NextResponse.json({ error: "AI service error" }, { status: 502 });
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content)
    return NextResponse.json({ error: "No response" }, { status: 502 });

  return NextResponse.json(JSON.parse(content));
}
