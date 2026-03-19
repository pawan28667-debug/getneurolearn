import { Flame, Zap, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const TopBar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass px-4 py-3">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <h1 className="font-display font-bold text-lg gradient-text">NeuroLearn</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-amber font-semibold text-sm">
            <Flame className="w-4 h-4" />
            <span>0</span>
          </div>
          <div className="flex items-center gap-1 text-primary font-semibold text-sm">
            <Zap className="w-4 h-4" />
            <span>0 XP</span>
          </div>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
