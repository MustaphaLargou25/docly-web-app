import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { currentUser } from "@/lib/mock-data";
import { Settings, Bell, LifeBuoy, LogOut, ChevronRight, UserPen, Sparkles } from "lucide-react";
import { toast } from "sonner";

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
  return (
    <AppLayout>
      <div className="flex flex-col items-center text-center mb-5">
        <Avatar className="h-24 w-24 mb-3">
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">{currentUser.initials}</AvatarFallback>
        </Avatar>
        <h1 className="text-[22px] font-bold">{currentUser.name}</h1>
        <p className="text-[13px] text-muted-foreground">{currentUser.university}</p>
        <p className="text-[12px] text-muted-foreground">{currentUser.program}</p>
      </div>

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
        <Link to="/signin" className="w-full flex items-center gap-3 p-4 hover:bg-muted text-destructive">
          <LogOut className="h-5 w-5" />
          <span className="text-[14px] font-medium">Log out</span>
        </Link>
      </nav>
    </AppLayout>
  );
}
