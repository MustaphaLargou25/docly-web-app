import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DocumentCard } from "@/components/DocumentCard";
import { PostCard } from "@/components/PostCards";
import { documents, posts, topContributors, currentUser } from "@/lib/mock-data";
import { ExternalLink, Mail, MapPin, GraduationCap, Calendar } from "lucide-react";

export const Route = createFileRoute("/profile/$userId")({
  head: ({ params }) => {
    const user = topContributors.find((u) => u.id === params.userId) ?? { id: params.userId, name: "Student", initials: "S", points: 0 };
    const title = `${user.name} \u2014 Docly profile`;
    const desc = `${user.name} on Docly: ${user.points} points, contributing course notes and answers to the student community.`;
    const url = `https://docly-web-app.lovable.app/profile/${params.userId}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "profile" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            name: user.name,
            description: currentUser.bio,
            affiliation: { "@type": "EducationalOrganization", name: currentUser.university },
            url,
          },
        }),
      }],
    };
  },
  component: PublicProfilePage,
});

function PublicProfilePage() {
  const { userId } = Route.useParams();
  const user = topContributors.find((u) => u.id === userId) ?? { id: userId, name: "Student", initials: "S", points: 0 };

  return (
    <AppLayout showRightPanel={false}>
      <div className="-mx-4 md:-mx-6 -mt-4 md:-mt-6">
        <div className="h-40 md:h-48 docly-gradient relative">
          <div className="absolute -bottom-12 start-5">
            <Avatar className="h-24 w-24 ring-4 ring-background">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">{user.initials}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="pt-16 px-5 pb-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-[22px] font-bold">{user.name}</h1>
              <p className="text-[13px] text-muted-foreground">{currentUser.program}</p>
            </div>
            <div className="flex gap-2">
              <Button>Follow</Button>
              <Button variant="outline" asChild><Link to="/messages">Message</Link></Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 mt-4 text-[13px]">
            <div><span className="font-bold">{user.points}</span> <span className="text-muted-foreground">points</span></div>
            <div><span className="font-bold">{currentUser.followers}</span> <span className="text-muted-foreground">followers</span></div>
            <div><span className="font-bold">{currentUser.following}</span> <span className="text-muted-foreground">following</span></div>
            <span className="px-3 py-1 rounded-full bg-amber/15 text-amber text-[11px] font-semibold ms-auto">#{topContributors.findIndex((c) => c.id === user.id) + 1 || 1} ranked</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="shared" className="mt-2">
        <TabsList className="bg-muted/60 p-1 rounded-full h-auto mb-5">
          <TabsTrigger value="shared" className="rounded-full px-5 py-1.5 text-[13px] data-[state=active]:bg-background">Shared</TabsTrigger>
          <TabsTrigger value="feed" className="rounded-full px-5 py-1.5 text-[13px] data-[state=active]:bg-background">Feed</TabsTrigger>
          <TabsTrigger value="about" className="rounded-full px-5 py-1.5 text-[13px] data-[state=active]:bg-background">About</TabsTrigger>
        </TabsList>
        <TabsContent value="shared" className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {documents.slice(0, 4).map((d) => <DocumentCard key={d.id} doc={d} />)}
        </TabsContent>
        <TabsContent value="feed" className="space-y-3">
          {posts.slice(0, 2).map((p) => <PostCard key={p.id} post={p} />)}
        </TabsContent>
        <TabsContent value="about">
          <div className="rounded-xl border border-divider bg-card p-5">
            <p className="text-[14px] leading-relaxed">{currentUser.bio}</p>
            <div className="mt-4 space-y-2 text-[13px]">
              <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-muted-foreground" /> {currentUser.program}</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /> {currentUser.university}</div>
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /> Joined {currentUser.joined}</div>
              <Button variant="outline" size="sm" asChild className="mt-1"><Link to="/messages"><Mail className="h-4 w-4 me-2" /> Send message</Link></Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(currentUser.socials).map(([k, v]) => (
                <a key={k} href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-[12px] font-medium hover:bg-primary-soft hover:text-primary">
                  {k}: {v} <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
