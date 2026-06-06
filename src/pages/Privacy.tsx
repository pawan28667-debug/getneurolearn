import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";

const Privacy = () => (
  <div className="min-h-screen bg-background px-4 py-6">
    <div className="max-w-lg mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white mb-5 shadow-lg shadow-blue-500/30">
        <Shield className="w-7 h-7 mb-2 opacity-90" />
        <h1 className="font-display font-black text-3xl">Privacy Policy</h1>
        <p className="text-blue-100 text-sm mt-1">Your data, your rules — explained simply.</p>
      </div>

      <div className="glass rounded-xl p-5 space-y-5 text-sm text-muted-foreground leading-relaxed">
        <p>Hey there 👋 — welcome to NeuroLearn! Before you dive into the lessons, here's a friendly walk-through of how we handle your information. No legalese, no scary fine print — just the honest story.</p>

        <section>
          <h2 className="font-display font-semibold text-blue-600 mb-1">1. What we collect</h2>
          <p>When you sign up we save your name and email so we can build your account, sync your progress across devices, and send the occasional update. As you learn, we also remember what lessons you've watched, the streaks you're building, the quizzes you've nailed, and the topics you're crushing. That's it — nothing creepy.</p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-blue-600 mb-1">2. Why we collect it</h2>
          <p>We use this data to make your study journey feel personal — recommending the right chapters, generating AI notes tailored to your exam, and showing cute streak animations when you keep showing up. None of it is sold to anyone, ever.</p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-blue-600 mb-1">3. Who can see your data</h2>
          <p>Only you and our secure backend. We don't share your information with advertisers or third-party data brokers. The only exception is when our trusted infrastructure partners help us run the app — and they're bound by strict confidentiality.</p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-blue-600 mb-1">4. How we keep it safe</h2>
          <p>Everything travels over encrypted HTTPS connections, passwords are hashed, and our database has strict row-level access rules so even we can't peek at your stuff casually. We do regular security checks to keep things tight.</p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-blue-600 mb-1">5. Your rights</h2>
          <p>Want a copy of your data? Want to delete your account? Just drop us a line at <a href="mailto:mantalmath6@gmail.com" className="text-blue-600 font-semibold">mantalmath6@gmail.com</a> and we'll handle it within a few days. No questions, no guilt trips.</p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-blue-600 mb-1">6. Cookies & tracking</h2>
          <p>We use only the essential cookies needed to keep you logged in and remember your preferences. We may show relevant ads via Google AdSense to keep the platform free for students — those follow Google's own privacy rules.</p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-blue-600 mb-1">7. Kids & students</h2>
          <p>NeuroLearn is built for learners 13 and older. If you're younger, please use it with a parent or guardian. We don't knowingly collect data from kids under 13.</p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-blue-600 mb-1">8. Changes to this policy</h2>
          <p>If we ever update this policy, we'll bump the date below and let you know inside the app. Big changes won't sneak past you.</p>
        </section>

        <p className="text-xs pt-2 border-t border-border/40">
          <strong className="text-foreground">Last updated:</strong> June 2026 · Questions? Email us at <a href="mailto:mantalmath6@gmail.com" className="text-blue-600 font-semibold">mantalmath6@gmail.com</a>.
        </p>
      </div>
    </div>
  </div>
);

export default Privacy;
