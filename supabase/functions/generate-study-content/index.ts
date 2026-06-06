import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type ContentType = "notes" | "questions" | "mock";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { chapter, subject, exam, classLevel, type } = await req.json() as {
      chapter: string; subject: string; exam: string; classLevel: string; type: ContentType;
    };

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const context = `Chapter: "${chapter}"\nSubject: ${subject}\nExam: ${exam}\nClass/Level: ${classLevel}`;

    let systemPrompt = "";
    let userPrompt = "";
    let tool: any;

    if (type === "notes") {
      systemPrompt = `You are an expert Indian exam coach. Generate comprehensive, exam-focused study notes for a chapter. Use clear structure, formulas, definitions, examples, and tips. Return valid JSON only.`;
      userPrompt = `${context}\n\nGenerate detailed study notes (600-900 words) with:\n- Full explanation in markdown (use **bold**, bullet points, headings).\n- 8-12 quick revision points.\n- 4-8 important formulas/facts (or [] if not applicable).`;
      tool = {
        name: "create_notes",
        description: "Create chapter notes",
        parameters: {
          type: "object",
          properties: {
            content: { type: "string" },
            key_points: { type: "array", items: { type: "string" } },
            formulas: { type: "array", items: { type: "string" } },
          },
          required: ["content", "key_points", "formulas"],
          additionalProperties: false,
        },
      };
    } else if (type === "questions") {
      systemPrompt = `You are an expert Indian exam question setter. Generate practice MCQs with explanations. Return valid JSON only.`;
      userPrompt = `${context}\n\nGenerate 8 high-quality MCQs (mix of Easy/Medium/Hard) covering this chapter. Each MCQ: question, 4 options, correct answer (0-based index), difficulty, and brief explanation.`;
      tool = {
        name: "create_questions",
        description: "Create practice MCQs",
        parameters: {
          type: "object",
          properties: {
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  options: { type: "array", items: { type: "string" } },
                  answer: { type: "integer" },
                  difficulty: { type: "string", enum: ["Easy", "Medium", "Hard"] },
                  explanation: { type: "string" },
                },
                required: ["question", "options", "answer", "difficulty", "explanation"],
                additionalProperties: false,
              },
            },
          },
          required: ["questions"],
          additionalProperties: false,
        },
      };
    } else {
      systemPrompt = `You are an expert Indian exam mock test designer. Generate a timed mock test. Return valid JSON only.`;
      userPrompt = `${context}\n\nGenerate a 15-question mock test for this chapter (mix difficulties — roughly 5 Easy, 7 Medium, 3 Hard). Each: question, 4 options, correct answer index, difficulty, explanation.`;
      tool = {
        name: "create_mock",
        description: "Create mock test",
        parameters: {
          type: "object",
          properties: {
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  options: { type: "array", items: { type: "string" } },
                  answer: { type: "integer" },
                  difficulty: { type: "string", enum: ["Easy", "Medium", "Hard"] },
                  explanation: { type: "string" },
                },
                required: ["question", "options", "answer", "difficulty", "explanation"],
                additionalProperties: false,
              },
            },
          },
          required: ["questions"],
          additionalProperties: false,
        },
      };
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [{ type: "function", function: tool }],
        tool_choice: { type: "function", function: { name: tool.name } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI generation failed");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    let result;
    if (toolCall) {
      result = JSON.parse(toolCall.function.arguments);
    } else {
      const content = data.choices?.[0]?.message?.content || "";
      const m = content.match(/\{[\s\S]*\}/);
      if (!m) throw new Error("Failed to parse AI response");
      result = JSON.parse(m[0]);
    }

    return new Response(JSON.stringify({ result, type }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-study-content error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
