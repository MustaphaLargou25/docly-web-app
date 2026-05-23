import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GraduationCap, TrendingUp, Search as SearchIcon, Users, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

const slides = [
  { icon: GraduationCap, title: "Welcome to Docly", text: "Built by students, for students. Find everything you need to succeed." },
  { icon: TrendingUp, title: "Earn Points for Every Upload", text: "Share your notes and exams. The community rewards you for helping others." },
  { icon: SearchIcon, title: "Find Any Course Material", text: "Browse thousands of documents from your university and beyond." },
  { icon: Users, title: "Join the Community", text: "Ask questions, share answers, and learn together." },
];

function OnboardingPage() {
  const [i, setI] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // mark as seen when reaching here
  }, []);

  const finish = () => {
    if (typeof localStorage !== "undefined") localStorage.setItem("docly-onboarded", "1");
    navigate({ to: "/signin" });
  };

  const Slide = slides[i];
  const Icon = Slide.icon;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex items-center justify-between px-5 py-4">
        <Logo size={28} withWordmark />
        <button onClick={finish} className="text-[13px] font-semibold text-muted-foreground">Skip</button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-md mx-auto">
        <div className="h-28 w-28 rounded-3xl docly-gradient flex items-center justify-center text-white mb-8 shadow-lg shadow-primary/20">
          <Icon className="h-12 w-12" />
        </div>
        <h1 className="text-[26px] font-bold leading-tight mb-3">{Slide.title}</h1>
        <p className="text-[15px] text-muted-foreground leading-relaxed">{Slide.text}</p>
      </div>

      <div className="px-6 pb-8 max-w-md mx-auto w-full">
        <div className="flex justify-center gap-1.5 mb-6">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={cn("h-1.5 rounded-full transition-all", idx === i ? "w-6 bg-primary" : "w-1.5 bg-muted")}
            />
          ))}
        </div>
        <Button
          className="w-full"
          size="lg"
          onClick={() => (i < slides.length - 1 ? setI(i + 1) : finish())}
        >
          {i < slides.length - 1 ? "Next" : "Get started"} <ArrowRight className="h-4 w-4" />
        </Button>
        <p className="text-center text-[13px] text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary font-semibold">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
