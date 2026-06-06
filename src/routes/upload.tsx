import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadCloud, FileText, Check, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { modules } from "@/lib/mock-data";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload a document \u2014 Docly" },
      { name: "description", content: "Publish course notes, summaries, or past exams on Docly and earn points by helping classmates." },
      { property: "og:title", content: "Upload a document \u2014 Docly" },
      { property: "og:description", content: "Publish course notes, summaries, or past exams on Docly and earn points by helping classmates." },
      { property: "og:url", content: "https://docly-web-app.lovable.app/upload" },
    ],
    links: [{ rel: "canonical", href: "https://docly-web-app.lovable.app/upload" }],
  }),
  component: UploadPage,
});

function UploadPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <AppLayout showRightPanel={false}>
        <div className="max-w-md mx-auto py-8 text-center">
          <div className="h-20 w-20 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto mb-4">
            <Check className="h-10 w-10" />
          </div>
          <h1 className="text-[24px] font-bold">Published!</h1>
          <p className="text-[14px] text-muted-foreground mt-1">Your document is now available to the community.</p>

          <div className="mt-6 rounded-xl bg-amber/10 border border-amber/20 p-4 flex items-center gap-3 text-start">
            <Sparkles className="h-5 w-5 text-amber" />
            <div className="flex-1">
              <div className="text-[14px] font-semibold text-amber-foreground">+15 Points earned</div>
              <div className="text-[12px] text-muted-foreground">Keep sharing to climb the leaderboard.</div>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-divider bg-card p-4 flex items-center gap-3 text-start">
            <div className="h-12 w-10 rounded-md bg-primary-soft flex items-center justify-center"><FileText className="h-5 w-5 text-primary" /></div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-semibold truncate">{file?.name || "document.pdf"}</div>
              <div className="text-[12px] text-muted-foreground">Just now</div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => navigate({ to: "/library" })}>Go to library</Button>
            <Button className="flex-1" onClick={() => { setDone(false); setStep(1); setFile(null); }}>Upload another</Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout showRightPanel={false}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[24px] font-bold">Upload document</h1>
          <div className="text-[12px] text-muted-foreground">Step {step} of 3</div>
        </div>

        <div className="flex gap-1.5 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className={cn("h-1 rounded-full flex-1", s <= step ? "bg-primary" : "bg-muted")} />
          ))}
        </div>

        {step === 1 && (
          <div>
            <label
              htmlFor="file"
              className="block rounded-2xl border-2 border-dashed border-divider hover:border-primary/40 bg-card p-10 text-center cursor-pointer transition"
            >
              <UploadCloud className="h-10 w-10 mx-auto text-primary mb-3" />
              <div className="text-[15px] font-semibold">Drag & drop your PDF here</div>
              <div className="text-[12px] text-muted-foreground mt-1">or click to browse — PDF only, max 20 MB</div>
              <input id="file" type="file" accept="application/pdf" hidden onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            </label>
            {file && (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-divider bg-card p-3">
                <div className="h-10 w-10 rounded-md bg-primary-soft flex items-center justify-center"><FileText className="h-5 w-5 text-primary" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold truncate">{file.name}</div>
                  <div className="text-[11px] text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <Button disabled={!file} onClick={() => setStep(2)}>Continue <ArrowRight className="h-4 w-4" /></Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium">Type</Label>
              <Select defaultValue="cours">
                <SelectTrigger className="h-11 rounded-full bg-input-bg border-0"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cours">Cours</SelectItem>
                  <SelectItem value="td">TD</SelectItem>
                  <SelectItem value="examen">Examen</SelectItem>
                  <SelectItem value="resume">Résumé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium">Module</Label>
              <Select defaultValue={modules[0].id}>
                <SelectTrigger className="h-11 rounded-full bg-input-bg border-0"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {modules.map((m) => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium">Field</Label>
              <Input placeholder="SMPC" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium">Semester</Label>
              <Input placeholder="S4" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium">Year</Label>
              <Input placeholder="2024-2025" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium">Professor</Label>
              <Input placeholder="Pr. El Idrissi" />
            </div>
            <div className="col-span-full flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}><ArrowLeft className="h-4 w-4" /> Back</Button>
              <Button onClick={() => setStep(3)}>Continue <ArrowRight className="h-4 w-4" /></Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium">Title</Label>
              <Input placeholder="Résumé Chimie organique — S4" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium">Description</Label>
              <Textarea placeholder="Briefly describe what this document covers…" />
            </div>
            <label className="flex items-center justify-between rounded-xl bg-card border border-divider p-4">
              <div>
                <div className="text-[14px] font-semibold">Notify followers</div>
                <div className="text-[12px] text-muted-foreground">Send a notification to your followers</div>
              </div>
              <Switch defaultChecked />
            </label>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}><ArrowLeft className="h-4 w-4" /> Back</Button>
              <Button variant="success" onClick={() => { setDone(true); toast.success("Document published — +15 pts"); }}>
                Publish
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
