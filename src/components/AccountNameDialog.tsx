import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User } from "lucide-react";
import { createProfile, getProfile } from "@/lib/localStore";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AccountNameDialog = ({ open, onClose }: Props) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }
    setLoading(true);
    try {
      const existing = getProfile();
      if (existing && existing.name === trimmed) {
        toast.success(`Welcome back, ${trimmed}!`);
      } else {
        createProfile(trimmed);
        toast.success(`Welcome, ${trimmed}!`);
      }
      onClose();
      navigate("/exams");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <User className="w-5 h-5 text-primary" /> Pick your account name
          </DialogTitle>
          <DialogDescription>
            No sign-up needed — your profile is saved on this device to track XP, streaks, and saved lessons.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="e.g. arjun_neet2026"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={loading || !name.trim()}
            className="w-full gradient-primary text-primary-foreground font-display font-semibold"
          >
            {loading ? "Saving…" : "Create profile & start"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountNameDialog;
