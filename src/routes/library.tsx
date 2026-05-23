import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { DocumentCard } from "@/components/DocumentCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { documents, currentUser } from "@/lib/mock-data";

export const Route = createFileRoute("/library")({
  component: LibraryPage,
});

function LibraryPage() {
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-[24px] font-bold">My Library</h1>
        <span className="px-3 py-1.5 rounded-full bg-amber/15 text-amber text-[12px] font-semibold">{currentUser.points} pts</span>
      </div>

      <Tabs defaultValue="downloads" className="w-full">
        <TabsList className="bg-muted/60 p-1 rounded-full h-auto mb-5">
          <TabsTrigger value="downloads" className="rounded-full px-5 py-1.5 text-[13px] data-[state=active]:bg-background">Downloads</TabsTrigger>
          <TabsTrigger value="uploads" className="rounded-full px-5 py-1.5 text-[13px] data-[state=active]:bg-background">Uploads</TabsTrigger>
          <TabsTrigger value="saved" className="rounded-full px-5 py-1.5 text-[13px] data-[state=active]:bg-background">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="downloads" className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {documents.filter((d) => !d.locked).slice(0, 4).map((d) => <DocumentCard key={d.id} doc={d} />)}
        </TabsContent>
        <TabsContent value="uploads" className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {documents.slice(0, 3).map((d) => <DocumentCard key={d.id} doc={d} />)}
        </TabsContent>
        <TabsContent value="saved" className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {documents.slice(2, 5).map((d) => <DocumentCard key={d.id} doc={d} />)}
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
