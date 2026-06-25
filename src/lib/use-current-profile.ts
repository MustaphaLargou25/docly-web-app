import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type CurrentProfile = {
  displayName: string;
  email: string;
  program: string;
  university: string;
  initials: string;
};

function makeInitials(name: string, email: string) {
  const src = (name || email || "").trim();
  if (!src) return "U";
  const parts = src.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return src.slice(0, 2).toUpperCase();
}

export function useCurrentProfile(): CurrentProfile {
  const [state, setState] = useState<CurrentProfile>({
    displayName: "",
    email: "",
    program: "",
    university: "",
    initials: "U",
  });

  useEffect(() => {
    let cancelled = false;

    async function load(userId: string, email: string | null, metaName?: string | null) {
      const { data } = await supabase
        .from("profiles")
        .select("display_name, university, program")
        .eq("id", userId)
        .maybeSingle();
      if (cancelled) return;
      const name =
        data?.display_name ||
        metaName ||
        (email ? email.split("@")[0] : "") ||
        "";
      setState({
        displayName: name,
        email: email ?? "",
        program: data?.program ?? "",
        university: data?.university ?? "",
        initials: makeInitials(name, email ?? ""),
      });
    }

    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      if (!u) return;
      const metaName =
        (u.user_metadata?.display_name as string | undefined) ??
        (u.user_metadata?.full_name as string | undefined) ??
        null;
      load(u.id, u.email ?? null, metaName);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user;
      if (!u) {
        setState({ displayName: "", email: "", program: "", university: "", initials: "U" });
        return;
      }
      const metaName =
        (u.user_metadata?.display_name as string | undefined) ??
        (u.user_metadata?.full_name as string | undefined) ??
        null;
      load(u.id, u.email ?? null, metaName);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
