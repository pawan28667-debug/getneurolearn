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

    // Validate input
    if (!topic || !exam_type || !subject) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: topic, exam_type, subject" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
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
  "formula": "Most important formula(s) for the topic in plain text (e.g. 'Cube: V = a³ | Cylinder: V = πr²h | Cone: V = (1/3)πr²h'). Return an empty string if the topic has no formula.",
  "examples": ["2-3 short worked examples or applications, each 1-2 sentences"],
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
- Content must read like premium study notes: structured notes, analysis & insights, deep-dive explanation.
- Generate 3 practice MCQs of increasing difficulty.
- "correct_answer" MUST exactly match one of the strings in "options".
- Do NOT wrap the JSON in code fences.`;

    // Try primary model, fall back to alternative if it fails
    const models = ["gpt-4o-mini", "gpt-4-turbo"];
    let data: any = null;
    let response: Response | null = null;
    let lastErrorText = "";
    let usedModel = models[0];

    for (const model of models) {
      usedModel = model;
      try {
        response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${openaiApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: "system",
                content: "You are an expert Indian-exam educator (JEE/NEET/UPSC/SSC/Boards). You produce structured, accurate study notes with deep insights. Always respond with valid JSON only — no prose, no markdown fences.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.7,
            max_tokens: 3000,
            response_format: { type: "json_object" },
          }),
        });

        if (!response.ok) {
          lastErrorText = await response.text();
          console.warn(`OpenAI API returned ${response.status} for model ${model}:`, lastErrorText);
          // try next model
          continue;
        }

        data = await response.json();
        break;
      } catch (fetchErr) {
        lastErrorText = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
        console.error(`Error calling OpenAI with model ${model}:`, lastErrorText);
        // try next model
        continue;
      }
    }
    if (!data) {
      return new Response(
        JSON.stringify({ error: "Failed to generate lesson from OpenAI", details: lastErrorText, attempted_model: usedModel }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const content = data.choices[0]?.message?.content;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "No content received from OpenAI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const normalize = (text: string) => text.trim().replace(/^```(?:json)?\s*/i, "").replace(/```$/, "");
    const extractJson = (text: string) => {
      const normalized = normalize(text);
      const start = normalized.indexOf("{");
      const end = normalized.lastIndexOf("}");
      if (start === -1 || end === -1) return null;
      return normalized.slice(start, end + 1);
    };

    let lesson;
    try {
      const jsonString = extractJson(content) ?? normalize(content);
      lesson = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Invalid JSON response from OpenAI:", {
        rawContent: content,
        parseError: parseError instanceof Error ? parseError.message : String(parseError),
      });
      return new Response(
        JSON.stringify({ error: "Invalid JSON response from OpenAI. Please check the OpenAI output format." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ lesson }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
