import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReelCard from "@/components/feed/ReelCard";
import { ArrowLeft } from "lucide-react";
import { lessonsByExam, type LocalLesson } from "@/lib/localStore";
import type { Tables } from "@/integrations/supabase/types";

const examNames: Record<string, string> = {
  jee_main: "JEE Main",
  jee_advanced: "JEE Advanced",
  neet: "NEET",
  upsc: "UPSC",
  ssc: "SSC",
  boards: "Board Exams",
};

const toLessonRow = (l: LocalLesson): Tables<"lessons"> => ({
  id: l.id,
  title: l.title,
  subject: l.subject,
  exam_type: l.exam_type,
  content: l.content,
  key_points: l.key_points,
  formula: l.formula,
  mcq_question: l.mcq_question,
  mcq_options: l.mcq_options,
  mcq_answer: l.mcq_answer,
  difficulty: l.difficulty as Tables<"lessons">["difficulty"],
  created_at: l.created_at,
  created_by: null,
  updated_at: l.created_at,
  estimated_minutes: 3,
  tags: [],
  source: "ai",
} as unknown as Tables<"lessons">);

const ExamFeed = () => {
  const { examType } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<LocalLesson[]>([]);

  useEffect(() => {
    const refresh = () => setLessons(lessonsByExam(examType || ""));
    refresh();
    window.addEventListener("nl-lessons-change", refresh);
    return () => window.removeEventListener("nl-lessons-change", refresh);
  }, [examType]);

  return (
    <div>
      <div className="flex items-center gap-3 px-4 py-3">
        <button onClick={() => navigate("/exams")} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-display font-bold text-lg">{examNames[examType!] || examType}</h2>
      </div>

      {lessons.length === 0 ? (
        <div className="text-center px-4 py-20">
          <p className="font-display font-semibold text-lg mb-2">No lessons yet</p>
          <p className="text-muted-foreground text-sm">Generate lessons for {examNames[examType!]} from the Feed</p>
        </div>
      ) : (
        <div className="h-[calc(100vh-10rem)] overflow-y-scroll snap-y-mandatory scrollbar-hide">
          {lessons.map((lesson) => (
            <ReelCard
              key={lesson.id}
              lesson={toLessonRow(lesson)}
              isBookmarked={false}
              isCompleted={false}
              onAnswer={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamFeed;
