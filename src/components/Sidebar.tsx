import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookMarked, Users, User, Settings, MessageCircle, Plus, LogOut } from "lucide-react";
import { Logo } from "./Logo";
import { useLang } from "@/lib/i18n";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentProfile } from "@/lib/use-current-profile";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { t } = useLang();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const profile = useCurrentProfile();

  const items = [
    { to: "/", label: t("home"), icon: Home, exact: true },
    { to: "/library", label: t("library"), icon: BookMarked },
    { to: "/community", label: t("community"), icon: Users },
    { to: "/messages", label: t("messages"), icon: MessageCircle },
    { to: "/profile", label: t("profile"), icon: User },
    { to: "/settings", label: t("settings"), icon: Settings },
  ];

  const isActive = (to: string, exact?: boolean) =>
    exact ? path === to : path === to || path.startsWith(to + "/");

  return (
    <aside className="hidden md:flex fixed inset-y-0 start-0 w-[220px] flex-col border-e border-divider bg-sidebar z-30">
      <div className="px-5 pt-5 pb-4">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={28} withWordmark />
        </Link>
      </div>

      <nav className="flex-1 px-2 space-y-1 overflow-y-auto scrollbar-thin">
        {items.map(({ to, label, icon: Icon, exact }) => {
          const active = isActive(to, exact);
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors",
                active
                  ? "text-primary bg-primary-soft"
                  : "text-sidebar-foreground hover:bg-muted",
              )}
            >
              {active && (
                <span className="absolute start-0 top-2 bottom-2 w-[3px] rounded-full bg-primary" />
              )}
              <Icon className="h-[18px] w-[18px]" />
              <span>{label}</span>
            </Link>
          );
        })}

        <Link
          to="/upload"
          className="mt-4 flex items-center justify-center gap-2 mx-1 px-3 py-2.5 rounded-full bg-primary text-primary-foreground text-[14px] font-semibold hover:opacity-90 transition"
        >
          <Plus className="h-4 w-4" />
          <span>{t("upload")}</span>
        </Link>
      </nav>

      <div className="p-3 border-t border-divider">
        <Link to="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
              {profile.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold truncate">{profile.displayName || "—"}</div>
            <div className="text-[11px] text-muted-foreground truncate">
              {profile.program || profile.university || profile.email}
            </div>
          </div>
          <LogOut className="h-4 w-4 text-muted-foreground" />
        </Link>
      </div>
    </aside>
  );
}
