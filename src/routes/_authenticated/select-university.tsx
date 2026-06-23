import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/select-university")({
  head: () => ({
    meta: [
      { title: "Select your university — Docly" },
      { name: "description", content: "Tell us where you study so we can tailor Docly to your courses." },
    ],
  }),
  component: SelectUniversityPage,
});

const UNIVERSITIES = [
  "Université Mohammed V — Rabat",
  "Université Hassan II — Casablanca",
  "Université Cadi Ayyad — Marrakech",
  "Université Sidi Mohamed Ben Abdellah — Fès",
  "Université Ibn Tofail — Kénitra",
  "Université Mohammed Premier — Oujda",
  "Université Abdelmalek Essaâdi — Tétouan",
  "Université Ibn Zohr — Agadir",
  "Université Moulay Ismaïl — Meknès",
  "Université Chouaib Doukkali — El Jadida",
  "Université Internationale de Rabat (UIR)",
  "Al Akhawayn University — Ifrane",
  "Other",
];

function SelectUniversityPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [customUniversity, setCustomUniversity] = useState("");
  const [program, setProgram] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const user = data.user;
      if (!user) return;
      setUserId(user.id);
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name, university, program")
        .eq("id", user.id)
        .maybeSingle();
      const fallbackName =
        (user.user_metadata?.display_name as string | undefined) ??
        (user.user_metadata?.full_name as string | undefined) ??
        (user.email ? user.email.split("@")[0] : "");
      setName(profile?.display_name ?? fallbackName ?? "");
      if (profile?.university) setUniversity(profile.university);
      if (profile?.program) setProgram(profile.program);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    const finalUniversity = university === "Other" ? customUniversity.trim() : university;
    if (!finalUniversity) return toast.error("Please pick your university");
    if (!name.trim()) return toast.error("Please enter your name");
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        display_name: name.trim(),
        university: finalUniversity,
        program: program.trim() || null,
      });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Profile saved");
    navigate({ to: "/profile" });
  }

  return (
    <div className="min-h-screen flex flex-col md:items-center md:justify-center bg-background px-5 py-8">
      <div className="w-full md:max-w-[480px] md:bg-card md:border md:border-divider md:rounded-2xl md:p-8">
        <div className="flex flex-col items-center mb-6 text-center">
          <Logo size={40} />
          <div className="h-12 w-12 rounded-2xl docly-gradient flex items-center justify-center text-white mt-4">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h1 className="text-[22px] font-bold mt-3">Tell us about your studies</h1>
          <p className="text-[13px] text-muted-foreground mt-1">
            We'll personalize your courses and feed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-[12px] font-medium">Full name</Label>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="university" className="text-[12px] font-medium">University</Label>
            <select
              id="university"
              required
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="" disabled>Select your university</option>
              {UNIVERSITIES.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          {university === "Other" && (
            <div className="space-y-1.5">
              <Label htmlFor="customUniversity" className="text-[12px] font-medium">University name</Label>
              <Input
                id="customUniversity"
                required
                value={customUniversity}
                onChange={(e) => setCustomUniversity(e.target.value)}
                placeholder="Type your university"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="program" className="text-[12px] font-medium">Program / Year (optional)</Label>
            <Input id="program" value={program} onChange={(e) => setProgram(e.target.value)} placeholder="e.g. SMPC — S4 Chimie" />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Saving..." : "Save and continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}
