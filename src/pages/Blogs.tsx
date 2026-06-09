import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";

const blogPosts = [
  {
    title: "1. Start Strong: Build a Daily Study Rhythm",
    blurb: "Small daily habits beat random bursts of effort.",
    points: [
      { heading: "Set one clear goal", text: "Pick one high-value task for the day, such as finishing one chapter or solving 20 questions." },
      { heading: "Protect your focus time", text: "Study in a quiet block of 45 to 60 minutes with your phone away and notes ready." },
      { heading: "Review before sleeping", text: "A short recap at night helps your brain retain what you learned during the day." },
    ],
  },
  {
    title: "2. Make Notes That Actually Help You Revise",
    blurb: "Good notes should be simple, visual, and easy to scan.",
    points: [
      { heading: "Use short phrases", text: "Write key ideas in your own words instead of copying long textbook explanations." },
      { heading: "Add one memory cue", text: "Use a symbol, image, or example to recall the concept faster in revision time." },
      { heading: "Keep one-page summaries", text: "Condense each chapter into a single sheet for final revision before exams." },
    ],
  },
  {
    title: "3. Turn Weak Topics Into Strengths",
    blurb: "You do not need to love every subject, just treat every weak point with a plan.",
    points: [
      { heading: "Find the root cause", text: "Check whether the issue is theory, formula recall, or practice speed." },
      { heading: "Practice in layers", text: "Start with examples, then solve mixed questions, then explain the topic aloud." },
      { heading: "Track progress weekly", text: "A quick review every Sunday shows what improved and what still needs attention." },
    ],
  },
  {
    title: "4. Use Smart Repetition, Not Endless Reading",
    blurb: "Repetition works best when it is active and intentional.",
    points: [
      { heading: "Test yourself", text: "Close your notes and reconstruct the idea from memory before checking the answer." },
      { heading: "Mix old and new topics", text: "Revise older chapters while learning something new to strengthen long-term memory." },
      { heading: "Keep revision short", text: "Ten focused minutes of revisiting old material is better than two hours of passive reading." },
    ],
  },
  {
    title: "5. Build Focus With a Simple Study Setup",
    blurb: "Your environment can either support concentration or quietly drain it.",
    points: [
      { heading: "Clear the desk", text: "Keep only the materials you need for the current task within reach." },
      { heading: "Use a timer", text: "A 25-minute sprint keeps your attention sharp without burnout." },
      { heading: "Create a calm cue", text: "A playlist, lamp, or scent can signal that it is now time to study." },
    ],
  },
  {
    title: "6. Study Smarter With Active Recall",
    blurb: "Active recall turns passive reading into real learning.",
    points: [
      { heading: "Ask yourself questions", text: "After every section, pause and explain the idea without looking at your notes." },
      { heading: "Use flashcards", text: "Short prompts help you remember definitions, formulas, and key facts quickly." },
      { heading: "Teach it out loud", text: "If you can explain it simply, you are much closer to mastering it." },
    ],
  },
  {
    title: "7. Stay Consistent During Exam Pressure",
    blurb: "Pressure is normal; the goal is to keep your routine steady, not perfect.",
    points: [
      { heading: "Keep one small win daily", text: "Even a 15-minute revision session counts when the schedule feels heavy." },
      { heading: "Avoid all-nighter thinking", text: "Sleep and recovery are part of performance, not the enemy of it." },
      { heading: "Use calm check-ins", text: "A two-minute breathing break can reset your mind before the next question." },
    ],
  },
  {
    title: "8. Learn Better With Visual Memory Tools",
    blurb: "The brain remembers patterns and images faster than plain text.",
    points: [
      { heading: "Sketch quick diagrams", text: "Flowcharts, timelines, and maps make relationships easier to remember." },
      { heading: "Color-code topics", text: "Use a consistent color for formulas, definitions, and examples." },
      { heading: "Link ideas together", text: "Connect one concept to a real-life example so it sticks in long-term memory." },
    ],
  },
  {
    title: "9. Use Practice Tests to Improve Speed",
    blurb: "Mock practice reveals where your understanding is strong and where it is fragile.",
    points: [
      { heading: "Solve under time pressure", text: "Timed practice trains your brain to move from confusion to clarity quickly." },
      { heading: "Review mistakes deeply", text: "Every wrong answer is a clue about what you need to learn next." },
      { heading: "Keep a correction notebook", text: "Write the mistake, the fix, and the exact rule you missed." },
    ],
  },
  {
    title: "10. Make Learning Feel Achievable Every Day",
    blurb: "Progress grows when your routine feels clear, kind, and realistic.",
    points: [
      { heading: "Celebrate tiny wins", text: "Finished a topic? Solved a tough question? That progress matters." },
      { heading: "Keep the goal visible", text: "A simple target sheet helps you stay motivated on busy days." },
      { heading: "Reward consistency", text: "A short break, a favorite snack, or a note of appreciation can keep momentum alive." },
    ],
  },
];

const Blogs = () => (
  <div className="min-h-screen bg-background px-4 py-6">
    <div className="mx-auto max-w-4xl">
      <Link to="/feed" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to feed
      </Link>

      <header className="mb-8 rounded-3xl border border-border bg-gradient-to-r from-primary/10 via-background to-blue-500/10 p-6 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-primary">
          <BookOpen className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-[0.25em]">NeuroLearn Blogs</span>
        </div>
        <h1 className="font-display text-3xl font-black md:text-4xl">Fresh study blogs for smarter learning</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
          Browse ten quick-read articles, bold main ideas, and practical tips you can use on your next study session.
        </p>
      </header>

      <section className="space-y-6">
        {blogPosts.map((post, index) => (
          <article key={post.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">Blog {index + 1}</p>
            <h2 className="font-display text-xl font-bold text-foreground md:text-2xl">{post.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{post.blurb}</p>

            <div className="mt-5 space-y-4">
              {post.points.map((point) => (
                <div key={point.heading} className="rounded-2xl border border-border/70 bg-background/80 p-4">
                  <h3 className="text-base font-semibold text-foreground">{point.heading}</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    <li><strong className="text-foreground">Main point:</strong> {point.text}</li>
                  </ul>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <footer className="mt-8 rounded-3xl border border-dashed border-border bg-background/80 p-5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 text-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-semibold">Tip:</span>
        </div>
        <p className="mt-2">Read one blog every day and turn the advice into a tiny action step for your next study session.</p>
      </footer>
    </div>
  </div>
);

export default Blogs;
