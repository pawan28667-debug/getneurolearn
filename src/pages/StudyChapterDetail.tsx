import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileText, HelpCircle, Timer, CheckCircle, XCircle, RotateCcw, Sparkles, RefreshCw } from "lucide-react";
import { getChapters } from "@/data/studyMaterial";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Tab = "notes" | "questions" | "mock";

interface MCQ {
  question: string;
  options: string[];
  answer: number;
  difficulty: "Easy" | "Medium" | "Hard";
  explanation: string;
}

interface Notes {
  content: string;
  key_points: string[];
  formulas: string[];
}

const StudyChapterDetail = () => {
  const { examType, subject, classLevel, chapterId } = useParams();
  const navigate = useNavigate();
  const decodedSubject = decodeURIComponent(subject || "");
  const decodedClass = decodeURIComponent(classLevel || "");
  const chapters = getChapters(examType || "boards", decodedSubject, decodedClass);
  const chapter = chapters.find((c) => c.id === chapterId);
  const [tab, setTab] = useState<Tab>("notes");

  if (!chapter) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="text-muted-foreground">Chapter not found</p>
        <button onClick={() => navigate(-1)} className="text-primary text-sm mt-2 underline">Go back</button>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: typeof FileText }[] = [
    { key: "notes", label: "Notes", icon: FileText },
    { key: "questions", label: "Questions", icon: HelpCircle },
    { key: "mock", label: "Mock Test", icon: Timer },
  ];

  return (
    <div className="px-4 py-4 pb-24">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3 hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>{decodedClass}</span>
      </button>

      <h2 className="font-display font-bold text-lg mb-1">{chapter.name}</h2>
      {chapter.book && <p className="text-[11px] text-muted-foreground mb-4">{chapter.book}</p>}

      <div className="flex gap-1.5 mb-5">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-display font-semibold transition-all",
              tab === key ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {tab === "notes" && <NotesTab chapter={chapter.name} subject={decodedSubject} exam={examType || ""} classLevel={decodedClass} />}
      {tab === "questions" && <QuestionsTab chapter={chapter.name} subject={decodedSubject} exam={examType || ""} classLevel={decodedClass} />}
      {tab === "mock" && <MockTestTab chapter={chapter.name} subject={decodedSubject} exam={examType || ""} classLevel={decodedClass} />}
    </div>
  );
};

