import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { currentUser } from "@/lib/mock-data";
import { Settings, Bell, LifeBuoy, LogOut, ChevronRight, UserPen, Sparkles, Mail, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";


export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Your profile \u2014 Docly" },
      { name: "description", content: "View your Docly profile: stats, points, uploads, downloads, and ranking among student contributors." },
      { property: "og:title", content: "Your profile \u2014 Docly" },
      { property: "og:description", content: "View your Docly profile: stats, points, uploads, downloads, and ranking among student contributors." },
      { property: "og:url", content: "https://docly-web-app.lovable.app/profile" },
    ],
    links: [{ rel: "canonical", href: "https://docly-web-app.lovable.app/profile" }],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<boolean | null>(null);
  const [displayName, setDisplayName] = useState<string>(currentUser.name);
  const [university, setUniversity] = useState<string>(currentUser.university);
  const [program, setProgram] = useState<string>(currentUser.program);

  async function loadProfile(userId: string, fallbackName?: string | null) {
    const { data } = await supabase
      .from("profiles")
      .select("display_name, university, program")
      .eq("id", userId)
      .maybeSingle();
    setDisplayName(data?.display_name || fallbackName || currentUser.name);
    setUniversity(data?.university || "");
    setProgram(data?.program || "");
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      setEmail(user?.email ?? null);
      setConfirmed(!!user?.email_confirmed_at);
      if (user) {
        const fallback =
          (user.user_metadata?.display_name as string | undefined) ??
          (user.user_metadata?.full_name as string | undefined) ??
          (user.email ? user.email.split("@")[0] : null);
        loadProfile(user.id, fallback);
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user?.email ?? null);
      setConfirmed(!!session?.user?.email_confirmed_at);
      if (session?.user) loadProfile(session.user.id, session.user.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const initials = (displayName || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("") || currentUser.initials;

  return (
    <AppLayout>
      <div className="flex flex-col items-center text-center mb-5">
        <Avatar className="h-24 w-24 mb-3">
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">{initials}</AvatarFallback>
        </Avatar>
        <h1 className="text-[22px] font-bold">{displayName}</h1>
        {university ? (
          <p className="text-[13px] text-muted-foreground">{university}</p>
        ) : (
          <Link to="/select-university" className="text-[13px] text-primary font-semibold">
            Add your university
          </Link>
        )}
        {program && <p className="text-[12px] text-muted-foreground">{program}</p>}
        {email && (
          <p className="text-[12px] text-muted-foreground mt-1">{email}</p>
        )}
      </div>


      {confirmed === false && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 mb-5 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-start">
            <p className="text-[14px] font-medium text-amber-900 dark:text-amber-100">Email not verified</p>
            <p className="text-[13px] text-amber-800/80 dark:text-amber-200/80 mt-0.5">
              Confirm your email to keep full access to your account.
            </p>
            <Button asChild variant="secondary" size="sm" className="mt-2">
              <Link to="/verify-email">Verify email</Link>
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-xl docly-gradient text-white p-5 mb-5 flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-wider opacity-80">Total points</div>
          <div className="text-[32px] font-bold leading-none mt-1">{currentUser.points}</div>
          <div className="text-[12px] opacity-90 mt-1">Keep uploading to earn more</div>
        </div>
        <Sparkles className="h-10 w-10 opacity-80" />
      </div>

      <div className="grid grid-cols-4 gap-2 mb-6">
        {[
          { label: "Uploads", value: currentUser.uploads },
          { label: "Downloads", value: currentUser.downloads },
          { label: "Points", value: currentUser.points },
          { label: "Ranking", value: `#${currentUser.ranking}` },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-divider bg-card p-3 text-center">
            <div className="text-[18px] font-bold">{s.value}</div>
            <div className="text-[11px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <nav className="rounded-xl border border-divider bg-card divide-y divide-divider overflow-hidden">
        {[
          { icon: UserPen, label: "Edit Profile", onClick: () => toast("Edit profile") },
          { icon: Bell, label: "Notifications", onClick: () => navigate({ to: "/notifications" }) },
          { icon: Settings, label: "Settings", onClick: () => navigate({ to: "/settings" }) },
          { icon: LifeBuoy, label: "Help & Support", onClick: () => toast("Help") },
        ].map((item) => (
          <button key={item.label} onClick={item.onClick} className="w-full flex items-center gap-3 p-4 hover:bg-muted text-start">
            <item.icon className="h-5 w-5 text-muted-foreground" />
            <span className="flex-1 text-[14px] font-medium">{item.label}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
        <button
          type="button"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/signin" });
          }}
          className="w-full flex items-center gap-3 p-4 hover:bg-muted text-destructive text-start"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-[14px] font-medium">Log out</span>
        </button>
      </nav>
    </AppLayout>
  );
}
