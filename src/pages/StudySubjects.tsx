import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { examCategories, examSubjects } from "@/data/studyMaterial";

const subjectIcons: Record<string, string> = {
  Physics: "⚛️", Chemistry: "🧪", Mathematics: "📐", Math: "📐",
  Biology: "🧬", Polity: "🏛️", History: "📜", Geography: "🌍",
  Economics: "📈", Science: "🔬", Environment: "🌿", English: "📝",
  "Quantitative Aptitude": "🔢", Reasoning: "🧠", "General Awareness": "📰",
};

const StudySubjects = () => {
  const { examType } = useParams<{ examType: string }>();
  const navigate = useNavigate();
  const exam = examCategories.find((e) => e.value === examType);
  const subjects = examSubjects[examType || ""] || [];

  return (
    <div className="px-4 py-4 pb-24">
      <button onClick={() => navigate("/study")} className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4 hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <div className="flex items-center gap-2 mb-1">
        <BookOpen className="w-5 h-5 text-primary" />
        <h2 className="font-display font-bold text-xl">{exam?.name || "Subjects"}</h2>
      </div>
      <p className="text-muted-foreground text-sm mb-5">Select a subject</p>

      <div className="space-y-2.5">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => navigate(`/study/${examType}/${encodeURIComponent(subject)}`)}
            className="w-full glass rounded-xl p-4 flex items-center gap-3 hover:bg-muted/30 transition-colors active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-lg">
              {subjectIcons[subject] || "📘"}
            </div>
            <div className="text-left">
              <p className="font-display font-semibold text-sm">{subject}</p>
              <p className="text-muted-foreground text-[10px]">Notes • Questions • Mock Tests</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudySubjects;
