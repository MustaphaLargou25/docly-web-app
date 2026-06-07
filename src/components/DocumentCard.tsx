import { Bookmark, FileText, Lock, Download } from "lucide-react";
import type { Doc } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

export function DocumentCard({ doc }: { doc: Doc }) {
  if (doc.locked) {
    return (
      <article className="rounded-xl border border-divider bg-card p-4 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <div className="h-14 w-12 rounded-md bg-amber/15 dark:bg-[rgba(245,158,11,0.15)] flex items-center justify-center shrink-0">
            <Lock className="h-5 w-5 text-amber dark:text-[#F59E0B]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-semibold leading-tight line-clamp-2 dark:text-[#F0F0F0]">{doc.title}</h3>
            <div className="text-[12px] text-muted-foreground dark:text-[#8E8E93] mt-1">{doc.author} · {doc.date} · {doc.size}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {doc.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-full bg-muted dark:bg-[#3A3A3C] text-[11px] font-medium dark:text-[#C7C7CC]">{t}</span>
          ))}
        </div>
        <div className="rounded-lg bg-amber/10 border border-amber/20 dark:bg-[rgba(245,158,11,0.08)] dark:border-none px-3 py-2.5 flex items-center justify-between gap-2">
          <span className="text-[12px] text-amber-foreground/80 dark:text-[#8E8E93]">Locked — unlock with {doc.cost} pts</span>
          <button onClick={() => toast.success(`Unlocked for ${doc.cost} pts`)} className="px-3 py-1.5 dark:px-4 rounded-full bg-amber text-amber-foreground dark:bg-[#F59E0B] dark:text-black text-[12px] font-semibold dark:font-bold">
            Unlock
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-xl border border-divider bg-card p-4 flex flex-col gap-3 hover:border-primary/30 transition">
      <div className="flex items-start gap-3">
        <div className="h-14 w-12 rounded-md bg-primary-soft flex items-center justify-center shrink-0">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold leading-tight line-clamp-2">{doc.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Avatar className="h-4 w-4"><AvatarFallback className="text-[8px] bg-muted">{doc.authorInitials}</AvatarFallback></Avatar>
            <span className="text-[12px] text-muted-foreground">{doc.author} · {doc.date} · {doc.size}</span>
          </div>
        </div>
        <button aria-label="Bookmark" className="text-muted-foreground hover:text-primary"><Bookmark className="h-4 w-4" /></button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {doc.tags.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded-full bg-primary-soft text-primary text-[11px] font-medium">{t}</span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <button onClick={() => toast(`Opening ${doc.title}`)} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-[13px] font-semibold inline-flex items-center gap-1.5">
          <Download className="h-3.5 w-3.5" /> Open PDF
        </button>
      </div>
    </article>
  );
}
