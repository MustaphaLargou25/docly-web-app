import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, Search } from "lucide-react";
import { Logo } from "./Logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { currentUser, notifications } from "@/lib/mock-data";
import { useLang } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function TopHeader() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="hidden md:flex fixed top-0 inset-x-0 z-20 h-16 items-center gap-4 px-5 bg-background/90 backdrop-blur border-b border-divider ps-[236px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/search", search: { q: query } as never });
        }}
        className="flex-1 max-w-[600px] mx-auto"
      >
        <div className="relative">
          <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search") + "…"}
            className="w-full h-10 ps-10 pe-4 rounded-full bg-input-bg text-[14px] placeholder:text-muted-foreground border-0"
          />
        </div>
      </form>

      <div className="flex items-center gap-2">
        <Badge className="rounded-full bg-amber/15 text-amber border-0 hover:bg-amber/20 px-3 py-1.5 text-[12px] font-semibold">
          {currentUser.points} pts
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative h-10 w-10 rounded-full flex items-center justify-center hover:bg-muted" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2 end-2 h-2 w-2 rounded-full bg-primary" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[340px] p-0">
            <div className="px-4 py-3 border-b border-divider font-semibold text-[14px]">{t("notifications")}</div>
            <div className="max-h-[360px] overflow-y-auto">
              {notifications.map((n) => (
                <Link key={n.id} to="/notifications" className="flex items-start gap-3 px-4 py-3 hover:bg-muted">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">{n.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px]"><span className="font-semibold">{n.who}</span> {n.action}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{n.time}</div>
                  </div>
                  {n.unread && <span className="h-2 w-2 rounded-full bg-primary mt-2" />}
                </Link>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-10 w-10 rounded-full overflow-hidden" aria-label="Profile menu">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">{currentUser.initials}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-2">
              <div className="text-[13px] font-semibold">{currentUser.name}</div>
              <div className="text-[11px] text-muted-foreground">{currentUser.email}</div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link to="/profile">{t("profile")}</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link to="/settings">{t("settings")}</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link to="/signin" className="text-destructive">{t("logOut")}</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
