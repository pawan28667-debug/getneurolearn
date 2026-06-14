import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

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

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="mx-auto max-w-3xl">
        <Link to="/blogs" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to blogs
        </Link>

        <article className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <BookOpen className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em]">NeuroLearn Article</span>
          </div>
          <h1 className="font-display text-3xl font-black text-foreground md:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">{post.blurb}</p>

          <div className="mt-6 space-y-5 text-[15px] leading-7 text-foreground/90 md:text-base md:leading-8">
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <section className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <h2 className="text-lg font-semibold text-foreground">Key takeaways</h2>
            <ul className="mt-3 space-y-3">
              {post.points.map((point, index) => (
                <li key={point.heading} className="rounded-xl border border-border/70 bg-background/80 p-4">
                  <h3 className="text-base font-semibold text-foreground">{index + 1}. {point.heading}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{point.text}</p>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
