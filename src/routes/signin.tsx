import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { getPostAuthRoute } from "@/lib/post-login";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in \u2014 Docly" },
      { name: "description", content: "Sign in to your Docly account to access your library, community feed, and uploads." },
      { property: "og:title", content: "Sign in \u2014 Docly" },
      { property: "og:description", content: "Sign in to your Docly account to access your library, community feed, and uploads." },
      { property: "og:url", content: "https://docly-web-app.lovable.app/signin" },
    ],
    links: [{ rel: "canonical", href: "https://docly-web-app.lovable.app/signin" }],
  }),
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      if (error.message.toLowerCase().includes("confirm")) {
        toast.error("Please verify your email first");
        navigate({ to: "/verify-email" });
        return;
      }
      toast.error(error.message);
      return;
    }
    if (data.user && !data.user.email_confirmed_at) {
      toast.message("Please verify your email to continue");
      navigate({ to: "/verify-email" });
      return;
    }
    toast.success("Signed in");
    const dest = await getPostAuthRoute();
    navigate({ to: dest });
  }

  async function handleGoogle() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error(result.error.message ?? "Google sign-in failed");
      return;
    }
    if (result.redirected) return;
    const dest = await getPostAuthRoute();
    navigate({ to: dest });
  }

  return (
    <div className="min-h-screen flex flex-col md:items-center md:justify-center bg-background px-5 py-8">
      <div className="w-full md:max-w-[420px] md:bg-card md:border md:border-divider md:rounded-2xl md:p-8">
        <div className="flex flex-col items-center mb-6">
          <Logo size={40} />
          <h1 className="text-[24px] font-bold mt-3">Welcome back</h1>
          <p className="text-[13px] text-muted-foreground mt-1">By students. For students.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-[12px] font-medium">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@university.edu" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-[12px] font-medium">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-divider" /></div>
          <div className="relative flex justify-center"><span className="bg-background md:bg-card px-3 text-[11px] text-muted-foreground uppercase tracking-wider">or</span></div>
        </div>

        <Button variant="outline" className="w-full" size="lg" onClick={handleGoogle} type="button">
          <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.95l3.66-2.84Z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.65l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"/></svg>
          Continue with Google
        </Button>

        <p className="text-center text-[13px] text-muted-foreground mt-6">
          No account? <Link to="/register" className="text-primary font-semibold">Create one</Link>
        </p>
      </div>
    </div>
  );
}
