import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ReelCard from "@/components/feed/ReelCard";
import { ArrowLeft } from "lucide-react";

const examNames: Record<string, string> = {
  jee_main: "JEE Main",
  jee_advanced: "JEE Advanced",
  neet: "NEET",
  upsc: "UPSC",
  ssc: "SSC",
  boards: "Board Exams",
};

const ExamFeed = () => {
  const { examType } = useParams();
  const navigate = useNavigate();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["lessons", examType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("exam_type", examType!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div>
      <div className="flex items-center gap-3 px-4 py-3">
        <button onClick={() => navigate("/exams")} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-display font-bold text-lg">{examNames[examType!] || examType}</h2>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : lessons.length === 0 ? (
        <div className="text-center px-4 py-20">
          <p className="font-display font-semibold text-lg mb-2">No lessons yet</p>
          <p className="text-muted-foreground text-sm">Generate lessons for {examNames[examType!]} from the Feed</p>
        </div>
      ) : (
        <div className="h-[calc(100vh-10rem)] overflow-y-scroll snap-y-mandatory scrollbar-hide">
          {lessons.map((lesson) => (
            <ReelCard
              key={lesson.id}
              lesson={lesson}
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
