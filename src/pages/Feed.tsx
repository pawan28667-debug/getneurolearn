import { useState, useRef, useCallback, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ReelCard from "@/components/feed/ReelCard";
import GenerateLessonModal from "@/components/feed/GenerateLessonModal";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Lesson = Tables<"lessons">;

const Feed = () => {
  const { user } = useAuth();
  const [showGenerate, setShowGenerate] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

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

  const { data: bookmarkedIds = [] } = useQuery({
    queryKey: ["bookmarks", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("bookmarks")
        .select("lesson_id")
        .eq("user_id", user!.id);
      return (data || []).map((b) => b.lesson_id);
    },
  });

  const { data: completedIds = [] } = useQuery({
    queryKey: ["progress", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("user_progress")
        .select("lesson_id")
        .eq("user_id", user!.id)
        .eq("completed", true);
      return (data || []).map((p) => p.lesson_id);
    },
  });

  const toggleBookmark = useMutation({
    mutationFn: async (lessonId: string) => {
      if (!user) {
        toast.error("Sign in to bookmark lessons");
        return;
      }
      const isBookmarked = bookmarkedIds.includes(lessonId);
      if (isBookmarked) {
        await supabase.from("bookmarks").delete().eq("user_id", user.id).eq("lesson_id", lessonId);
      } else {
        await supabase.from("bookmarks").insert({ user_id: user.id, lesson_id: lessonId });
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookmarks"] }),
  });

  const recordProgress = useMutation({
    mutationFn: async ({ lessonId, score }: { lessonId: string; score: number }) => {
      if (!user) return;
      await supabase.from("user_progress").upsert(
        { user_id: user.id, lesson_id: lessonId, completed: true, score },
        { onConflict: "user_id,lesson_id" }
      );
      // Award XP
      const xpGain = score > 0 ? 35 : 10;
      const { data: profile } = await supabase
        .from("profiles")
        .select("xp")
        .eq("user_id", user.id)
        .single();
      if (profile) {
        await supabase
          .from("profiles")
          .update({ xp: profile.xp + xpGain })
          .eq("user_id", user.id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
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
            isBookmarked={bookmarkedIds.includes(lesson.id)}
            isCompleted={completedIds.includes(lesson.id)}
            onBookmark={() => toggleBookmark.mutate(lesson.id)}
            onAnswer={(score) => recordProgress.mutate({ lessonId: lesson.id, score })}
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
