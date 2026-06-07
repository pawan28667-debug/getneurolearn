import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, Lock, ArrowLeft, User, Eye, EyeOff, Phone, KeyRound } from "lucide-react";

type Mode = "login" | "signup" | "phone";

const Auth = () => {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isLogin = mode === "login";
  const isSignup = mode === "signup";
  const isPhone = mode === "phone";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate("/feed");
      } else if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success("Account created successfully!");
        navigate("/feed");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!phone) {
      toast.error("Please enter your mobile number");
      return;
    }
    setLoading(true);
    try {
      const formatted = phone.startsWith("+") ? phone : `+${phone.replace(/\D/g, "")}`;
      const { error } = await supabase.auth.signInWithOtp({ phone: formatted });
      if (error) throw error;
      setOtpSent(true);
      toast.success("OTP sent to your mobile number");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }
    setLoading(true);
    try {
      const formatted = phone.startsWith("+") ? phone : `+${phone.replace(/\D/g, "")}`;
      const { error } = await supabase.auth.verifyOtp({
        phone: formatted,
        token: otp,
        type: "sms",
      });
      if (error) throw error;
      toast.success("Logged in successfully!");
      navigate("/feed");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });
    if (error) toast.error(error.message);
    else toast.success("Password reset link sent to your email");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-4">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <h1 className="font-display font-black text-3xl mb-1 gradient-text">NeuroLearn</h1>
        <p className="text-muted-foreground text-sm mb-6">
          {isLogin && "Welcome back, learner!"}
          {isSignup && "Start your learning journey"}
          {isPhone && "Login with mobile OTP"}
        </p>

        <div className="w-full max-w-sm space-y-4">
          {!isPhone && (
            <form onSubmit={handleSubmit} className="space-y-3">
              {isSignup && (
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-12 glass"
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12 glass"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="pl-10 pr-10 h-12 glass"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 gradient-primary text-primary-foreground font-display font-semibold"
              >
                {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
              </Button>
              {isLogin && (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="w-full text-center text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </form>
          )}

          {isPhone && (
            <div className="space-y-3">
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="Mobile number (e.g. +919876543210)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={otpSent}
                  className="pl-10 h-12 glass"
                />
              </div>

              {otpSent && (
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="pl-10 h-12 glass tracking-widest"
                  />
                </div>
              )}

              {!otpSent ? (
                <Button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full h-12 gradient-primary text-primary-foreground font-display font-semibold"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleVerifyOtp}
                    disabled={loading}
                    className="w-full h-12 gradient-primary text-primary-foreground font-display font-semibold"
                  >
                    {loading ? "Verifying..." : "Verify & Login"}
                  </Button>
                  <button
                    type="button"
                    onClick={() => { setOtpSent(false); setOtp(""); }}
                    className="w-full text-center text-sm text-primary hover:underline"
                  >
                    Change number / Resend
                  </button>
                </>
              )}
            </div>
          )}

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-background px-2 text-muted-foreground">or</span></div>
          </div>

          {!isPhone ? (
            <button
              onClick={() => { setMode("phone"); setOtpSent(false); setOtp(""); }}
              className="w-full h-11 rounded-md border border-border flex items-center justify-center gap-2 text-sm font-medium hover:bg-accent transition"
            >
              <Phone className="w-4 h-4" /> Login with Mobile OTP
            </button>
          ) : (
            <button
              onClick={() => setMode("login")}
              className="w-full h-11 rounded-md border border-border flex items-center justify-center gap-2 text-sm font-medium hover:bg-accent transition"
            >
              <Mail className="w-4 h-4" /> Login with Email
            </button>
          )}

          {!isPhone && (
            <p className="text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setMode(isLogin ? "signup" : "login")}
                className="text-primary font-medium hover:underline"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
