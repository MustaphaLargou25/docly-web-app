import { Link } from "@tanstack/react-router";
import type { ModuleItem } from "@/lib/mock-data";
import * as Icons from "lucide-react";

export function ModuleCard({ module }: { module: ModuleItem }) {
  const Icon = (Icons[module.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>) || Icons.BookOpen;
  return (
    <Link
      to="/search"
      search={{ q: module.name } as never}
      className="group rounded-xl border border-divider bg-card p-4 flex items-center gap-3 hover:border-primary/30 transition"
    >
      <div
        className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${module.color}1A`, color: module.color }}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-semibold truncate">{module.name}</div>
        <div className="text-[12px] text-muted-foreground">{module.docs} documents</div>
      </div>
    </Link>
  );
}
