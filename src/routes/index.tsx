import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { ModuleCard } from "@/components/ModuleCard";
import { DocumentCard } from "@/components/DocumentCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { currentUser, modules, documents } from "@/lib/mock-data";
import { useLang } from "@/lib/i18n";
import { Search, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  return (
    <AppLayout>
      {/* Greeting */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">{currentUser.initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-[12px] text-muted-foreground">{t("greeting")},</div>
            <div className="text-[18px] font-bold leading-tight">{currentUser.name.split(" ")[0]}</div>
          </div>
        </div>
        <Link to="/notifications" className="md:hidden text-[12px] text-primary font-semibold">{t("notifications")}</Link>
      </div>

      {/* Mobile search */}
      <form
        onSubmit={(e) => { e.preventDefault(); navigate({ to: "/search", search: { q } as never }); }}
        className="md:hidden mb-5"
      >
        <div className="relative">
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("search") + "…"}
            className="w-full h-11 ps-11 pe-4 rounded-full bg-input-bg text-[14px] placeholder:text-muted-foreground border-0"
          />
        </div>
      </form>

      {/* University banner */}
      <div className="rounded-xl docly-gradient p-5 text-white mb-6 relative overflow-hidden">
        <div className="absolute -end-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute end-12 -bottom-10 h-24 w-24 rounded-full bg-white/5" />
        <div className="relative">
          <div className="text-[11px] uppercase tracking-wider opacity-80">University</div>
          <h2 className="text-[18px] font-bold mt-1">{currentUser.university}</h2>
          <p className="text-[13px] opacity-90 mt-1">{currentUser.program}</p>
          <Link to="/library" className="inline-flex items-center gap-1 mt-3 px-3 py-1.5 rounded-full bg-white text-primary text-[12px] font-semibold">
            Open library <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Modules */}
      <section className="mb-6">
        <header className="flex items-center justify-between mb-3">
          <h2 className="text-[18px] font-bold">{t("browseModules")}</h2>
          <Link to="/search" className="text-[12px] text-primary font-semibold">See all</Link>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {modules.map((m) => <ModuleCard key={m.id} module={m} />)}
        </div>
      </section>

      {/* Recent documents */}
      <section>
        <header className="flex items-center justify-between mb-3">
          <h2 className="text-[18px] font-bold">Recent uploads</h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {documents.slice(0, 4).map((d) => <DocumentCard key={d.id} doc={d} />)}
        </div>
      </section>
    </AppLayout>
  );
}
