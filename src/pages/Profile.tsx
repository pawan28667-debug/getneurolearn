import { User, Flame, Zap, BookmarkCheck } from "lucide-react";

const Profile = () => {
  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-3 text-primary-foreground font-display font-bold text-2xl">
          G
        </div>
        <h2 className="font-display font-bold text-lg">Guest Learner</h2>
        <p className="text-muted-foreground text-sm">No account needed — enjoy the full feed and study content.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="glass rounded-xl p-3 text-center">
          <Zap className="w-4 h-4 text-primary mx-auto mb-1" />
          <p className="font-display font-bold text-sm">0</p>
          <p className="text-muted-foreground text-[10px]">XP</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <Flame className="w-4 h-4 text-amber mx-auto mb-1" />
          <p className="font-display font-bold text-sm">0</p>
          <p className="text-muted-foreground text-[10px]">Streak</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <BookmarkCheck className="w-4 h-4 text-accent mx-auto mb-1" />
          <p className="font-display font-bold text-sm">0</p>
          <p className="text-muted-foreground text-[10px]">Saved</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-5 text-sm text-muted-foreground leading-relaxed">
        <p className="font-display font-semibold text-sm mb-2">Welcome to NeuroLearn ❤</p>
        <p>You're browsing the app without any login required. Explore study material, exam lessons, and AI-generated content freely.</p>
      </div>
    </div>
  );
};

export default Profile;