// ============ AI Hook ============
function useAIContent<T>(type: "notes" | "questions" | "mock", chapter: string, subject: string, exam: string, classLevel: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: resp, error: fnErr } = await supabase.functions.invoke("generate-study-content", {
        body: { chapter, subject, exam, classLevel, type },
      });
      if (fnErr) throw fnErr;
      if (resp.error) throw new Error(resp.error);
      setData(resp.result as T);
    } catch (e: any) {
      setError(e.message || "Generation failed");
      toast.error(e.message || "AI generation failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter, type]);

  return { data, loading, error, regenerate: fetchData };
}

const LoadingBlock = ({ label }: { label: string }) => (
  <div className="glass rounded-xl p-8 text-center">
    <div className="inline-flex items-center gap-2 text-primary">
      <Sparkles className="w-4 h-4 animate-pulse" />
      <span className="font-display font-semibold text-sm">Generating {label} with AI…</span>
    </div>
    <p className="text-xs text-muted-foreground mt-2">This usually takes a few seconds.</p>
  </div>
);

// ============ Notes Tab ============
const NotesTab = (p: { chapter: string; subject: string; exam: string; classLevel: string }) => {
  const { data, loading, error, regenerate } = useAIContent<Notes>("notes", p.chapter, p.subject, p.exam, p.classLevel);

  if (loading) return <LoadingBlock label="notes" />;
  if (error || !data) return (
    <div className="glass rounded-xl p-6 text-center space-y-3">
      <p className="text-sm text-muted-foreground">{error || "Couldn't generate notes."}</p>
      <button onClick={regenerate} className="text-primary text-sm font-semibold inline-flex items-center gap-1.5">
        <RefreshCw className="w-3.5 h-3.5" /> Try again
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="glass rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-sm flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> AI-Generated Notes
          </h3>
          <button onClick={regenerate} className="text-[10px] text-muted-foreground hover:text-primary flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> Regenerate
          </button>
        </div>
        <div className="prose prose-sm max-w-none text-foreground">
          {data.content.split("\n").map((line, i) => {
            if (!line.trim()) return <br key={i} />;
            const formatted = line
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/^- (.*)/g, "• $1")
              .replace(/^## (.*)/g, '<span class="font-display font-bold text-foreground">$1</span>');
            return <p key={i} className="text-sm leading-relaxed mb-1" dangerouslySetInnerHTML={{ __html: formatted }} />;
          })}
        </div>
      </div>

      {data.formulas.length > 0 && (
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-bold text-sm mb-3">📐 Key Formulas & Facts</h3>
          <ul className="space-y-2">
            {data.formulas.map((f, i) => (
              <li key={i} className="text-sm bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2 text-foreground font-mono text-xs">
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="glass rounded-xl p-4">
        <h3 className="font-display font-bold text-sm mb-3">⚡ Quick Revision</h3>
        <ul className="space-y-2">
          {data.key_points.map((pt, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">{i + 1}</span>
              <span className="text-muted-foreground">{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ============ Questions Tab ============
const QuestionsTab = (p: { chapter: string; subject: string; exam: string; classLevel: string }) => {
  const { data, loading, error, regenerate } = useAIContent<{ questions: MCQ[] }>("questions", p.chapter, p.subject, p.exam, p.classLevel);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  useEffect(() => { setSelected({}); setRevealed({}); }, [data]);

  const diffColor = (d: string) =>
    d === "Easy" ? "text-green-500 bg-green-500/10" : d === "Medium" ? "text-amber-500 bg-amber-500/10" : "text-red-500 bg-red-500/10";

  if (loading) return <LoadingBlock label="practice questions" />;
  if (error || !data) return (
    <div className="glass rounded-xl p-6 text-center space-y-3">
      <p className="text-sm text-muted-foreground">{error || "Couldn't generate questions."}</p>
      <button onClick={regenerate} className="text-primary text-sm font-semibold inline-flex items-center gap-1.5">
        <RefreshCw className="w-3.5 h-3.5" /> Try again
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-primary" /> AI-generated • {data.questions.length} questions
        </p>
        <button onClick={regenerate} className="text-[11px] text-primary flex items-center gap-1">
          <RefreshCw className="w-3 h-3" /> New set
        </button>
      </div>
      {data.questions.map((q, qi) => (
        <div key={qi} className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-display font-semibold text-xs text-muted-foreground">Q{qi + 1}</span>
            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", diffColor(q.difficulty))}>{q.difficulty}</span>
          </div>
          <p className="text-sm font-medium mb-3">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              const isSelected = selected[qi] === oi;
              const isRevealed = revealed[qi];
              const isCorrect = oi === q.answer;
              return (
                <button
                  key={oi}
                  onClick={() => {
                    if (!isRevealed) {
                      setSelected((s) => ({ ...s, [qi]: oi }));
                      setRevealed((r) => ({ ...r, [qi]: true }));
                    }
                  }}
                  className={cn(
                    "w-full text-left text-sm px-3 py-2.5 rounded-lg border transition-all flex items-center gap-2",
                    !isRevealed && "border-border hover:border-primary/50",
                    isRevealed && isCorrect && "border-green-500 bg-green-500/10",
                    isRevealed && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                    isRevealed && !isSelected && !isCorrect && "border-border opacity-50"
                  )}
                >
                  {isRevealed && isCorrect && <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />}
                  {isRevealed && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                  {!isRevealed && <span className="w-4 h-4 rounded-full border border-muted-foreground/40 shrink-0" />}
                  {opt}
                </button>
              );
            })}
          </div>
          {revealed[qi] && (
            <div className="mt-3 p-3 rounded-lg bg-muted/30 text-xs text-muted-foreground">
              <strong className="text-foreground">Explanation:</strong> {q.explanation}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ============ Mock Test Tab ============
const MockTestTab = (p: { chapter: string; subject: string; exam: string; classLevel: string }) => {
  const { data, loading, error, regenerate } = useAIContent<{ questions: MCQ[] }>("mock", p.chapter, p.subject, p.exam, p.classLevel);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const mcqs = data?.questions || [];
  const total = mcqs.length;

  useEffect(() => { if (total) setTimeLeft(total * 60); }, [total]);

  useEffect(() => {
    if (!started || submitted) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(interval); setSubmitted(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [started, submitted]);

  if (loading) return <LoadingBlock label="mock test" />;
  if (error || !data) return (
    <div className="glass rounded-xl p-6 text-center space-y-3">
      <p className="text-sm text-muted-foreground">{error || "Couldn't generate mock test."}</p>
      <button onClick={regenerate} className="text-primary text-sm font-semibold inline-flex items-center gap-1.5">
        <RefreshCw className="w-3.5 h-3.5" /> Try again
      </button>
    </div>
  );

  const score = submitted ? mcqs.filter((q, i) => answers[i] === q.answer).length : 0;
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  if (!started) {
    return (
      <div className="glass rounded-xl p-6 text-center">
        <Timer className="w-10 h-10 text-primary mx-auto mb-3" />
        <h3 className="font-display font-bold text-base mb-1">AI Mock Test</h3>
        <p className="text-muted-foreground text-sm mb-1">{p.chapter}</p>
        <p className="text-muted-foreground text-xs mb-4">{total} questions • {total} min</p>
        <button onClick={() => setStarted(true)} className="gradient-primary text-primary-foreground font-display font-semibold px-6 py-2.5 rounded-xl text-sm">
          Start Test
        </button>
        <button onClick={regenerate} className="block mx-auto mt-3 text-[11px] text-muted-foreground hover:text-primary inline-flex items-center gap-1">
          <RefreshCw className="w-3 h-3" /> Generate new test
        </button>
      </div>
    );
  }

  if (submitted) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="space-y-4">
        <div className="glass rounded-xl p-6 text-center">
          <h3 className="font-display font-bold text-lg mb-2">Test Complete!</h3>
          <div className="w-20 h-20 mx-auto rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-display font-bold text-2xl mb-3">
            {pct}%
          </div>
          <p className="text-sm text-muted-foreground">{score}/{total} correct</p>
          <p className="text-xs text-muted-foreground mt-1">Time used: {formatTime((total * 60) - timeLeft)}</p>
          <button onClick={() => { setStarted(false); setSubmitted(false); setAnswers({}); setTimeLeft(total * 60); regenerate(); }} className="mt-4 flex items-center gap-1.5 mx-auto text-primary text-sm font-semibold">
            <RotateCcw className="w-3.5 h-3.5" /> New Test
          </button>
        </div>

        {mcqs.map((q, i) => (
          <div key={i} className="glass rounded-xl p-3">
            <p className="text-xs font-medium mb-1">Q{i + 1}: {q.question}</p>
            <p className={cn("text-xs", answers[i] === q.answer ? "text-green-500" : "text-red-500")}>
              Your answer: {q.options[answers[i]] || "Unanswered"} {answers[i] === q.answer ? "✓" : `✗ (Correct: ${q.options[q.answer]})`}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">{q.explanation}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-xl p-3 flex items-center justify-between sticky top-14 z-10">
        <span className="text-xs font-semibold text-muted-foreground">{Object.keys(answers).length}/{total} answered</span>
        <span className="font-display font-bold text-sm text-primary">{formatTime(timeLeft)}</span>
      </div>

      {mcqs.map((q, qi) => (
        <div key={qi} className="glass rounded-xl p-4">
          <p className="text-sm font-medium mb-3">Q{qi + 1}. {q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => (
              <button
                key={oi}
                onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                className={cn(
                  "w-full text-left text-sm px-3 py-2.5 rounded-lg border transition-all",
                  answers[qi] === oi ? "border-primary bg-primary/10" : "border-border hover:border-primary/30"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button onClick={() => setSubmitted(true)} className="w-full gradient-primary text-primary-foreground font-display font-semibold py-3 rounded-xl text-sm">
        Submit Test
      </button>
    </div>
  );
};

export default StudyChapterDetail;
