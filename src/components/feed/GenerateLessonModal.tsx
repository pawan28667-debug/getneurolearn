import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

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

const GenerateLessonModal = ({ open, onClose }: Props) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [topic, setTopic] = useState("");
  const [examType, setExamType] = useState("general");
  const [subject, setSubject] = useState("Physics");

  const generate = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("generate-lesson", {
        body: { topic, exam_type: examType, subject },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      const lesson = data.lesson;
      const { error: insertError } = await supabase.from("lessons").insert({
        title: lesson.title,
        content: lesson.content,
        subject,
        exam_type: examType,
        key_points: lesson.key_points,
        formula: lesson.formula || null,
        mcq_question: lesson.mcq_question,
        mcq_options: lesson.mcq_options,
        mcq_answer: lesson.mcq_answer,
        difficulty: lesson.difficulty,
        created_by: user?.id || null,
      });

      if (insertError) throw insertError;
      return lesson;
    },
    onSuccess: (lesson) => {
      toast.success(`"${lesson.title}" generated!`);
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      setTopic("");
      onClose();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="glass max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Generate AI Lesson
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 pt-2">
          <Input
            placeholder="Enter topic (e.g. Newton's Laws)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="glass"
          />

          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger className="glass">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={examType} onValueChange={setExamType}>
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
            onClick={() => generate.mutate()}
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
      </DialogContent>
    </Dialog>
  );
};

export default GenerateLessonModal;
