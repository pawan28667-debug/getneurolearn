import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type ContentType = "notes" | "questions" | "mock";

interface ContentRequest {
  chapter: string;
  subject: string;
  exam_type: string;
  content_type: ContentType;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { chapter, subject, exam_type, content_type } = await req.json() as ContentRequest;

    // Validate input
    if (!chapter || !subject || !exam_type || !content_type) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: chapter, subject, exam_type, content_type" }),
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

    let prompt = "";
    if (content_type === "notes") {
      prompt = `Create comprehensive study notes for:
Chapter: ${chapter}
Subject: ${subject}
Exam Type: ${exam_type}

Provide detailed, well-organized notes with clear explanations and important points highlighted.`;
    } else if (content_type === "questions") {
      prompt = `Generate 10 practice questions for:
Chapter: ${chapter}
Subject: ${subject}
Exam Type: ${exam_type}

Format as JSON with "questions" array containing objects with "question", "options", and "correct_answer" fields.`;
    } else if (content_type === "mock") {
      prompt = `Create a mock test covering:
Chapter: ${chapter}
Subject: ${subject}
Exam Type: ${exam_type}

Generate 20 multiple-choice questions in JSON format with difficulty increasing progressively.`;
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert educational content creator specializing in exam preparation. Provide accurate, well-structured content.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI API error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to generate content from OpenAI" }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "No content received from OpenAI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ content, type: content_type }),
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
