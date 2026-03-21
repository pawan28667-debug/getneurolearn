import { Link } from "react-router-dom";
import { ArrowLeft, Zap, Target, Heart, Rocket } from "lucide-react";

const About = () => (
  <div className="min-h-screen bg-background px-4 py-6">
    <div className="max-w-lg mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <h1 className="font-display font-black text-3xl mb-6">About <span className="gradient-text">NeuroLearn</span></h1>
      <div className="space-y-6">
        {[
          { icon: Target, title: "Our Mission", text: "To make quality education accessible through AI-powered, bite-sized lessons that fit into every student's day." },
          { icon: Rocket, title: "What We Do", text: "NeuroLearn delivers 60-second reel-style lessons powered by AI, covering JEE, NEET, UPSC, SSC, and Board exams. We combine micro-learning with gamification to make studying addictive." },
          { icon: Heart, title: "Why We Exist", text: "We believe every Indian student deserves access to world-class study material — regardless of location or budget. Our platform is built to democratize competitive exam prep." },
          { icon: Zap, title: "Our Technology", text: "We use cutting-edge AI to generate personalized lessons, detect weak areas, and create adaptive learning paths tailored to each student's performance." },
        ].map((s) => (
          <div key={s.title} className="glass rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="w-5 h-5 text-primary" />
              <h2 className="font-display font-bold text-base">{s.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default About;
