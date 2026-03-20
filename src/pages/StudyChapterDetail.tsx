import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileText, HelpCircle, Timer, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { getChaptersForSubject, type MCQ } from "@/data/studyMaterial";
import { cn } from "@/lib/utils";

type Tab = "notes" | "questions" | "mock";

const StudyChapterDetail = () => {
  const { examType, subject, classLevel, chapterId } = useParams();
  const navigate = useNavigate();
  const decodedSubject = decodeURIComponent(subject || "");
  const decodedClass = decodeURIComponent(classLevel || "");
  const chapters = getChaptersForSubject(decodedSubject);
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

      <h2 className="font-display font-bold text-lg mb-4">{chapter.name}</h2>

      {/* Tabs */}
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

      {tab === "notes" && <NotesTab content={chapter.notesContent} points={chapter.revisionPoints} />}
      {tab === "questions" && <QuestionsTab mcqs={chapter.mcqs} />}
      {tab === "mock" && <MockTestTab mcqs={chapter.mcqs} chapterName={chapter.name} />}
    </div>
  );
};

const NotesTab = ({ content, points }: { content: string; points: string[] }) => (
  <div className="space-y-4">
    <div className="glass rounded-xl p-4">
      <div className="prose prose-sm max-w-none text-foreground">
        {content.split("\n").map((line, i) => {
          if (!line.trim()) return <br key={i} />;
          const formatted = line
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/- (.*)/g, '• $1');
          return <p key={i} className="text-sm leading-relaxed mb-1" dangerouslySetInnerHTML={{ __html: formatted }} />;
        })}
      </div>
    </div>

    <div className="glass rounded-xl p-4">
      <h3 className="font-display font-bold text-sm mb-3 flex items-center gap-1.5">
        ⚡ Quick Revision
      </h3>
      <ul className="space-y-2">
        {points.map((pt, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">{i + 1}</span>
            <span className="text-muted-foreground">{pt}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const QuestionsTab = ({ mcqs }: { mcqs: MCQ[] }) => {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const diffColor = (d: string) =>
    d === "Easy" ? "text-green-500 bg-green-500/10" : d === "Medium" ? "text-amber-500 bg-amber-500/10" : "text-red-500 bg-red-500/10";

  return (
    <div className="space-y-4">
      {mcqs.map((q, qi) => (
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

const MockTestTab = ({ mcqs, chapterName }: { mcqs: MCQ[]; chapterName: string }) => {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(mcqs.length * 60); // 1 min per question

  // Timer
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

  const score = submitted ? mcqs.filter((q, i) => answers[i] === q.answer).length : 0;
  const total = mcqs.length;
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  if (!started) {
    return (
      <div className="glass rounded-xl p-6 text-center">
        <Timer className="w-10 h-10 text-primary mx-auto mb-3" />
        <h3 className="font-display font-bold text-base mb-1">Mock Test</h3>
        <p className="text-muted-foreground text-sm mb-1">{chapterName}</p>
        <p className="text-muted-foreground text-xs mb-4">{total} questions • {total} min</p>
        <button onClick={() => setStarted(true)} className="gradient-primary text-primary-foreground font-display font-semibold px-6 py-2.5 rounded-xl text-sm">
          Start Test
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
          <p className="text-xs text-muted-foreground mt-1">Time: {formatTime((mcqs.length * 60) - timeLeft)}</p>
          <button onClick={() => { setStarted(false); setSubmitted(false); setAnswers({}); setTimeLeft(mcqs.length * 60); }} className="mt-4 flex items-center gap-1.5 mx-auto text-primary text-sm font-semibold">
            <RotateCcw className="w-3.5 h-3.5" /> Retry
          </button>
        </div>

        {/* Review */}
        {mcqs.map((q, i) => (
          <div key={i} className="glass rounded-xl p-3">
            <p className="text-xs font-medium mb-1">Q{i + 1}: {q.question}</p>
            <p className={cn("text-xs", answers[i] === q.answer ? "text-green-500" : "text-red-500")}>
              Your answer: {q.options[answers[i]] || "Unanswered"} {answers[i] === q.answer ? "✓" : `✗ (Correct: ${q.options[q.answer]})`}
            </p>
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
