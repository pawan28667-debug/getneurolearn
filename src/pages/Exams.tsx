import { BookOpen } from "lucide-react";

const examCategories = [
  { name: "JEE Main", emoji: "⚡", color: "from-blue-500 to-cyan-500" },
  { name: "JEE Advanced", emoji: "🔥", color: "from-orange-500 to-red-500" },
  { name: "NEET", emoji: "🧬", color: "from-green-500 to-emerald-500" },
  { name: "UPSC", emoji: "🏛️", color: "from-purple-500 to-violet-500" },
  { name: "SSC", emoji: "📊", color: "from-amber-500 to-yellow-500" },
  { name: "Boards", emoji: "📚", color: "from-pink-500 to-rose-500" },
];

const Exams = () => {
  return (
    <div className="px-4 py-4">
      <h2 className="font-display font-bold text-xl mb-4">Exam Mode</h2>
      <div className="grid grid-cols-2 gap-3">
        {examCategories.map((exam) => (
          <button
            key={exam.name}
            className="glass rounded-xl p-4 text-left hover:scale-[1.02] transition-transform active:scale-95"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${exam.color} flex items-center justify-center text-lg mb-2`}>
              {exam.emoji}
            </div>
            <p className="font-display font-semibold text-sm">{exam.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Exams;
