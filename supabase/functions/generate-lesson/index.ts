import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { topic, exam_type, subject } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error("Supabase service role env is not configured");

    const systemPrompt = `You are an expert Indian education content creator. Generate a micro-lesson (30-60 second read) for competitive exam preparation. 
Return ONLY valid JSON with this exact structure:
{
  "title": "catchy title under 60 chars",
  "content": "clear, concise explanation in 2-3 short paragraphs. Use simple language.",
  "key_points": ["point 1", "point 2", "point 3"],
  "formula": "relevant formula if applicable, or null",
  "mcq_question": "a quiz question testing the concept",
  "mcq_options": ["option A", "option B", "option C", "option D"],
  "mcq_answer": 0,
  "difficulty": "easy|medium|hard"
}
mcq_answer is the 0-based index of the correct option.`;

    const userPrompt = `Create a micro-lesson on: "${topic}"
Subject: ${subject || "General"}
Exam: ${exam_type || "General"}
Make it perfect for Indian competitive exam students.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_lesson",
              description: "Create a structured micro-lesson for exam preparation",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  content: { type: "string" },
                  key_points: { type: "array", items: { type: "string" } },
                  formula: { type: "string", nullable: true },
                  mcq_question: { type: "string" },
                  mcq_options: { type: "array", items: { type: "string" } },
                  mcq_answer: { type: "integer" },
                  difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
                },
                required: ["title", "content", "key_points", "mcq_question", "mcq_options", "mcq_answer", "difficulty"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "create_lesson" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI generation failed");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    let lesson;

    if (toolCall) {
      lesson = JSON.parse(toolCall.function.arguments);
    } else {
      const content = data.choices?.[0]?.message?.content || "";
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        lesson = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response");
      }
    }

    const insertResponse = await fetch(`${SUPABASE_URL}/rest/v1/lessons?select=*`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        title: lesson.title,
        content: lesson.content,
        subject,
        exam_type,
        key_points: lesson.key_points,
        formula: lesson.formula ?? null,
        mcq_question: lesson.mcq_question,
        mcq_options: lesson.mcq_options,
        mcq_answer: lesson.mcq_answer,
        difficulty: lesson.difficulty,
        created_by: null,
      }),
    });

    if (!insertResponse.ok) {
      const text = await insertResponse.text();
      console.error("Supabase insert error:", insertResponse.status, text);
      throw new Error("Failed to save generated lesson");
    }

    const inserted = await insertResponse.json();
    const savedLesson = Array.isArray(inserted) ? inserted[0] : inserted;

    return new Response(JSON.stringify({ lesson: savedLesson }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-lesson error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
