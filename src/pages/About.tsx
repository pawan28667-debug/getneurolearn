import { Link } from "react-router-dom";
import { ArrowLeft, Zap, Target, Heart, Rocket, Users, Sparkles, Mail } from "lucide-react";

const About = () => (
  <div className="min-h-screen bg-background px-4 py-6">
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <h1 className="font-display font-black text-3xl md:text-4xl mb-3">
        About <span className="gradient-text">NeuroLearn</span>
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        Hey there! We're so glad you stopped by. Grab a chai, get comfy, and let us tell you our story.
      </p>

      <div className="space-y-6 text-[15px] leading-relaxed text-foreground/90">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">Hello from the NeuroLearn family 👋</h2>
          </div>
          <p>
            NeuroLearn was born out of a very simple, very human frustration. We watched brilliant students all
            around us — friends, cousins, neighbors — burn out trying to crack JEE, NEET, UPSC, SSC and Board
            exams. Thick textbooks, endless coaching hours, expensive material, and very little time to actually
            understand what they were learning. We knew there had to be a better way. So we sat down, opened
            our laptops, and started building the kind of learning app we wish we had as students.
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">Our Mission</h2>
          </div>
          <p>
            We want to put a world-class teacher in every student's pocket — for free, or at the cost of one
            samosa a month. Whether you're studying in Kota or in a tiny village in Bihar, whether your parents
            can afford expensive coaching or not, you deserve the same quality of explanation, the same depth
            of practice, and the same encouragement. Education should never be a luxury, and NeuroLearn is our
            small contribution to making sure it isn't.
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Rocket className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">What We Actually Do</h2>
          </div>
          <p className="mb-3">
            Think of NeuroLearn as a mix of Instagram reels, Duolingo, and your favorite teacher — all rolled
            into one app. Here's what you get:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
            <li>60-second reel-style lessons you can swipe through anywhere</li>
            <li>AI-generated explanations tailored to your exam and weak topics</li>
            <li>Structured study material for every subject, class, and chapter</li>
            <li>Mock tests, quick MCQs, and instant doubt solving</li>
            <li>Streaks, XP, and badges to keep you coming back (and smiling)</li>
            <li>A friendly community of learners cheering you on</li>
          </ul>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">Why We Exist</h2>
          </div>
          <p>
            Indian students are some of the hardest working in the world. But hard work alone is not enough
            when the system feels stacked against you — when the best teachers live in metros, when good notes
            cost a fortune, and when the syllabus keeps growing year after year. NeuroLearn exists to level
            that playing field. Every lesson we generate, every quiz we ship, and every streak we celebrate is
            a tiny vote of confidence in you. You are smart enough. You are capable enough. You just needed
            the right tools.
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">The Tech Behind the Magic</h2>
          </div>
          <p>
            Under the hood, NeuroLearn is powered by cutting-edge AI models that generate accurate,
            curriculum-aligned content in seconds. We've trained the platform to understand the Indian
            education system — NCERT, CBSE, state boards, and competitive exam patterns. The AI adapts to your
            performance, finds your weak spots, and quietly nudges you toward mastery. But don't worry — you
            don't need to be a tech expert to use it. If you can swipe a reel, you can use NeuroLearn.
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">The People Behind It</h2>
          </div>
          <p>
            We are a tiny, scrappy team of educators, engineers, and ex-students who have been through the
            grind ourselves. We've cried over physics problems, celebrated tiny test improvements, and pulled
            all-nighters before boards. That's why every feature on NeuroLearn is built with empathy first.
            We're not a faceless company — we're real people who reply to real emails. If you ever want to
            chat, share feedback, request a feature, or just say hi, write to us at{" "}
            <a href="mailto:mantalmath6@gmail.com" className="text-primary font-medium underline">
              mantalmath6@gmail.com
            </a>
            . We promise we read everything.
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">Come Learn With Us</h2>
          </div>
          <p>
            Thank you for reading this far — seriously, it means a lot. NeuroLearn is still young and growing,
            and you being here is what makes it all worth it. So go ahead, open the Feed, swipe a lesson, take
            a quiz, build a streak. We'll be right here, cheering for you. And remember, every topper started
            exactly where you are right now. One small lesson at a time. Welcome home. 💙
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default About;
