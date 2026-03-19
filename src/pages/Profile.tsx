import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { User, Settings, LogOut, LogIn, Flame, Zap, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("user_id", user!.id).single();
      return data;
    },
  });

  const { data: bookmarkCount = 0 } = useQuery({
    queryKey: ["bookmark-count", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { count } = await supabase.from("bookmarks").select("*", { count: "exact", head: true }).eq("user_id", user!.id);
      return count || 0;
    },
  });

  if (!user) {
    return (
      <div className="px-4 py-4">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-3">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="font-display font-bold text-lg">Guest User</h2>
          <p className="text-muted-foreground text-sm mb-4">Sign in to save your progress</p>
          <button
            onClick={() => navigate("/auth")}
            className="gradient-primary text-primary-foreground font-display font-semibold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const xp = profile?.xp || 0;
  const badge = xp >= 5000 ? "🏆 Pro" : xp >= 2000 ? "🎓 Scholar" : xp >= 500 ? "📖 Learner" : "🌱 Beginner";

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-3 text-primary-foreground font-display font-bold text-2xl">
          {(profile?.display_name || "U")[0].toUpperCase()}
        </div>
        <h2 className="font-display font-bold text-lg">{profile?.display_name || "Learner"}</h2>
        <p className="text-muted-foreground text-sm">{user.email}</p>
        <span className="text-xs font-medium text-primary mt-1">{badge}</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="glass rounded-xl p-3 text-center">
          <Zap className="w-4 h-4 text-primary mx-auto mb-1" />
          <p className="font-display font-bold text-sm">{xp}</p>
          <p className="text-muted-foreground text-[10px]">XP</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <Flame className="w-4 h-4 text-amber mx-auto mb-1" />
          <p className="font-display font-bold text-sm">{profile?.streak_count || 0}</p>
          <p className="text-muted-foreground text-[10px]">Streak</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <BookmarkCheck className="w-4 h-4 text-accent mx-auto mb-1" />
          <p className="font-display font-bold text-sm">{bookmarkCount}</p>
          <p className="text-muted-foreground text-[10px]">Saved</p>
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={async () => {
            await signOut();
            toast.success("Signed out");
            navigate("/");
          }}
          className="w-full glass rounded-xl p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-destructive"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
