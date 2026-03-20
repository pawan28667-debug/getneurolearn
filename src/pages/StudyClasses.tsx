import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { examCategories, subjectClasses } from "@/data/studyMaterial";

const StudyClasses = () => {
  const { examType, subject } = useParams<{ examType: string; subject: string }>();
  const navigate = useNavigate();
  const exam = examCategories.find((e) => e.value === examType);
  const classes = subjectClasses[examType || ""] || [];
  const decodedSubject = decodeURIComponent(subject || "");

  return (
    <div className="px-4 py-4 pb-24">
      <button onClick={() => navigate(`/study/${examType}`)} className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4 hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>{exam?.name}</span>
      </button>

      <div className="flex items-center gap-2 mb-1">
        <GraduationCap className="w-5 h-5 text-primary" />
        <h2 className="font-display font-bold text-xl">{decodedSubject}</h2>
      </div>
      <p className="text-muted-foreground text-sm mb-5">Choose your class or level</p>

      <div className="grid grid-cols-2 gap-3">
        {classes.map((cls) => (
          <button
            key={cls}
            onClick={() => navigate(`/study/${examType}/${encodeURIComponent(decodedSubject)}/${encodeURIComponent(cls)}`)}
            className="glass rounded-xl p-5 text-center hover:scale-[1.02] transition-transform active:scale-95"
          >
            <div className="w-10 h-10 mx-auto rounded-full bg-muted/50 flex items-center justify-center text-lg mb-2">
              🎓
            </div>
            <p className="font-display font-semibold text-sm">{cls}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudyClasses;
