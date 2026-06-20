import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLang, type Lang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { Moon, Sun } from "lucide-react";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [
      { title: "Settings \u2014 Docly" },
      { name: "description", content: "Manage your Docly preferences: language (EN, FR, AR), theme, and notification settings." },
      { property: "og:title", content: "Settings \u2014 Docly" },
      { property: "og:description", content: "Manage your Docly preferences: language (EN, FR, AR), theme, and notification settings." },
      { property: "og:url", content: "https://docly-web-app.lovable.app/settings" },
    ],
    links: [{ rel: "canonical", href: "https://docly-web-app.lovable.app/settings" }],
  }),
  component: SettingsPage,
});

const languages: { code: Lang; flag: string; label: string }[] = [
  { code: "ar", flag: "🇲🇦", label: "Arabic — العربية" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "en", flag: "🇺🇸", label: "English" },
];

function SettingsPage() {
  const { t, lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();

  return (
    <AppLayout>
      <h1 className="text-[24px] font-bold mb-5">{t("settings")}</h1>

      <section className="rounded-xl border border-divider bg-card p-5 mb-4">
        <h2 className="text-[15px] font-semibold mb-3">{t("language")}</h2>
        <RadioGroup value={lang} onValueChange={(v) => setLang(v as Lang)} className="space-y-2">
          {languages.map((l) => (
            <Label key={l.code} htmlFor={l.code} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted cursor-pointer">
              <span className="text-2xl">{l.flag}</span>
              <span className="flex-1 text-[14px] font-medium">{l.label}</span>
              <RadioGroupItem value={l.code} id={l.code} />
            </Label>
          ))}
        </RadioGroup>
      </section>

      <section className="rounded-xl border border-divider bg-card p-5">
        <h2 className="text-[15px] font-semibold mb-3">{t("appearance")}</h2>
        <div className="flex items-center justify-between p-3 rounded-xl">
          <div className="flex items-center gap-3">
            {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="text-[14px] font-medium">{theme === "dark" ? t("dark") : t("light")} mode</span>
          </div>
          <Switch checked={theme === "dark"} onCheckedChange={(v) => setTheme(v ? "dark" : "light")} />
        </div>
      </section>
    </AppLayout>
  );
}
