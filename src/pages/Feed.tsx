import { Sparkles } from "lucide-react";

const Feed = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4 animate-pulse-glow">
        <Sparkles className="w-8 h-8 text-primary-foreground" />
      </div>
      <h2 className="font-display font-bold text-2xl mb-2">Learning Feed</h2>
      <p className="text-muted-foreground text-sm max-w-xs">
        Swipe through bite-sized lessons. Coming to life soon with AI-powered content.
      </p>
    </div>
  );
};

export default Feed;
