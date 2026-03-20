import { useNavigate } from "react-router-dom";
import { BookMarked } from "lucide-react";
import { examCategories } from "@/data/studyMaterial";

const StudyMaterial = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-4 pb-24">
      <div className="flex items-center gap-2 mb-4">
        <BookMarked className="w-5 h-5 text-primary" />
        <h2 className="font-display font-bold text-xl">Study Material</h2>
      </div>
      <p className="text-muted-foreground text-sm mb-5">Choose your exam to start structured learning</p>

      <div className="grid grid-cols-2 gap-3">
        {examCategories.map((exam) => (
          <button
            key={exam.value}
            onClick={() => navigate(`/study/${exam.value}`)}
            className="glass rounded-xl p-5 text-left hover:scale-[1.02] transition-transform active:scale-95"
          >
            <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${exam.color} flex items-center justify-center text-xl mb-3`}>
              {exam.emoji}
            </div>
            <p className="font-display font-semibold text-sm">{exam.name}</p>
            <p className="text-muted-foreground text-[10px] mt-0.5">Notes • Questions • Mocks</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterial;
