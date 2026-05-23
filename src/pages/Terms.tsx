import { Link } from "react-router-dom";
import { ArrowLeft, FileText, CheckCircle2, AlertCircle, CreditCard, UserX, Mail } from "lucide-react";

const Terms = () => (
  <div className="min-h-screen bg-background px-4 py-6">
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <h1 className="font-display font-black text-3xl md:text-4xl mb-2">
        Terms & <span className="gradient-text">Conditions</span>
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        Don't worry — this isn't going to be a wall of legal mumbo jumbo. Here are the basic ground rules for using NeuroLearn, written like a friend explaining them over chai.
      </p>

      <div className="space-y-5 text-[15px] leading-relaxed text-foreground/90">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">By Using NeuroLearn…</h2>
          </div>
          <p>
            You're agreeing to these terms. We've kept them simple and fair. If something doesn't work for you,
            just stop using the app — no hard feelings. But hopefully you'll stay, because we built this for
            you. 💙
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">What You Can Do</h2>
          </div>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Use NeuroLearn for your personal learning and exam prep</li>
            <li>Share screenshots and lessons with your study buddies</li>
            <li>Give us feedback, suggest features, request topics</li>
            <li>Cancel your Pro plan whenever you want, no questions asked</li>
          </ul>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">What's Not Cool</h2>
          </div>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Reselling, scraping, or copying our content for commercial use</li>
            <li>Trying to hack, break, or reverse-engineer the app</li>
            <li>Using NeuroLearn to spam, harass, or harm other users</li>
            <li>Sharing your account or pretending to be someone else</li>
          </ul>
          <p className="mt-2">If you do any of these, we may need to suspend your account. But we'll always try to talk to you first.</p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">Pro Plan & Payments</h2>
          </div>
          <p>
            Pro is ₹199/month and gives you unlimited AI lessons, advanced analytics, and a few other perks.
            Payments are processed securely through our payment partners. You can cancel anytime — your Pro
            access stays active until the end of your billing period, after which you'll quietly slide back to
            the free plan. No surprises.
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <UserX className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">Closing Your Account</h2>
          </div>
          <p>
            You can delete your account anytime by writing to us. We'll wipe your personal data from our active
            systems within a reasonable time. Some basic logs may stick around for legal reasons, but nothing
            embarrassing — we promise.
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">Reach Us Anytime</h2>
          </div>
          <p>
            Questions about these terms? Confused about a charge? Want to send us a meme? Email us at{" "}
            <a href="mailto:mantalmath6@gmail.com" className="text-primary font-medium underline">
              mantalmath6@gmail.com
            </a>
            . We reply to everyone.
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground pt-2">
          Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long" })}
        </p>
      </div>
    </div>
  </div>
);

export default Terms;
