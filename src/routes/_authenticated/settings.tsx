import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useLang, type Lang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { Moon, Sun, Mail, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";


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
  const [email, setEmail] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
      setConfirmed(!!data.user?.email_confirmed_at);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user?.email ?? null);
      setConfirmed(!!session?.user?.email_confirmed_at);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <AppLayout>
      <h1 className="text-[24px] font-bold mb-5">{t("settings")}</h1>

      {confirmed === false && (
        <section className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-5 mb-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h2 className="text-[15px] font-semibold text-amber-900 dark:text-amber-100">Email not verified</h2>
            <p className="text-[13px] text-amber-800/80 dark:text-amber-200/80 mt-1">
              {email ? `We sent a confirmation link to ${email}.` : "Confirm your email to keep full access to your account."}
            </p>
            <Button asChild variant="secondary" size="sm" className="mt-3">
              <Link to="/verify-email">Resend or verify email</Link>
            </Button>
          </div>
        </section>
      )}

      {confirmed === true && email && (
        <section className="rounded-xl border border-divider bg-card p-5 mb-4 flex items-center gap-3">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <div>
            <h2 className="text-[15px] font-semibold">Email verified</h2>
            <p className="text-[13px] text-muted-foreground mt-0.5">{email}</p>
          </div>
        </section>
      )}

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
