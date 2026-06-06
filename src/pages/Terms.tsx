import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => (
  <div className="min-h-screen bg-background px-4 py-6">
    <div className="max-w-lg mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <h1 className="font-display font-black text-3xl mb-6">Terms & <span className="gradient-text">Conditions</span></h1>
      <div className="glass rounded-xl p-5 space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p><strong className="text-foreground">Last Updated:</strong> March 2026</p>
        <section>
          <h2 className="font-display font-semibold text-foreground mb-1">1. Acceptance of Terms</h2>
          <p>By using NeuroLearn, you agree to these terms. If you do not agree, please do not use the platform.</p>
        </section>
        <section>
          <h2 className="font-display font-semibold text-foreground mb-1">2. User Accounts</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate information during registration.</p>
        </section>
        <section>
          <h2 className="font-display font-semibold text-foreground mb-1">3. Content Usage</h2>
          <p>All AI-generated lessons and study material are for personal educational use only. Redistribution or commercial use is prohibited without written consent.</p>
        </section>
        <section>
          <h2 className="font-display font-semibold text-foreground mb-1">4. Subscription & Payments</h2>
          <p>Pro subscriptions are billed monthly. You may cancel at any time; access continues until the end of the billing period.</p>
        </section>
        <section>
          <h2 className="font-display font-semibold text-foreground mb-1">5. Limitation of Liability</h2>
          <p>NeuroLearn is provided "as is." We are not liable for any exam outcomes or decisions made based on our content.</p>
        </section>
      </div>
    </div>
  </div>
);

export default Terms;
