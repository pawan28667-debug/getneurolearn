import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
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
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user!.id)
        .single();
      return data;
    },
  });

  const { data: progressStats } = useQuery({
    queryKey: ["progress-stats", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user!.id);
      const completed = data?.filter((p) => p.completed) || [];
      const totalScore = completed.reduce((sum, p) => sum + (p.score || 0), 0);
      const accuracy = completed.length > 0 ? Math.round((totalScore / completed.length) * 100) : 0;
      return { completed: completed.length, accuracy };
    },
  });

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <h2 className="font-display font-bold text-xl mb-2">Sign in to see your dashboard</h2>
        <p className="text-muted-foreground text-sm mb-4">Track your progress and learning streaks</p>
        <button
          onClick={() => navigate("/auth")}
          className="gradient-primary text-primary-foreground font-display font-semibold px-6 py-2.5 rounded-xl text-sm"
        >
          Sign In
        </button>
      </div>
    );
  }

  const stats = [
    { icon: Flame, label: "Day Streak", value: String(profile?.streak_count || 0), color: "text-amber" },
    { icon: Zap, label: "Total XP", value: String(profile?.xp || 0), color: "text-primary" },
    { icon: Target, label: "Accuracy", value: `${progressStats?.accuracy || 0}%`, color: "text-accent" },
    { icon: TrendingUp, label: "Lessons", value: String(progressStats?.completed || 0), color: "text-secondary" },
  ];

  const xp = profile?.xp || 0;
  const badge = xp >= 5000 ? "🏆 Pro" : xp >= 2000 ? "🎓 Scholar" : xp >= 500 ? "📖 Learner" : "🌱 Beginner";

  return (
    <div className="px-4 py-4 space-y-4 pb-24">
      {/* Welcome */}
      <div className="glass rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-xs">Welcome back</p>
          <h2 className="font-display font-bold text-lg">{profile?.display_name || "Learner"}</h2>
          <span className="text-xs font-medium text-primary">{badge}</span>
        </div>
        <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg">
          {(profile?.display_name || "U")[0].toUpperCase()}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="glass rounded-xl p-4">
            <Icon className={`w-5 h-5 ${color} mb-2`} />
            <p className="font-display font-bold text-lg">{value}</p>
            <p className="text-muted-foreground text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* Continue */}
      <button
        onClick={() => navigate("/feed")}
        className="w-full glass rounded-xl p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
      >
        <div>
          <h3 className="font-display font-semibold text-sm">Continue Learning</h3>
          <p className="text-muted-foreground text-xs">Jump back into your feed</p>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Community */}
      <div>
        <h3 className="font-display font-bold text-base mb-3">Community</h3>
        <div className="grid grid-cols-2 gap-3">
          {communityItems.map(({ icon: Icon, label, desc, color }) => (
            <button
              key={label}
              className="glass rounded-xl p-4 text-left hover:bg-muted/30 transition-colors group"
            >
              <div className={`w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-4.5 h-4.5 ${color}`} />
              </div>
              <p className="font-display font-semibold text-sm leading-tight">{label}</p>
              <p className="text-muted-foreground text-[11px] mt-0.5">{desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
