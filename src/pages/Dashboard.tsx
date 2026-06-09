import { useNavigate } from "react-router-dom";
import {
  Flame, Zap, Target, TrendingUp, ArrowRight,
  Users, Swords, MessageCircleQuestion, FileText,
  Trophy, GraduationCap, School, Handshake,
} from "lucide-react";

const communityItems = [
  { icon: Users, label: "Group Study Rooms", desc: "Learn together in real-time", color: "text-primary" },
  { icon: Swords, label: "Peer Challenges", desc: "Compete on timed quizzes", color: "text-destructive" },
  { icon: MessageCircleQuestion, label: "Doubt Discussions", desc: "Get answers from peers", color: "text-accent" },
  { icon: FileText, label: "Share Notes", desc: "Upload & exchange notes", color: "text-secondary" },
  { icon: Trophy, label: "Leaderboards", desc: "See who's on top", color: "text-amber" },
  { icon: GraduationCap, label: "Mentor Sessions", desc: "1-on-1 with top scorers", color: "text-primary" },
  { icon: School, label: "Teacher Groups", desc: "Class-wide study rooms", color: "text-accent" },
  { icon: Handshake, label: "Creator Collab", desc: "Build lessons together", color: "text-secondary" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Flame, label: "Daily Boost", value: "Free", color: "text-amber" },
    { icon: Zap, label: "AI Lessons", value: "Unlimited", color: "text-primary" },
    { icon: Target, label: "Exam Modes", value: "JEE, NEET, UPSC", color: "text-accent" },
    { icon: TrendingUp, label: "Practice", value: "Ready", color: "text-secondary" },
  ];

  return (
    <div className="px-4 py-4 space-y-4 pb-24">
      <div className="glass rounded-2xl p-4">
        <p className="text-muted-foreground text-xs">Welcome to your learning hub</p>
        <h2 className="font-display font-bold text-lg">No login required — jump in now</h2>
        <p className="text-muted-foreground text-sm mt-2">Explore lessons, exam material, and AI study prompts instantly.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="glass rounded-xl p-4">
            <Icon className={`w-5 h-5 ${color} mb-2`} />
            <p className="font-display font-bold text-lg">{value}</p>
            <p className="text-muted-foreground text-xs">{label}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/feed")}
        className="w-full glass rounded-xl p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
      >
        <div>
          <h3 className="font-display font-semibold text-sm">Go to Feed</h3>
          <p className="text-muted-foreground text-xs">Start with free lessons right away</p>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground" />
      </button>

      <div>
        <h3 className="font-display font-bold text-base mb-3">Community</h3>
        <div className="grid grid-cols-2 gap-3">
          {communityItems.map(({ icon: Icon, label, desc, color }) => (
            <div key={label} className="glass rounded-xl p-4">
              <div className={`w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center mb-2`}>
                <Icon className={`w-4.5 h-4.5 ${color}`} />
              </div>
              <p className="font-display font-semibold text-sm leading-tight">{label}</p>
              <p className="text-muted-foreground text-[11px] mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
