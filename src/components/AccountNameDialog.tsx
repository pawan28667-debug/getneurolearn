import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AccountNameDialog = ({ open, onClose }: Props) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    setCheckingAuth(true);
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsSignedIn(!!user);
      setCheckingAuth(false);
    });
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }

    setLoading(true);
    try {
      if (!isSignedIn) {
        // Stash desired name and route to auth
        localStorage.setItem("pending_account_name", trimmed);
        toast.info("Sign up or log in to claim this name");
        onClose();
        navigate("/auth");
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not signed in");

      // Uniqueness check
      const { data: existing, error: checkErr } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("display_name", trimmed)
        .neq("user_id", user.id)
        .maybeSingle();
      if (checkErr) throw checkErr;
      if (existing) {
        toast.error("That account name is already taken — try another");
        setLoading(false);
        return;
      }

      const { error: upErr } = await supabase
        .from("profiles")
        .update({ display_name: trimmed })
        .eq("user_id", user.id);
      if (upErr) throw upErr;

      toast.success(`Welcome, ${trimmed}!`);
      onClose();
      navigate("/exams");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not save name";
      toast.error(msg);
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
            This unique name will be saved to your Exam profile and shown on your lessons and streaks.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="e.g. arjun_neet2026"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            disabled={loading || checkingAuth}
          />
          <Button
            type="submit"
            disabled={loading || checkingAuth || !name.trim()}
            className="w-full gradient-primary text-primary-foreground font-display font-semibold"
          >
            {loading ? "Saving…" : isSignedIn ? "Save & Continue" : "Continue to Sign Up"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountNameDialog;
