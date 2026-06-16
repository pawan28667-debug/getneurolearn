import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Credentials": "true",
};

interface LessonRequest {
  topic: string;
  exam_type: string;
  subject: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { topic, exam_type, subject } = await req.json() as LessonRequest;

    if (!topic || !exam_type || !subject) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: topic, exam_type, subject" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "AI gateway not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const prompt = `Create a comprehensive, well-structured study lesson for an Indian exam aspirant.
Topic: ${topic}
Subject: ${subject}
Exam Type: ${exam_type}

Return STRICT JSON in exactly this shape (no markdown, no commentary):
{
  "title": "Concise lesson title (max 8 words)",
  "content": "A rich 2-3 paragraph explanation (200-280 words total). First paragraph: clear definitions and the relationship between core concepts. Second paragraph: deeper analysis, how to apply it, and common pitfalls. Optional third paragraph: insight or analogy that helps memory. Separate paragraphs with a blank line (\\n\\n). Use plain text only.",
  "key_points": ["4 to 6 crisp, exam-ready bullet points, each one sentence"],
  "formula": "Most important formula(s) for the topic in plain text. Empty string if none.",
  "examples": ["2-3 short worked examples, each 1-2 sentences"],
  "practice_questions": [
    {
      "question": "Exam-style MCQ on the topic",
      "options": ["option A", "option B", "option C", "option D"],
      "correct_answer": "exact text of the correct option"
    }
  ]
}

Rules:
- Tailor difficulty and terminology to ${exam_type}.
- Generate 3 practice MCQs of increasing difficulty.
- "correct_answer" MUST exactly match one of the strings in "options".
- Output valid JSON only — no code fences.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: "You are an expert Indian-exam educator (JEE/NEET/UPSC/SSC/Boards). Produce structured study notes. Respond with valid JSON only.",
          },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit reached. Try again shortly." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in Lovable workspace." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      return new Response(JSON.stringify({ error: "AI gateway failed", details: errText }), { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      return new Response(JSON.stringify({ error: "No content received from AI" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const normalize = (text: string) => text.trim().replace(/^```(?:json)?\s*/i, "").replace(/```$/, "");
    const extractJson = (text: string) => {
      const n = normalize(text);
      const s = n.indexOf("{");
      const e = n.lastIndexOf("}");
      return s !== -1 && e !== -1 ? n.slice(s, e + 1) : n;
    };

    let lesson;
    try {
      lesson = JSON.parse(extractJson(content));
    } catch (parseError) {
      console.error("Invalid JSON from AI:", content);
      return new Response(JSON.stringify({ error: "Invalid JSON response from AI" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ lesson }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
