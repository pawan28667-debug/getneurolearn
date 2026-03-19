import { Flame, Zap, Target, TrendingUp } from "lucide-react";

const statCards = [
  { icon: Flame, label: "Day Streak", value: "0", color: "text-amber" },
  { icon: Zap, label: "Total XP", value: "0", color: "text-primary" },
  { icon: Target, label: "Accuracy", value: "0%", color: "text-accent" },
  { icon: TrendingUp, label: "Lessons", value: "0", color: "text-secondary" },
];

const Dashboard = () => {
  return (
    <div className="px-4 py-4">
      <h2 className="font-display font-bold text-xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {statCards.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="glass rounded-xl p-4">
            <Icon className={`w-5 h-5 ${color} mb-2`} />
            <p className="font-display font-bold text-lg">{value}</p>
            <p className="text-muted-foreground text-xs">{label}</p>
          </div>
        ))}
      </div>
      <div className="glass rounded-xl p-4">
        <h3 className="font-display font-semibold text-sm mb-2">Continue Learning</h3>
        <p className="text-muted-foreground text-xs">Complete your first lesson to see progress here.</p>
      </div>
    </div>
  );
};

export default Dashboard;
