import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { contacts } from "@/lib/mock-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Messages \u2014 Docly" },
      { name: "description", content: "Chat directly with classmates and study partners on Docly." },
      { property: "og:title", content: "Messages \u2014 Docly" },
      { property: "og:description", content: "Chat directly with classmates and study partners on Docly." },
      { property: "og:url", content: "https://docly-web-app.lovable.app/messages" },
    ],
    links: [{ rel: "canonical", href: "https://docly-web-app.lovable.app/messages" }],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  const navigate = useNavigate();
  return (
    <AppLayout showRightPanel={false}>
      <h1 className="text-[24px] font-bold mb-4">Messages</h1>
      <div className="relative mb-4">
        <Search className="absolute start-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input placeholder="Search conversations…" className="w-full h-11 ps-11 pe-4 rounded-full bg-input-bg text-[14px] placeholder:text-muted-foreground border-0" />
      </div>

      <div className="rounded-xl border border-divider bg-card divide-y divide-divider overflow-hidden">
        {contacts.map((c) => (
          <Link
            key={c.id}
            to="/messages/$chatId"
            params={{ chatId: c.id }}
            className="flex items-center gap-3 p-4 hover:bg-muted"
          >
            <Avatar className="h-11 w-11"><AvatarFallback className="bg-primary text-primary-foreground font-semibold">{c.initials}</AvatarFallback></Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="text-[14px] font-semibold truncate">{c.name}</div>
                <div className="text-[11px] text-muted-foreground">{c.time}</div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="text-[12px] text-muted-foreground truncate">{c.last}</div>
                {c.unread > 0 && <span className="h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">{c.unread}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
