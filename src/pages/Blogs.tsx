import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

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
          Ten in-depth articles, each a full study lesson, packed with practical tips you can apply to your next session.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {blogPosts.map((post, index) => (
          <Link
            key={post.slug}
            to={`/blogs/${post.slug}`}
            className="group block rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:border-primary/40 hover:shadow-md"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">Blog {index + 1}</p>
            <h2 className="font-display text-lg font-bold text-foreground group-hover:text-primary md:text-xl">{post.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{post.blurb}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
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
