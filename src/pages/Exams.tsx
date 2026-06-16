import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { getLessons } from "@/lib/localStore";

const examCategories = [
  { name: "JEE Main", value: "jee_main", emoji: "⚡", color: "from-blue-500 to-cyan-500" },
  { name: "JEE Advanced", value: "jee_advanced", emoji: "🔥", color: "from-orange-500 to-red-500" },
  { name: "NEET", value: "neet", emoji: "🧬", color: "from-green-500 to-emerald-500" },
  { name: "UPSC", value: "upsc", emoji: "🏛️", color: "from-purple-500 to-violet-500" },
  { name: "SSC", value: "ssc", emoji: "📊", color: "from-amber-500 to-yellow-500" },
  { name: "Boards", value: "boards", emoji: "📚", color: "from-pink-500 to-rose-500" },
];

const Exams = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const refresh = () => {
      const c: Record<string, number> = {};
      for (const l of getLessons()) c[l.exam_type] = (c[l.exam_type] || 0) + 1;
      setCounts(c);
    };
    refresh();
    window.addEventListener("nl-lessons-change", refresh);
    return () => window.removeEventListener("nl-lessons-change", refresh);
  }, []);

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-primary" />
        <h2 className="font-display font-bold text-xl">Exam Mode</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {examCategories.map((exam) => (
          <button
            key={exam.value}
            onClick={() => navigate(`/exams/${exam.value}`)}
            className="glass rounded-xl p-4 text-left hover:scale-[1.02] transition-transform active:scale-95"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${exam.color} flex items-center justify-center text-lg mb-2`}>
              {exam.emoji}
            </div>
            <p className="font-display font-semibold text-sm">{exam.name}</p>
            <p className="text-muted-foreground text-[10px]">{counts[exam.value] || 0} lessons</p>
          </button>
        ))}
      </div>

      <h3 className="font-display font-semibold text-sm mb-2 text-muted-foreground">Special Modes</h3>
      <div className="space-y-2">
        {[
          { label: "🔄 Last 7 Days Revision", desc: "Review recent lessons" },
          { label: "🎯 Weak Topic Killer", desc: "Focus on your weakest areas" },
          { label: "🚀 Rank Booster", desc: "Daily tasks to climb the leaderboard" },
        ].map((mode) => (
          <button
            key={mode.label}
            className="w-full glass rounded-xl p-3 text-left hover:bg-muted/30 transition-colors"
          >
            <p className="font-display font-semibold text-sm">{mode.label}</p>
            <p className="text-muted-foreground text-xs">{mode.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Exams;
