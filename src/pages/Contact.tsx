import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MessageCircle, MapPin } from "lucide-react";

const Contact = () => (
  <div className="min-h-screen bg-background px-4 py-6">
    <div className="max-w-lg mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <h1 className="font-display font-black text-3xl mb-6">Contact <span className="gradient-text">Us</span></h1>
      <div className="space-y-4">
        {[
          { icon: Mail, title: "Email", text: "support@neurolearn.app" },
          { icon: MessageCircle, title: "Support Hours", text: "Monday – Saturday, 9 AM – 6 PM IST" },
          { icon: MapPin, title: "Location", text: "India" },
        ].map((c) => (
          <div key={c.title} className="glass rounded-xl p-5 flex items-start gap-3">
            <c.icon className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-display font-semibold text-sm">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="glass rounded-xl p-5 mt-6">
        <h3 className="font-display font-semibold text-sm mb-3">Send a Message</h3>
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" className="w-full bg-muted/50 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 ring-primary/30" />
          <input type="email" placeholder="Your Email" className="w-full bg-muted/50 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 ring-primary/30" />
          <textarea placeholder="Your Message" rows={4} className="w-full bg-muted/50 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 ring-primary/30 resize-none" />
          <button className="gradient-primary text-primary-foreground font-display font-semibold px-6 py-2 rounded-xl text-sm w-full">Send Message</button>
        </form>
      </div>
    </div>
  </div>
);

export default Contact;
