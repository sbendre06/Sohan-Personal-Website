import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

export function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!FORMSPREE_ID) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, message }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
          Your email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
          Message
        </label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Say something..."
          rows={7}
          className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending" || status === "success"}
        className="w-full py-2.5 px-4 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm font-mono hover:bg-primary/20 hover:border-primary/50 hover:neon-border disabled:opacity-50 transition-all"
      >
        {status === "sending" ? "Sending..." : status === "success" ? "Sent!" : "Send message →"}
      </button>
      {status === "success" && (
        <p className="text-xs font-mono text-primary text-center">
          Message received — I'll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-xs font-mono text-destructive text-center">
          Something went wrong. Try emailing me directly at sbendre06@gmail.com
        </p>
      )}
    </form>
  );
}
