import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const renderInline = (text: string) => {
  // Bold the first sentence of each paragraph for scannability
  const match = text.match(/^(.+?[.!?])(\s+)([\s\S]*)$/);
  if (!match) return <>{text}</>;
  const [, lead, , rest] = match;
  return (
    <>
      <strong className="text-foreground">{lead}</strong> {rest}
    </>
  );
};

const BlogDetail = () => {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background px-4 py-6 text-foreground">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">This blog post could not be found.</p>
          <Link to="/blogs" className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to all blogs
          </Link>
        </div>
      </div>
    );
  }

  const paragraphs = post.article.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  // Distribute point headings as <h2> section breaks across the article
  const headings = post.points.map((p) => p.heading);
  const interval = Math.max(1, Math.floor(paragraphs.length / (headings.length + 1)));

  // Build SEO meta tags update
  if (typeof document !== "undefined") {
    document.title = `${post.title} | NeuroLearn Blog`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", post.blurb);
  }

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/blogs"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blogs
        </Link>

        <article className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
          <header className="mb-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em]">NeuroLearn Article</span>
            </div>
            <h1 className="font-display text-3xl font-black leading-tight text-foreground md:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">{post.blurb}</p>
          </header>

          <div className="prose-content space-y-5 text-[15px] leading-7 text-foreground/90 md:text-base md:leading-8">
            {paragraphs.map((para, i) => {
              const headingIndex = Math.floor(i / interval) - 1;
              const showHeading = i > 0 && i % interval === 0 && headings[headingIndex];
              return (
                <div key={i} className="space-y-4">
                  {showHeading && (
                    <h2 className="mt-8 font-display text-2xl font-bold text-foreground">
                      {headings[headingIndex]}
                    </h2>
                  )}
                  <p>{renderInline(para)}</p>
                </div>
              );
            })}
          </div>

          <section className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <h2 className="font-display text-xl font-bold text-foreground">Key takeaways</h2>
            <ul className="mt-4 list-disc space-y-3 pl-6 marker:text-primary">
              {post.points.map((point) => (
                <li key={point.heading} className="text-sm leading-6 text-foreground/90 md:text-base">
                  <strong className="text-foreground">{point.heading}:</strong>{" "}
                  <span className="text-muted-foreground">{point.text}</span>
                </li>
              ))}
            </ul>
          </section>

          <footer className="mt-8 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
            <span>NeuroLearn Editorial</span>
            <Link to="/blogs" className="text-primary hover:underline">
              Read more articles →
            </Link>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
