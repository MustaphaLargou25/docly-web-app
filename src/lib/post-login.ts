import { supabase } from "@/integrations/supabase/client";

/**
 * Returns the route the user should land on right after auth:
 * - "/verify-email" if their email isn't confirmed
 * - "/select-university" if their profile has no university set
 * - "/profile" otherwise
 */
export async function getPostAuthRoute(): Promise<"/verify-email" | "/select-university" | "/profile"> {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return "/profile";
  if (!user.email_confirmed_at) return "/verify-email";

  const { data: profile } = await supabase
    .from("profiles")
    .select("university")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.university) return "/select-university";
  return "/profile";
}
