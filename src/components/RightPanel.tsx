import { Link } from "@tanstack/react-router";
import { TrendingUp, Trophy, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { trendingModules, topContributors } from "@/lib/mock-data";

export function RightPanel() {
  return (
    <aside className="hidden lg:flex fixed inset-y-16 end-0 w-[280px] flex-col gap-4 p-4 overflow-y-auto scrollbar-thin border-s border-divider bg-background">
      <section className="rounded-xl border border-divider p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="text-[13px] font-semibold">Trending modules</h3>
        </div>
        <ul className="space-y-2">
          {trendingModules.map((m) => (
            <li key={m.id} className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-lg flex items-center justify-center text-[11px] font-semibold text-white" style={{ background: m.color }}>
                {m.name.slice(0, 2).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium truncate">{m.name}</div>
                <div className="text-[11px] text-muted-foreground">{m.docs} docs</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-divider p-4">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="h-4 w-4 text-amber" />
          <h3 className="text-[13px] font-semibold">Points leaderboard</h3>
        </div>
        <ul className="space-y-3">
          {topContributors.map((c, i) => (
            <li key={c.id} className="flex items-center gap-3">
              <span className="text-[12px] font-bold text-muted-foreground w-4">#{i + 1}</span>
              <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary text-primary-foreground text-[11px]">{c.initials}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0">
                <Link to="/profile/$userId" params={{ userId: c.id }} className="text-[13px] font-medium truncate hover:text-primary">
                  {c.name}
                </Link>
              </div>
              <span className="text-[11px] font-semibold text-amber">{c.points}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl docly-gradient p-4 text-white">
        <Sparkles className="h-5 w-5 mb-2" />
        <h3 className="text-[14px] font-semibold mb-1">Earn more points</h3>
        <p className="text-[12px] opacity-90 mb-3">Upload your notes and help your peers — get +15 pts per upload.</p>
        <Link to="/upload" className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white text-primary text-[12px] font-semibold">
          Upload now
        </Link>
      </section>
    </aside>
  );
}
