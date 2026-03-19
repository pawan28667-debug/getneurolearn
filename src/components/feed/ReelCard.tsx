import { useState } from "react";
import { Bookmark, BookmarkCheck, Share2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { Tables } from "@/integrations/supabase/types";

type Lesson = Tables<"lessons">;

interface ReelCardProps {
  lesson: Lesson;
  isBookmarked: boolean;
  isCompleted: boolean;
  onBookmark: () => void;
  onAnswer: (score: number) => void;
}

const ReelCard = ({ lesson, isBookmarked, isCompleted, onBookmark, onAnswer }: ReelCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [xpPopup, setXpPopup] = useState(false);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === lesson.mcq_answer;
    onAnswer(isCorrect ? 1 : 0);

    if (isCorrect) {
      setXpPopup(true);
      setTimeout(() => setXpPopup(false), 1000);
    }
  };

  const difficultyColor = {
    easy: "bg-accent/20 text-accent",
    medium: "bg-amber/20 text-amber",
    hard: "bg-destructive/20 text-destructive",
  }[lesson.difficulty] || "bg-muted text-muted-foreground";

  return (
    <div className="h-[calc(100vh-7.5rem)] snap-start flex flex-col px-4 py-3 relative">
      {/* XP Popup */}
      <AnimatePresence>
        {xpPopup && (
          <motion.div
            initial={{ scale: 0, y: 0 }}
            animate={{ scale: 1.2, y: -30 }}
            exit={{ scale: 0.8, opacity: 0, y: -60 }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 z-50 font-display font-black text-2xl text-primary"
          >
            +25 XP ⚡
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass rounded-2xl flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 pb-2">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {lesson.subject}
                </span>
                <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", difficultyColor)}>
                  {lesson.difficulty}
                </span>
                {isCompleted && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                    ✓ Done
                  </span>
                )}
              </div>
              <h3 className="font-display font-bold text-base leading-tight">{lesson.title}</h3>
            </div>

            {/* Side actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={onBookmark}
                className="p-1.5 rounded-full hover:bg-muted transition-colors"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4 text-primary" />
                ) : (
                  <Bookmark className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              <button
                onClick={() => {
                  navigator.share?.({ title: lesson.title, text: lesson.content })
                    .catch(() => {});
                }}
                className="p-1.5 rounded-full hover:bg-muted transition-colors"
              >
                <Share2 className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-2 scrollbar-hide">
          <p className="text-sm text-foreground/90 leading-relaxed mb-3 whitespace-pre-line">
            {lesson.content}
          </p>

          {/* Key Points */}
          {lesson.key_points && lesson.key_points.length > 0 && (
            <div className="bg-primary/5 rounded-xl p-3 mb-3">
              <p className="font-display font-semibold text-xs text-primary mb-1.5">Key Points</p>
              <ul className="space-y-1">
                {lesson.key_points.map((point, i) => (
                  <li key={i} className="text-xs text-foreground/80 flex gap-1.5">
                    <span className="text-primary mt-0.5">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Formula */}
          {lesson.formula && (
            <div className="bg-secondary/10 rounded-xl p-3 mb-3 text-center">
              <p className="font-display font-semibold text-xs text-secondary mb-1">Formula</p>
              <p className="font-mono text-sm text-foreground font-medium">{lesson.formula}</p>
            </div>
          )}
        </div>

        {/* MCQ */}
        {lesson.mcq_question && lesson.mcq_options && (
          <div className="p-4 pt-2 border-t border-border/50">
            <p className="font-display font-semibold text-xs mb-2">Quick Quiz</p>
            <p className="text-xs text-foreground/80 mb-2">{lesson.mcq_question}</p>
            <div className="grid grid-cols-2 gap-1.5">
              {lesson.mcq_options.map((option, i) => {
                let optionClass = "glass text-xs p-2 rounded-lg text-left transition-all";
                if (showResult) {
                  if (i === lesson.mcq_answer) {
                    optionClass += " bg-accent/20 border-accent text-accent";
                  } else if (i === selectedAnswer && i !== lesson.mcq_answer) {
                    optionClass += " bg-destructive/20 border-destructive text-destructive";
                  } else {
                    optionClass += " opacity-50";
                  }
                } else {
                  optionClass += " hover:bg-muted/50 active:scale-95";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={selectedAnswer !== null}
                    className={optionClass}
                  >
                    <span className="font-semibold mr-1">{String.fromCharCode(65 + i)}.</span>
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReelCard;
