import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const examTypes = [
  { value: "jee_main", label: "JEE Main" },
  { value: "jee_advanced", label: "JEE Advanced" },
  { value: "neet", label: "NEET" },
  { value: "upsc", label: "UPSC" },
  { value: "ssc", label: "SSC" },
  { value: "boards", label: "Board Exams" },
  { value: "general", label: "General" },
];

const subjects = [
  "Physics", "Chemistry", "Mathematics", "Biology",
  "History", "Geography", "Economics", "Polity",
  "English", "Reasoning", "General Knowledge",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

interface GeneratedLesson {
  title: string;
  content: string;
  key_points?: string[];
  examples?: string[];
  practice_questions?: Array<{
    question: string;
    options: string[];
    correct_answer: string;
  }>;
}

const GenerateLessonModal = ({ open, onClose }: Props) => {
  const queryClient = useQueryClient();
  const [step, setStep] = useState<"input" | "generating" | "review">("input");
  const [topic, setTopic] = useState("");
  const [examType, setExamType] = useState("general");
  const [subject, setSubject] = useState("Physics");
  const [generatedLesson, setGeneratedLesson] = useState<GeneratedLesson | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const generate = useMutation({
    mutationFn: async () => {
      console.log("🚀 Starting lesson generation for:", { topic, examType, subject });
      
      try {
        const { data, error } = await supabase.functions.invoke("generate-lesson", {
          body: { topic, exam_type: examType, subject },
        });

        console.log("📡 Supabase function response:", { data, error });

        if (error) {
          console.error("❌ Supabase error:", error);
          throw error;
        }
        
        if (data?.error) {
          console.error("❌ API error:", data.error);
          throw new Error(data.error);
        }

        if (!data?.lesson) {
          console.error("❌ No lesson in response:", data);
          throw new Error("No lesson data received from server");
        }

        console.log("✅ Lesson generated successfully:", data.lesson);
        return data.lesson;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.error("❌ Generation failed:", errorMsg);
        throw err;
      }
    },
    onSuccess: (lesson: GeneratedLesson) => {
      console.log("✅ Generated lesson:", lesson);
      setGeneratedLesson(lesson);
      setStep("review");
    },
    onError: (err: Error) => {
      console.error("❌ Generation error:", err);
      const errorMessage = err.message || "Unknown error occurred";
      
      // Provide helpful error messages
      let userMessage = errorMessage;
      if (errorMessage.includes("API key")) {
        userMessage = "❌ OpenAI API key not configured. Check SUPABASE_ENV_SETUP.md";
      } else if (errorMessage.includes("401") || errorMessage.includes("Unauthorized")) {
        userMessage = "❌ Invalid or expired OpenAI API key. Check your key in Supabase Settings.";
      } else if (errorMessage.includes("429")) {
        userMessage = "❌ OpenAI API rate limit reached. Try again in a moment.";
      } else if (errorMessage.includes("JSON")) {
        userMessage = "❌ Invalid response format from OpenAI. Check your API key quota.";
      }
      
      toast.error(userMessage);
      setStep("input");
    },
  });

  const save = useMutation({
    mutationFn: async () => {
      if (!generatedLesson) throw new Error("No lesson to save");

      console.log("💾 Saving lesson to database...");
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.warn("⚠️ Could not fetch user session while saving lesson:", userError);
      }
      
      // Get first practice question if available
      let mcqQuestion = null;
      let mcqOptions = [];
      let mcqAnswer = 0;

      if (generatedLesson.practice_questions && generatedLesson.practice_questions.length > 0) {
        const firstQuestion = generatedLesson.practice_questions[0];
        mcqQuestion = firstQuestion.question;
        mcqOptions = firstQuestion.options;
        
        // Find the index of correct answer
        const correctOption = firstQuestion.correct_answer;
        mcqAnswer = mcqOptions.indexOf(correctOption) >= 0 
          ? mcqOptions.indexOf(correctOption) 
          : 0;
      }

        const lessonData: Record<string, unknown> = {
        title: generatedLesson.title,
        subject,
        exam_type: examType,
        content: generatedLesson.content,
        key_points: generatedLesson.key_points || [],
        formula: null,
        mcq_question: mcqQuestion,
        mcq_options: mcqOptions,
        mcq_answer: mcqAnswer,
        difficulty: "medium",
      };

      if (user.user?.id) {
        lessonData.created_by = user.user.id;
      }

      console.log("📝 Lesson data to save:", lessonData);

      const { data, error } = await supabase
        .from("lessons")
        .insert([lessonData as never])
        .select()
        .single();

      if (error) {
        console.error("❌ Database error:", error);
        throw error;
      }
      
      console.log("✅ Lesson saved:", data);
      return data;
    },
    onSuccess: () => {
      console.log("✅ Lesson saved successfully!");
      toast.success(`"${generatedLesson?.title}" saved to your feed!`);
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      setTopic("");
      setGeneratedLesson(null);
      setStep("input");
      onClose();
    },
    onError: (err: Error) => {
      console.error("❌ Save error:", err);
      toast.error(`Failed to save: ${err.message}`);
    },
  });

  const handleGenerateClick = () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }
    setStep("generating");
    generate.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => {
      if (!v) {
        setStep("input");
        setGeneratedLesson(null);
        onClose();
      }
    }}>
      <DialogContent className="glass max-w-2xl mx-auto max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Generate AI Lesson
          </DialogTitle>
        </DialogHeader>

        {step === "input" && (
          <div className="space-y-3 pt-2">
            <Input
              placeholder="Enter topic (e.g. Newton's Laws)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="glass"
              disabled={generate.isPending}
            />

            <Select value={subject} onValueChange={setSubject} disabled={generate.isPending}>
              <SelectTrigger className="glass">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={examType} onValueChange={setExamType} disabled={generate.isPending}>
              <SelectTrigger className="glass">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {examTypes.map((e) => (
                  <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={handleGenerateClick}
              disabled={!topic.trim() || generate.isPending}
              className="w-full gradient-primary text-primary-foreground font-display font-semibold"
            >
              {generate.isPending ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Generating...
                </span>
              ) : (
                "Generate Lesson ✨"
              )}
            </Button>
          </div>
        )}

        {step === "generating" && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground text-sm">Creating your lesson with AI...</p>
            <p className="text-xs text-muted-foreground">This may take a moment</p>
          </div>
        )}

        {step === "review" && generatedLesson && (
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-display font-bold text-lg">{generatedLesson.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {subject} • {examTypes.find(e => e.value === examType)?.label}
                </p>
              </div>

              {/* Content */}
              <div className="border rounded-lg p-3 glass">
                <button
                  onClick={() => setExpandedSection(expandedSection === "content" ? null : "content")}
                  className="flex items-center justify-between w-full font-semibold text-sm mb-2 hover:opacity-80"
                >
                  <span>Content</span>
                  {expandedSection === "content" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {expandedSection === "content" && (
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-5">
                    {generatedLesson.content}
                  </p>
                )}
              </div>

              {/* Key Points */}
              {generatedLesson.key_points && generatedLesson.key_points.length > 0 && (
                <div className="border rounded-lg p-3 glass">
                  <button
                    onClick={() => setExpandedSection(expandedSection === "points" ? null : "points")}
                    className="flex items-center justify-between w-full font-semibold text-sm mb-2 hover:opacity-80"
                  >
                    <span>Key Points ({generatedLesson.key_points.length})</span>
                    {expandedSection === "points" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedSection === "points" && (
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {generatedLesson.key_points.map((point, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-primary flex-shrink-0">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Examples */}
              {generatedLesson.examples && generatedLesson.examples.length > 0 && (
                <div className="border rounded-lg p-3 glass">
                  <button
                    onClick={() => setExpandedSection(expandedSection === "examples" ? null : "examples")}
                    className="flex items-center justify-between w-full font-semibold text-sm mb-2 hover:opacity-80"
                  >
                    <span>Examples ({generatedLesson.examples.length})</span>
                    {expandedSection === "examples" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedSection === "examples" && (
                    <ul className="text-sm text-muted-foreground space-y-2">
                      {generatedLesson.examples.map((example, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-primary flex-shrink-0">{i + 1}.</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Practice Questions */}
              {generatedLesson.practice_questions && generatedLesson.practice_questions.length > 0 && (
                <div className="border rounded-lg p-3 glass">
                  <button
                    onClick={() => setExpandedSection(expandedSection === "questions" ? null : "questions")}
                    className="flex items-center justify-between w-full font-semibold text-sm mb-2 hover:opacity-80"
                  >
                    <span>Practice Questions ({generatedLesson.practice_questions.length})</span>
                    {expandedSection === "questions" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedSection === "questions" && (
                    <div className="space-y-3">
                      {generatedLesson.practice_questions.map((q, i) => (
                        <div key={i} className="text-sm p-2 bg-background rounded">
                          <p className="font-medium mb-2">{i + 1}. {q.question}</p>
                          <ul className="space-y-1 text-xs text-muted-foreground">
                            {q.options.map((opt, j) => (
                              <li key={j} className={opt === q.correct_answer ? "text-accent font-medium" : ""}>
                                {String.fromCharCode(65 + j)}) {opt} {opt === q.correct_answer && "✓"}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        )}

        {step === "review" && (
          <div className="flex gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setStep("input")}
              disabled={save.isPending}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={() => save.mutate()}
              disabled={save.isPending}
              className="flex-1 gradient-primary text-primary-foreground font-semibold"
            >
              {save.isPending ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save to Feed ✓"
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GenerateLessonModal;
