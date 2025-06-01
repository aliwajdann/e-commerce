import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Log the API key (for debugging, remove later)
    console.log("Using GROQ_API_KEY:", process.env.GROQ_API_KEY ? "Loaded" : "Missing");

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct", // Match cURL
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          ...messages,
        ],
      }),
    });

    const data = await res.json();

    // Log the full Groq response (debugging)
    console.log("Groq API Response:", JSON.stringify(data, null, 2));

    if (!res.ok) {
      throw new Error(data.error?.message || "Groq API request failed");
    }

    return NextResponse.json(data.choices[0].message);
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}