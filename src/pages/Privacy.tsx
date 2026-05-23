import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, Database, Mail, UserCheck } from "lucide-react";

const Privacy = () => (
  <div className="min-h-screen bg-background px-4 py-6">
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <h1 className="font-display font-black text-3xl md:text-4xl mb-2">
        Privacy <span className="gradient-text">Policy</span>
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        The short version: we respect your privacy, we don't sell your data, and we only collect what we truly need to help you learn. Here's the longer version, in plain English.
      </p>

      <div className="space-y-5 text-[15px] leading-relaxed text-foreground/90">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">A Friendly Hello</h2>
          </div>
          <p>
            Hi! Thanks for trusting NeuroLearn with your learning journey. We know "privacy policy" usually
            sounds boring and scary, so we've written this one like a real human conversation. Grab a snack
            and read on — we promise no jargon.
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">What We Collect</h2>
          </div>
          <p className="mb-2">Just the essentials needed to give you a great learning experience:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Your name and email when you sign up</li>
            <li>Your exam choice, classes and progress (so we can personalize lessons)</li>
            <li>Quiz scores, streaks, and XP (so your stats show up correctly)</li>
            <li>Basic device info and analytics to fix bugs and improve the app</li>
          </ul>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">How We Use It</h2>
          </div>
          <p>
            We use your information to power your lessons, track your progress, send you the occasional helpful
            email, and make the app better over time. That's it. We don't sell your data to advertisers, we
            don't share it with strangers, and we definitely don't spam you. Pinky promise.
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">How We Keep It Safe</h2>
          </div>
          <p>
            Your data lives on secure, encrypted servers. Passwords are never stored as plain text — they're
            hashed using industry-standard cryptography. We use HTTPS everywhere, and only a small number of
            trusted team members can access user data, and only when absolutely necessary (like helping you fix
            a bug).
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <UserCheck className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">Your Rights</h2>
          </div>
          <p>
            You own your data. Always. You can update your details, download your information, or ask us to
            delete your account at any time. No long forms, no awkward "are you sure?" loops. Just email us and
            we'll take care of it.
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">Questions? Just Ask!</h2>
          </div>
          <p>
            If anything in this policy is unclear, or if you want to know exactly what we have stored about
            you, write to us at{" "}
            <a href="mailto:mantalmath6@gmail.com" className="text-primary font-medium underline">
              mantalmath6@gmail.com
            </a>
            . A real person will reply — usually within 24 hours.
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground pt-2">
          Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long" })}
        </p>
      </div>
    </div>
  </div>
);

export default Privacy;
