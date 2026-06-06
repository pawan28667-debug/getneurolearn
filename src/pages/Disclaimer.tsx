import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Disclaimer = () => (
  <div className="min-h-screen bg-background px-4 py-6">
    <div className="max-w-lg mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <h1 className="font-display font-black text-3xl mb-6"><span className="gradient-text">Disclaimer</span></h1>
      <div className="glass rounded-xl p-5 space-y-4 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="font-display font-semibold text-foreground mb-1">Educational Purpose Only</h2>
          <p>All content on NeuroLearn — including AI-generated lessons, notes, MCQs, and mock tests — is for educational and informational purposes only.</p>
        </section>
        <section>
          <h2 className="font-display font-semibold text-foreground mb-1">No Guarantee of Results</h2>
          <p>We do not guarantee any specific exam results, ranks, or scores. Performance depends on individual effort, preparation, and numerous other factors.</p>
        </section>
        <section>
          <h2 className="font-display font-semibold text-foreground mb-1">AI-Generated Content</h2>
          <p>Lessons and study material are generated using AI and may occasionally contain inaccuracies. We recommend cross-referencing with official textbooks and trusted sources.</p>
        </section>
        <section>
          <h2 className="font-display font-semibold text-foreground mb-1">Third-Party References</h2>
          <p>Exam names like JEE, NEET, UPSC, SSC, and CBSE are trademarks of their respective organizations. NeuroLearn is not affiliated with any examination body.</p>
        </section>
      </div>
    </div>
  </div>
);

export default Disclaimer;
