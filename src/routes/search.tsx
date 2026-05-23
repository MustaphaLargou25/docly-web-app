import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { DocumentCard } from "@/components/DocumentCard";
import { documents, userResults } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { z } from "zod";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  component: SearchPage,
});

const filters = ["All", "Documents", "Users", "Subjects"] as const;

function SearchPage() {
  const { q: initial } = Route.useSearch();
  const [q, setQ] = useState(initial ?? "");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const showDocs = filter === "All" || filter === "Documents" || filter === "Subjects";
  const showUsers = filter === "All" || filter === "Users";

  return (
    <AppLayout>
      <h1 className="text-[24px] font-bold mb-4">Search</h1>

      <form className="mb-4">
        <div className="relative">
          <SearchIcon className="absolute start-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search documents, users, subjects…"
            className="w-full h-12 ps-11 pe-4 rounded-full bg-input-bg text-[14px] placeholder:text-muted-foreground border-0"
          />
        </div>
      </form>

      <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-thin pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition",
              filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/70",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="text-[12px] text-muted-foreground mb-3">
        {documents.length + userResults.length} results {q ? `for "${q}"` : ""}
      </p>

      {showDocs && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {documents.map((d) => <DocumentCard key={d.id} doc={d} />)}
        </div>
      )}

      {showUsers && (
        <section className="space-y-3">
          <h2 className="text-[15px] font-semibold">People</h2>
          {userResults.map((u) => (
            <div key={u.id} className="flex items-center gap-3 p-3 rounded-xl border border-divider bg-card">
              <Avatar className="h-11 w-11"><AvatarFallback className="bg-primary text-primary-foreground font-semibold">{u.initials}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold">{u.name}</div>
                <div className="text-[12px] text-muted-foreground">{u.program}</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber/15 text-amber text-[11px] font-semibold">{u.points} pts</span>
            </div>
          ))}
        </section>
      )}
    </AppLayout>
  );
}
