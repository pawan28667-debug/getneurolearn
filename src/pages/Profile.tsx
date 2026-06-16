import { useEffect, useState } from "react";
import { Flame, Zap, BookmarkCheck, CheckCircle2, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ProfileData {
  display_name: string | null;
  xp: number;
  streak_count: number;
}

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [bookmarks, setBookmarks] = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setSignedIn(false);
        setLoading(false);
        return;
      }
      setSignedIn(true);

      const [{ data: prof }, { count: bmCount }, { count: doneCount }] = await Promise.all([
        supabase
          .from("profiles")
          .select("display_name, xp, streak_count")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("bookmarks")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
        supabase
          .from("user_progress")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("completed", true),
      ]);

      setProfile(prof ?? { display_name: null, xp: 0, streak_count: 0 });
      setBookmarks(bmCount ?? 0);
      setCompleted(doneCount ?? 0);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-10 text-center text-muted-foreground text-sm">
        Loading your profile…
      </div>
    );
  }

  if (!signedIn) {
    return (
      <div className="px-4 py-10 flex flex-col items-center text-center space-y-3">
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-display font-bold text-2xl">
          G
        </div>
        <h2 className="font-display font-bold text-lg">No profile yet</h2>
        <p className="text-muted-foreground text-sm max-w-xs">
          Pick an account name on the home page to create your NeuroLearn profile and start tracking XP, streaks &amp; lessons.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-display font-semibold rounded-xl px-5 py-2.5 text-sm"
        >
          <LogIn className="w-4 h-4" /> Create my profile
        </Link>
      </div>
    );
  }

  const name = profile?.display_name?.trim() || "Learner";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-3 text-primary-foreground font-display font-bold text-2xl">
          {initial}
        </div>
        <h2 className="font-display font-bold text-lg">{name}</h2>
        <p className="text-muted-foreground text-sm">Your learning progress</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <div className="glass rounded-xl p-3 text-center">
          <Zap className="w-4 h-4 text-primary mx-auto mb-1" />
          <p className="font-display font-bold text-sm">{profile?.xp ?? 0}</p>
          <p className="text-muted-foreground text-[10px]">XP</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <Flame className="w-4 h-4 text-amber mx-auto mb-1" />
          <p className="font-display font-bold text-sm">{profile?.streak_count ?? 0}</p>
          <p className="text-muted-foreground text-[10px]">Streak</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
          <p className="font-display font-bold text-sm">{completed}</p>
          <p className="text-muted-foreground text-[10px]">Done</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <BookmarkCheck className="w-4 h-4 text-accent mx-auto mb-1" />
          <p className="font-display font-bold text-sm">{bookmarks}</p>
          <p className="text-muted-foreground text-[10px]">Saved</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-5 text-sm text-muted-foreground leading-relaxed">
        <p className="font-display font-semibold text-sm mb-2 text-foreground">Welcome back, {name} 👋</p>
        <p>Keep your streak alive! Swipe through reels, complete lessons, and bookmark your favourites to boost your XP.</p>
      </div>
    </div>
  );
};

export default Profile;
