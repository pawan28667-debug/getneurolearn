import { useState } from "react";
import { Bookmark, BookmarkCheck, Share2, Check, X, ChevronDown, ChevronUp, Lightbulb, BarChart3, FileText } from "lucide-react";
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
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const difficultyColor = {
    easy: "bg-accent/20 text-accent",
    medium: "bg-amber/20 text-amber",
    hard: "bg-destructive/20 text-destructive",
  }[lesson.difficulty] || "bg-muted text-muted-foreground";

  // Generate structured notes from content
  const generateNotes = () => {
    const lines = lesson.content.split(/\.\s+/).filter(Boolean);
    return lines.map((l) => l.trim().replace(/\.$/, ""));
  };

  // Generate analysis points
  const generateAnalysis = () => {
    const points: string[] = [];
    if (lesson.subject) points.push(`Subject Area: ${lesson.subject}`);
    if (lesson.difficulty) points.push(`Difficulty Level: ${lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}`);
    if (lesson.exam_type) points.push(`Relevant Exam: ${lesson.exam_type.toUpperCase()}`);
    if (lesson.key_points) points.push(`${lesson.key_points.length} key concept${lesson.key_points.length > 1 ? "s" : ""} covered`);
    if (lesson.formula) points.push("Includes important formula/equation");
    if (lesson.mcq_question) points.push("Practice question included for self-assessment");
    points.push("Recommended: Revise after 24 hours for best retention");
    return points;
  };

  const notes = generateNotes();
  const analysis = generateAnalysis();

  return (
    <div className="min-h-[calc(100vh-7.5rem)] snap-start flex flex-col px-4 py-3 relative">
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
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {lesson.subject}
                </span>
                <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", difficultyColor)}>
                  {lesson.difficulty}
                </span>
                {lesson.exam_type && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">
                    {lesson.exam_type.toUpperCase()}
                  </span>
                )}
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
              <button onClick={onBookmark} className="p-1.5 rounded-full hover:bg-muted transition-colors">
                {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-primary" /> : <Bookmark className="w-4 h-4 text-muted-foreground" />}
              </button>
              <button
                onClick={() => { navigator.share?.({ title: lesson.title, text: lesson.content }).catch(() => {}); }}
                className="p-1.5 rounded-full hover:bg-muted transition-colors"
              >
                <Share2 className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-2 scrollbar-hide">
          {/* Main Explanation */}
          <p className="text-sm text-foreground/90 leading-relaxed mb-3 whitespace-pre-line">
            {lesson.content}
          </p>

          {/* Key Points */}
          {lesson.key_points && lesson.key_points.length > 0 && (
            <div className="bg-primary/5 rounded-xl p-3 mb-3">
              <p className="font-display font-semibold text-xs text-primary mb-1.5">🔑 Key Points</p>
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
              <p className="font-display font-semibold text-xs text-secondary mb-1">📐 Formula</p>
              <p className="font-mono text-sm text-foreground font-medium">{lesson.formula}</p>
            </div>
          )}

          {/* Structured Notes Section */}
          <button
            onClick={() => toggleSection("notes")}
            className="w-full flex items-center justify-between bg-muted/40 rounded-xl p-3 mb-2 transition-colors hover:bg-muted/60"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="font-display font-semibold text-xs">📝 Structured Notes</span>
            </div>
            {expandedSection === "notes" ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          <AnimatePresence>
            {expandedSection === "notes" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-2"
              >
                <div className="bg-muted/20 rounded-xl p-3 space-y-2">
                  {notes.map((note, i) => (
                    <div key={i} className="flex gap-2 text-xs text-foreground/80">
                      <span className="font-semibold text-primary min-w-[18px]">{i + 1}.</span>
                      <span className="leading-relaxed">{note}.</span>
                    </div>
                  ))}
                  {lesson.formula && (
                    <div className="mt-2 pt-2 border-t border-border/30">
                      <p className="text-[10px] font-semibold text-secondary mb-1">Remember this formula:</p>
                      <p className="font-mono text-xs text-foreground bg-secondary/5 rounded-lg p-2 text-center">{lesson.formula}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Analysis Section */}
          <button
            onClick={() => toggleSection("analysis")}
            className="w-full flex items-center justify-between bg-muted/40 rounded-xl p-3 mb-2 transition-colors hover:bg-muted/60"
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-secondary" />
              <span className="font-display font-semibold text-xs">📊 Analysis & Insights</span>
            </div>
            {expandedSection === "analysis" ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          <AnimatePresence>
            {expandedSection === "analysis" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-2"
              >
                <div className="bg-muted/20 rounded-xl p-3 space-y-1.5">
                  {analysis.map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                      <span className="text-secondary mt-0.5">▸</span>
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Detailed Explanation */}
          <button
            onClick={() => toggleSection("detailed")}
            className="w-full flex items-center justify-between bg-muted/40 rounded-xl p-3 mb-3 transition-colors hover:bg-muted/60"
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span className="font-display font-semibold text-xs">💡 Deep Dive Explanation</span>
            </div>
            {expandedSection === "detailed" ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          <AnimatePresence>
            {expandedSection === "detailed" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-3"
              >
                <div className="bg-muted/20 rounded-xl p-3 space-y-3">
                  <div>
                    <p className="text-[10px] font-semibold text-foreground mb-1 uppercase tracking-wide">Why is this important?</p>
                    <p className="text-xs text-foreground/80 leading-relaxed">
                      This topic is frequently tested in {lesson.exam_type?.toUpperCase() || "competitive"} exams. Understanding the core concepts here builds a strong foundation for advanced problem-solving.
                    </p>
                  </div>
                  {lesson.key_points && lesson.key_points.length > 0 && (
                    <div>
                      <p className="text-[10px] font-semibold text-foreground mb-1 uppercase tracking-wide">Concept Breakdown</p>
                      {lesson.key_points.map((point, i) => (
                        <div key={i} className="mb-2">
                          <p className="text-xs text-primary font-semibold">→ {point}</p>
                          <p className="text-[11px] text-foreground/70 leading-relaxed ml-3">
                            This point is essential for building conceptual clarity. Practice related problems to strengthen your grasp.
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="bg-accent/5 rounded-lg p-2.5 border border-accent/10">
                    <p className="text-[10px] font-semibold text-accent mb-0.5">💡 Pro Tip</p>
                    <p className="text-xs text-foreground/70 leading-relaxed">
                      Revise this lesson after 24 hours, then again after 7 days for optimal retention using spaced repetition.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
                  <button key={i} onClick={() => handleAnswer(i)} disabled={selectedAnswer !== null} className={optionClass}>
                    <span className="font-semibold mr-1">{String.fromCharCode(65 + i)}.</span>
                    {option}
                  </button>
                );
              })}
            </div>
            {showResult && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("text-[11px] mt-2 font-medium", selectedAnswer === lesson.mcq_answer ? "text-accent" : "text-destructive")}
              >
                {selectedAnswer === lesson.mcq_answer
                  ? "✅ Correct! Great job!"
                  : `❌ The correct answer is ${String.fromCharCode(65 + (lesson.mcq_answer ?? 0))}. Review the key points above.`}
              </motion.p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReelCard;
