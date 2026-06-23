import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your Docly account" },
      { name: "description", content: "Join Docly \u2014 the student community to share course notes, ask questions, and earn points." },
      { property: "og:title", content: "Create your Docly account" },
      { property: "og:description", content: "Join Docly \u2014 the student community to share course notes, ask questions, and earn points." },
      { property: "og:url", content: "https://docly-web-app.lovable.app/register" },
    ],
    links: [{ rel: "canonical", href: "https://docly-web-app.lovable.app/register" }],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [accept, setAccept] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!accept) return toast.error("Please accept the terms");
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { display_name: name },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data.user && !data.user.email_confirmed_at) {
      toast.success("Check your inbox to confirm your email");
      navigate({ to: "/verify-email" });
      return;
    }
    toast.success("Account created");
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen flex flex-col md:items-center md:justify-center bg-background px-5 py-8">
      <div className="w-full md:max-w-[420px] md:bg-card md:border md:border-divider md:rounded-2xl md:p-8">
        <div className="flex flex-col items-center mb-6">
          <Logo size={40} />
          <h1 className="text-[24px] font-bold mt-3">Create your account</h1>
          <p className="text-[13px] text-muted-foreground mt-1">Join the student community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-[12px] font-medium">Full name</Label>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Youssef Amrani" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-[12px] font-medium">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@university.edu" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-[12px] font-medium">Password</Label>
            <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" />
          </div>
          <label className="flex items-start gap-2 pt-1">
            <Checkbox checked={accept} onCheckedChange={(v) => setAccept(Boolean(v))} className="mt-0.5" />
            <span className="text-[12px] text-muted-foreground">
              I agree to the <span className="text-primary font-medium">Terms</span> and{" "}
              <span className="text-primary font-medium">Privacy Policy</span>.
            </span>
          </label>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="text-center text-[13px] text-muted-foreground mt-6">
          Already a member? <Link to="/signin" className="text-primary font-semibold">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
