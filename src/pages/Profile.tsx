import { User, Settings, LogOut } from "lucide-react";

const Profile = () => {
  return (
    <div className="px-4 py-4">
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-3">
          <User className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="font-display font-bold text-lg">Guest User</h2>
        <p className="text-muted-foreground text-sm">Sign in to save your progress</p>
      </div>
      <div className="space-y-2">
        <button className="w-full glass rounded-xl p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors">
          <Settings className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm font-medium">Settings</span>
        </button>
        <button className="w-full glass rounded-xl p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors">
          <LogOut className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm font-medium">Sign In</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
