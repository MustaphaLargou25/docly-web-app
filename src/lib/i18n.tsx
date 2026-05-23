import * as React from "react";

export type Lang = "en" | "fr" | "ar";

const dict = {
  en: {
    home: "Home",
    library: "Library",
    community: "Community",
    profile: "Profile",
    search: "Search",
    settings: "Settings",
    notifications: "Notifications",
    messages: "Messages",
    upload: "Upload",
    greeting: "Hi",
    browseModules: "Browse Modules",
    downloads: "Downloads",
    uploads: "Uploads",
    saved: "Saved",
    feed: "Feed",
    questions: "Questions",
    newPost: "New Post",
    signIn: "Sign In",
    createAccount: "Create Account",
    logOut: "Log out",
    editProfile: "Edit Profile",
    helpSupport: "Help & Support",
    language: "Language",
    appearance: "Appearance",
    light: "Light",
    dark: "Dark",
    follow: "Follow",
    message: "Message",
    shared: "Shared",
    about: "About",
    openPdf: "Open PDF",
    unlock: "Unlock with points",
  },
  fr: {
    home: "Accueil",
    library: "Bibliothèque",
    community: "Communauté",
    profile: "Profil",
    search: "Rechercher",
    settings: "Paramètres",
    notifications: "Notifications",
    messages: "Messages",
    upload: "Téléverser",
    greeting: "Salut",
    browseModules: "Parcourir les modules",
    downloads: "Téléchargements",
    uploads: "Mes dépôts",
    saved: "Enregistrés",
    feed: "Fil",
    questions: "Questions",
    newPost: "Nouveau post",
    signIn: "Se connecter",
    createAccount: "Créer un compte",
    logOut: "Déconnexion",
    editProfile: "Modifier le profil",
    helpSupport: "Aide & support",
    language: "Langue",
    appearance: "Apparence",
    light: "Clair",
    dark: "Sombre",
    follow: "Suivre",
    message: "Message",
    shared: "Partagés",
    about: "À propos",
    openPdf: "Ouvrir le PDF",
    unlock: "Débloquer avec des points",
  },
  ar: {
    home: "الرئيسية",
    library: "المكتبة",
    community: "المجتمع",
    profile: "الملف الشخصي",
    search: "بحث",
    settings: "الإعدادات",
    notifications: "الإشعارات",
    messages: "الرسائل",
    upload: "رفع",
    greeting: "مرحباً",
    browseModules: "تصفح الوحدات",
    downloads: "التنزيلات",
    uploads: "المرفوعات",
    saved: "المحفوظات",
    feed: "المنشورات",
    questions: "الأسئلة",
    newPost: "منشور جديد",
    signIn: "تسجيل الدخول",
    createAccount: "إنشاء حساب",
    logOut: "تسجيل الخروج",
    editProfile: "تعديل الملف",
    helpSupport: "المساعدة والدعم",
    language: "اللغة",
    appearance: "المظهر",
    light: "فاتح",
    dark: "داكن",
    follow: "متابعة",
    message: "رسالة",
    shared: "المشاركات",
    about: "نبذة",
    openPdf: "فتح الملف",
    unlock: "افتح بالنقاط",
  },
} as const;

type Key = keyof typeof dict.en;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string };
const LangContext = React.createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("en");

  React.useEffect(() => {
    const stored = (typeof localStorage !== "undefined" && (localStorage.getItem("docly-lang") as Lang | null)) || "en";
    setLangState(stored);
    document.documentElement.lang = stored;
    document.documentElement.dir = stored === "ar" ? "rtl" : "ltr";
  }, []);

  const setLang = React.useCallback((l: Lang) => {
    setLangState(l);
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
      document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    }
    if (typeof localStorage !== "undefined") localStorage.setItem("docly-lang", l);
  }, []);

  const t = React.useCallback((k: Key) => (dict[lang] as Record<string, string>)[k] ?? (dict.en as Record<string, string>)[k], [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = React.useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
