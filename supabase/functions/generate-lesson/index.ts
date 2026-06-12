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

    const prompt = `Create a comprehensive study lesson for the following:
Topic: ${topic}
Subject: ${subject}
Exam Type: ${exam_type}

Please provide the lesson in the following JSON format:
{
  "title": "Lesson Title",
  "content": "Detailed lesson content with explanations",
  "key_points": ["point 1", "point 2", "point 3"],
  "examples": ["example 1", "example 2"],
  "practice_questions": [
    {
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "correct_answer": "A"
    }
  ]
}

Make sure the content is accurate, well-structured, and appropriate for ${exam_type} exam preparation.`;

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
            content: "You are an expert educational content creator. Always respond with valid JSON that matches the requested format exactly.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI API error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to generate lesson from OpenAI" }),
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
