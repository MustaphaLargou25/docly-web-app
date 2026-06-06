import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { notifications } from "@/lib/mock-data";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications \u2014 Docly" },
      { name: "description", content: "Latest activity on your Docly account: follows, comments, downloads, and points earned." },
      { property: "og:title", content: "Notifications \u2014 Docly" },
      { property: "og:description", content: "Latest activity on your Docly account: follows, comments, downloads, and points earned." },
      { property: "og:url", content: "https://docly-web-app.lovable.app/notifications" },
    ],
    links: [{ rel: "canonical", href: "https://docly-web-app.lovable.app/notifications" }],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  return (
    <AppLayout>
      <h1 className="text-[24px] font-bold mb-5">Notifications</h1>
      <div className="rounded-xl border border-divider bg-card divide-y divide-divider overflow-hidden">
        {notifications.map((n) => (
          <div key={n.id} className="flex items-start gap-3 p-4 hover:bg-muted">
            <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary text-primary-foreground text-xs">{n.initials}</AvatarFallback></Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-[14px]"><span className="font-semibold">{n.who}</span> {n.action}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{n.time}</div>
            </div>
            {n.unread && <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />}
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
