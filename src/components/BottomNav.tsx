import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookMarked, Users, User } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const { t } = useLang();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const items = [
    { to: "/", label: t("home"), icon: Home, exact: true },
    { to: "/library", label: t("library"), icon: BookMarked },
    { to: "/community", label: t("community"), icon: Users },
    { to: "/profile", label: t("profile"), icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-divider">
      <ul className="grid grid-cols-4 h-16">
        {items.map(({ to, label, icon: Icon, exact }) => {
          const active = exact ? path === to : path === to || path.startsWith(to + "/");
          return (
            <li key={to} className="flex">
              <Link
                to={to}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center gap-1 text-[11px] transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
