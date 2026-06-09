import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ReelCard from "@/components/feed/ReelCard";
import GenerateLessonModal from "@/components/feed/GenerateLessonModal";
import { Plus } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Lesson = Tables<"lessons">;

const Feed = () => {
  const [showGenerate, setShowGenerate] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data as Lesson[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4 animate-pulse-glow">
          <Plus className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="font-display font-bold text-xl mb-2">No lessons yet!</h2>
        <p className="text-muted-foreground text-sm mb-4">Generate your first AI-powered lesson</p>
        <button
          onClick={() => setShowGenerate(true)}
          className="gradient-primary text-primary-foreground font-display font-semibold px-6 py-2.5 rounded-xl text-sm"
        >
          Generate Lesson
        </button>
        <GenerateLessonModal open={showGenerate} onClose={() => setShowGenerate(false)} />
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="h-[calc(100vh-7.5rem)] overflow-y-scroll snap-y-mandatory scrollbar-hide"
      >
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

      {/* FAB */}
      <button
        onClick={() => setShowGenerate(true)}
        className="fixed bottom-20 right-4 w-12 h-12 rounded-full gradient-primary text-primary-foreground shadow-lg flex items-center justify-center z-40 hover:opacity-90 active:scale-95 transition-all"
      >
        <Plus className="w-5 h-5" />
      </button>

      <GenerateLessonModal open={showGenerate} onClose={() => setShowGenerate(false)} />
    </div>
  );
};

export default Feed;
