import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookText } from "lucide-react";
import { examCategories, getChaptersForSubject } from "@/data/studyMaterial";

const StudyChapters = () => {
  const { examType, subject, classLevel } = useParams<{ examType: string; subject: string; classLevel: string }>();
  const navigate = useNavigate();
  const exam = examCategories.find((e) => e.value === examType);
  const decodedSubject = decodeURIComponent(subject || "");
  const decodedClass = decodeURIComponent(classLevel || "");
  const chapters = getChaptersForSubject(decodedSubject);

  return (
    <div className="px-4 py-4 pb-24">
      <button onClick={() => navigate(`/study/${examType}/${encodeURIComponent(decodedSubject)}`)} className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4 hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>{decodedSubject}</span>
      </button>

      <div className="flex items-center gap-2 mb-1">
        <BookText className="w-5 h-5 text-primary" />
        <h2 className="font-display font-bold text-xl">{decodedClass} — {decodedSubject}</h2>
      </div>
      <p className="text-muted-foreground text-sm mb-5">{chapters.length} chapters available</p>

      <div className="space-y-2.5">
        {chapters.map((ch, i) => (
          <button
            key={ch.id}
            onClick={() => navigate(`/study/${examType}/${encodeURIComponent(decodedSubject)}/${encodeURIComponent(decodedClass)}/${ch.id}`)}
            className="w-full glass rounded-xl p-4 flex items-center gap-3 hover:bg-muted/30 transition-colors active:scale-[0.98]"
          >
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm shrink-0">
              {i + 1}
            </div>
            <div className="text-left min-w-0">
              <p className="font-display font-semibold text-sm truncate">{ch.name}</p>
              <p className="text-muted-foreground text-[10px]">{ch.mcqs.length} MCQs • Notes • Mock</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudyChapters;
