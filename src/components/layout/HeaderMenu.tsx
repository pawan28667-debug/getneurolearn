import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Home", to: "/", highlight: true },
  { label: "Blogs", to: "/blogs", highlight: true },
  { label: "Contact Us", to: "/contact", highlight: true },
  { label: "About Us", to: "/about", highlight: true },
  { label: "Pricing", href: "/#pricing", highlight: true },
];

type HeaderMenuProps = {
  className?: string;
};

const HeaderMenu = ({ className }: HeaderMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="header-sidebar"
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-foreground transition-colors hover:bg-muted",
          className,
        )}
      >
        <Menu className="h-4 w-4" />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-[60] bg-background/50 backdrop-blur-sm transition-opacity duration-300",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="header-sidebar"
        className={cn(
          "fixed top-0 right-0 z-[61] flex h-full w-[min(84vw,20rem)] flex-col border-l border-border bg-background/95 shadow-2xl backdrop-blur-xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <div>
            <p className="font-display text-base font-semibold text-foreground">Explore</p>
            <p className="text-xs text-muted-foreground">Quick links for NeuroLearn</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-3 px-4 py-5">
          {menuItems.map((item) => {
            const baseClass = "rounded-2xl px-4 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5";
            const styleClass = item.highlight
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400/40"
              : "glass text-foreground";
            const cls = `${baseClass} ${styleClass}`;
            return item.to ? (
              <Link key={item.label} to={item.to} onClick={() => setOpen(false)} className={cls}>
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} onClick={() => setOpen(false)} className={cls}>
                {item.label}
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default HeaderMenu;