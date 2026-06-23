import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/verify-email")({
  head: () => ({
    meta: [
      { title: "Verify your email — Docly" },
      { name: "description", content: "Confirm your email address to finish creating your Docly account." },
    ],
  }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getUser().then(({ data }) => {
      if (cancelled) return;
      if (data.user?.email) setEmail(data.user.email);
      if (data.user?.email_confirmed_at) {
        navigate({ to: "/profile" });
        return;
      }
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user?.email_confirmed_at) navigate({ to: "/profile" });
      else if (session?.user?.email) setEmail(session.user.email);
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  async function handleResend(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return toast.error("Enter your email");
    setSending(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    setSending(false);
    if (error) return toast.error(error.message);
    toast.success("Verification email sent");
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/signin" });
  }

  return (
    <div className="min-h-screen flex flex-col md:items-center md:justify-center bg-background px-5 py-8">
      <div className="w-full md:max-w-[420px] md:bg-card md:border md:border-divider md:rounded-2xl md:p-8">
        <div className="flex flex-col items-center mb-6 text-center">
          <Logo size={40} />
          <h1 className="text-[24px] font-bold mt-3">Verify your email</h1>
          <p className="text-[13px] text-muted-foreground mt-1">
            {checking
              ? "Checking your status..."
              : "We sent you a confirmation link. Click it to activate your account, then return here."}
          </p>
        </div>

        <form onSubmit={handleResend} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-[12px] font-medium">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@university.edu" />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={sending}>
            {sending ? "Sending..." : "Resend verification email"}
          </Button>
        </form>

        <div className="flex flex-col gap-2 mt-6 text-center text-[13px] text-muted-foreground">
          <button type="button" onClick={() => location.reload()} className="text-primary font-semibold">
            I've confirmed — refresh
          </button>
          <button type="button" onClick={handleSignOut} className="text-muted-foreground">
            Sign out
          </button>
          <p>
            Wrong account? <Link to="/signin" className="text-primary font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
