import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MessageCircle, MapPin, Clock, HeartHandshake, Sparkles, LifeBuoy } from "lucide-react";

const Contact = () => (
  <div className="min-h-screen bg-background px-4 py-6">
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <h1 className="font-display font-black text-3xl md:text-4xl mb-3">
        Contact <span className="gradient-text">Us</span>
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        We genuinely love hearing from learners. Whether it's a bug, a brilliant idea, or just a "hi" — drop us a note.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        {[
          { icon: Mail, title: "Email Us", text: "mantalmath6@gmail.com", href: "mailto:mantalmath6@gmail.com" },
          { icon: Clock, title: "Reply Time", text: "Usually within 24 hours" },
          { icon: MessageCircle, title: "Support Hours", text: "Mon – Sat, 9 AM – 9 PM IST" },
          { icon: MapPin, title: "Based In", text: "India 🇮🇳" },
        ].map((c) => (
          <div key={c.title} className="glass rounded-2xl p-4 flex items-start gap-3">
            <c.icon className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-display font-semibold text-sm">{c.title}</h3>
              {c.href ? (
                <a href={c.href} className="text-sm text-primary underline break-all">{c.text}</a>
              ) : (
                <p className="text-sm text-muted-foreground">{c.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6 text-[15px] leading-relaxed text-foreground/90">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <HeartHandshake className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">We're Real People, We Promise 💙</h2>
          </div>
          <p>
            Hi! Behind every email you send to NeuroLearn, there's a real human reading it — usually with a
            cup of chai in one hand and a laptop in the other. We're not a giant call center with bots and
            ticket numbers. We're a small team of educators and engineers who genuinely care about your
            learning journey. When you reach out, you're talking directly to the people who build the app you
            love. So please, don't hold back. Tell us everything.
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <LifeBuoy className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">What You Can Reach Out About</h2>
          </div>
          <p className="mb-3">
            Honestly? Anything. But here are some of the most common reasons students email us:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
            <li>Bugs, glitches, or things that look weird on your screen</li>
            <li>A topic, chapter, or exam you wish we'd cover next</li>
            <li>Account, login, or password troubles</li>
            <li>Pro plan questions, billing help, or upgrade issues</li>
            <li>Feature requests — we love these the most!</li>
            <li>Partnerships with schools, coaching centers, or teachers</li>
            <li>Press, collaboration, or media questions</li>
            <li>Just wanting to share how NeuroLearn helped you ❤️</li>
          </ul>
          <p className="mt-3">
            No question is too small. If something is on your mind, send it our way at{" "}
            <a href="mailto:mantalmath6@gmail.com" className="text-primary font-medium underline">
              mantalmath6@gmail.com
            </a>
            .
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">A Few Friendly Tips When You Write</h2>
          </div>
          <p className="mb-3">
            To help us help you faster, here are a few tiny things that make a huge difference:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
            <li>Tell us which device and browser you're using (especially for bugs)</li>
            <li>A screenshot is worth a thousand words — please attach one if you can</li>
            <li>Mention your exam or class so we can give you the most relevant answer</li>
            <li>Use the same email you signed up with — it speeds things up a lot</li>
          </ul>
          <p className="mt-3">
            And if you're frustrated? That's okay too. Vent away. We've all been there with a buggy app at the
            worst possible moment. We'll do our best to make it right.
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">When You'll Hear Back</h2>
          </div>
          <p>
            We try to reply to every single email within 24 hours, and most of the time it's much faster than
            that. On weekends, holidays, or during exam-season chaos, it might take a tiny bit longer — but we
            never leave anyone hanging. If you haven't heard from us in two days, please send a gentle nudge.
            Sometimes emails get lost in spam folders (theirs or ours!) and we'd hate to miss yours.
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">Send Us a Message</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Prefer a quick form? Fill this out and we'll get back to you at the email you provide.
          </p>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your Name" className="w-full bg-muted/50 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 ring-primary/30" />
            <input type="email" placeholder="Your Email" className="w-full bg-muted/50 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 ring-primary/30" />
            <input type="text" placeholder="Subject (e.g. 'Feature request')" className="w-full bg-muted/50 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 ring-primary/30" />
            <textarea placeholder="Tell us everything..." rows={5} className="w-full bg-muted/50 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 ring-primary/30 resize-none" />
            <a href="mailto:mantalmath6@gmail.com" className="block text-center gradient-primary text-primary-foreground font-display font-semibold px-6 py-3 rounded-xl text-sm w-full">
              Send Message
            </a>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground pt-2">
          Thank you for being part of NeuroLearn. We'll talk soon! 💙
        </p>
      </div>
    </div>
  </div>
);

export default Contact;
