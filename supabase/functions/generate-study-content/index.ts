import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type ContentType = "notes" | "questions" | "mock";

interface Body {
  chapter: string;
  subject: string;
  exam: string;
  classLevel: string;
  type: ContentType;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json()) as Partial<Body>;
    const { chapter, subject, exam, classLevel, type } = body;

    if (!chapter || !subject || !exam || !type) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: chapter, subject, exam, type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI gateway not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const ctx = `Chapter: ${chapter}\nSubject: ${subject}\nClass / Level: ${classLevel || "N/A"}\nExam: ${exam}`;

    let prompt = "";
    if (type === "notes") {
      prompt = `${ctx}\n\nReturn STRICT JSON in this exact shape (no markdown, no commentary):
{
  "content": "Detailed study notes (350-500 words). Use \\n\\n to separate paragraphs. You may use markdown ## for sub-headings, **bold** for key terms, and lines starting with '- ' for bullet lists. Plain text only.",
  "key_points": ["6 to 8 crisp, exam-ready one-sentence bullets"],
  "formulas": ["Important formulas / facts / dates / definitions, each as one short string. Empty array if not applicable."]
}`;
    } else if (type === "questions") {
      prompt = `${ctx}\n\nGenerate 10 exam-style MCQs of mixed difficulty. Return STRICT JSON:
{
  "questions": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "answer": 0,
      "difficulty": "Easy" | "Medium" | "Hard",
      "explanation": "1-2 sentence reason the correct option is right"
    }
  ]
}
Rules: exactly 4 options; "answer" is the 0-based index of the correct option; mix difficulties (~3 Easy, 4 Medium, 3 Hard).`;
    } else {
      prompt = `${ctx}\n\nCreate a 20-question mock test with progressively increasing difficulty. Return STRICT JSON:
{
  "questions": [
    {
      "question": "string",
      "options": ["A","B","C","D"],
      "answer": 0,
      "difficulty": "Easy" | "Medium" | "Hard",
      "explanation": "1-2 sentence justification"
    }
  ]
}
Rules: exactly 20 items; 4 options each; "answer" is 0-based; first ~7 Easy, next ~8 Medium, last ~5 Hard.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content:
              "You are an expert Indian-exam educator (JEE/NEET/UPSC/SSC/Boards). Produce accurate, well-structured study content. Respond with valid JSON only.",
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
        return new Response(JSON.stringify({ error: "Rate limit reached. Try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits in Lovable workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(JSON.stringify({ error: "AI gateway failed", details: errText }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content: string | undefined = data.choices?.[0]?.message?.content;
    if (!content) {
      return new Response(JSON.stringify({ error: "No content from AI" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const normalize = (t: string) => t.trim().replace(/^```(?:json)?\s*/i, "").replace(/```$/, "");
    const extractJson = (t: string) => {
      const n = normalize(t);
      const s = n.indexOf("{");
      const e = n.lastIndexOf("}");
      return s !== -1 && e !== -1 ? n.slice(s, e + 1) : n;
    };

    let result: any;
    try {
      result = JSON.parse(extractJson(content));
    } catch (e) {
      console.error("Invalid JSON from AI:", content);
      return new Response(JSON.stringify({ error: "Invalid JSON response from AI" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Light shape guards
    if (type === "notes") {
      result.content = String(result.content ?? "");
      result.key_points = Array.isArray(result.key_points) ? result.key_points : [];
      result.formulas = Array.isArray(result.formulas) ? result.formulas : [];
    } else {
      result.questions = Array.isArray(result.questions) ? result.questions : [];
    }

    return new Response(JSON.stringify({ result, type }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
