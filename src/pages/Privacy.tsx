import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => (
  <div className="min-h-screen bg-background px-4 py-6">
    <div className="max-w-lg mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <h1 className="font-display font-black text-3xl mb-6">Privacy <span className="gradient-text">Policy</span></h1>
      <div className="glass rounded-xl p-5 space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p><strong className="text-foreground">Effective Date:</strong> March 2026</p>
        <section>
          <h2 className="font-display font-semibold text-foreground mb-1">1. Information We Collect</h2>
          <p>We collect your name, email address, and learning activity data (lessons viewed, quiz scores, streaks) to personalize your experience.</p>
        </section>
        <section>
          <h2 className="font-display font-semibold text-foreground mb-1">2. How We Use Your Data</h2>
          <p>Your data is used to power AI-driven personalized learning, track your progress, and improve our platform. We never sell your personal data to third parties.</p>
        </section>
        <section>
          <h2 className="font-display font-semibold text-foreground mb-1">3. Data Security</h2>
          <p>We use industry-standard encryption and security measures to protect your information. All data is stored on secure, encrypted servers.</p>
        </section>
        <section>
          <h2 className="font-display font-semibold text-foreground mb-1">4. Your Rights</h2>
          <p>You may request deletion of your account and associated data at any time by contacting support@neurolearn.app.</p>
        </section>
        <section>
          <h2 className="font-display font-semibold text-foreground mb-1">5. Cookies</h2>
          <p>We use essential cookies for authentication and preferences. No third-party tracking cookies are used.</p>
        </section>
      </div>
    </div>
  </div>
);

export default Privacy;
