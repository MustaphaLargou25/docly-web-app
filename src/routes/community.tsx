import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { PostCard, QuestionCard } from "@/components/PostCards";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { posts, questions } from "@/lib/mock-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community feed \u2014 Docly" },
      { name: "description", content: "Browse student posts, ask questions, and join discussions in the Docly community feed." },
      { property: "og:title", content: "Community feed \u2014 Docly" },
      { property: "og:description", content: "Browse student posts, ask questions, and join discussions in the Docly community feed." },
      { property: "og:url", content: "https://docly-web-app.lovable.app/community" },
    ],
    links: [{ rel: "canonical", href: "https://docly-web-app.lovable.app/community" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map((q) => ({
          "@type": "Question",
          name: q.title,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${q.answers} answers from the Docly student community.`,
          },
        })),
      }),
    }],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-[24px] font-bold">Community</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="hidden md:inline-flex"><Plus className="h-4 w-4" /> New Post</Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <DialogHeader><DialogTitle>New Post</DialogTitle></DialogHeader>
            <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What's on your mind?" rows={5} />
            <Button onClick={() => { toast.success("Posted"); setOpen(false); setText(""); }}>Publish</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="bg-muted/60 p-1 rounded-full h-auto mb-5">
          <TabsTrigger value="feed" className="rounded-full px-5 py-1.5 text-[13px] data-[state=active]:bg-background">Feed</TabsTrigger>
          <TabsTrigger value="questions" className="rounded-full px-5 py-1.5 text-[13px] data-[state=active]:bg-background">Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-3">
          {posts.map((p) => <PostCard key={p.id} post={p} />)}
        </TabsContent>
        <TabsContent value="questions" className="space-y-3">
          {questions.map((q) => <QuestionCard key={q.id} question={q} />)}
        </TabsContent>
      </Tabs>

      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed bottom-20 end-5 z-30 h-14 w-14 rounded-full docly-gradient text-white shadow-lg shadow-primary/30 flex items-center justify-center"
        aria-label="New post"
      >
        <Plus className="h-6 w-6" />
      </button>
    </AppLayout>
  );
}
