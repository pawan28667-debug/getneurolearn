import { Link } from "react-router-dom";
import { Flame, Zap, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import HeaderMenu from "./HeaderMenu";
const logoUrl = "/neurolearn-logo.png";

const TopBar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass px-4 py-3">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoUrl} alt="NeuroLearn logo" className="w-7 h-7 object-contain" />
          <span className="font-display font-bold text-lg gradient-text">NeuroLearn</span>
        </Link>
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
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
