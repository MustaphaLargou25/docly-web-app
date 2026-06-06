import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { contacts, chatMessages } from "@/lib/mock-data";
import { ArrowLeft, ArrowUp, Paperclip, Smile } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/messages/$chatId")({
  head: ({ params }) => {
    const contact = contacts.find((c) => c.id === params.chatId);
    const name = contact?.name ?? "Chat";
    const title = `Chat with ${name} — Docly`;
    const description = `Private conversation with ${name} on Docly — share course notes, ask questions, and collaborate.`;
    const url = `https://docly-web-app.lovable.app/messages/${params.chatId}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ChatPage,
});

function ChatPage() {
  const { chatId } = Route.useParams();
  const contact = contacts.find((c) => c.id === chatId) ?? contacts[0];
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState(chatMessages[chatId] ?? []);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMsgs((m) => [...m, { id: Date.now().toString(), from: "me", text, time: "now" }]);
    setText("");
  };

  return (
    <AppLayout showRightPanel={false}>
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-4 -mx-4 md:-mx-6 -my-4 md:-my-6 lg:m-0">
        {/* Desktop contacts column */}
        <div className="hidden lg:block w-[300px] border border-divider rounded-xl overflow-hidden bg-card">
          <div className="p-4 font-semibold text-[14px] border-b border-divider">Messages</div>
          {contacts.map((c) => (
            <Link key={c.id} to="/messages/$chatId" params={{ chatId: c.id }} className={cn("flex items-center gap-3 p-3 hover:bg-muted border-b border-divider", c.id === chatId && "bg-primary-soft")}>
              <Avatar className="h-9 w-9"><AvatarFallback className="bg-primary text-primary-foreground text-xs">{c.initials}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold truncate">{c.name}</div>
                <div className="text-[11px] text-muted-foreground truncate">{c.last}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Conversation */}
        <div className="flex-1 flex flex-col h-[calc(100dvh-4rem-5rem)] md:h-[calc(100dvh-4rem)] bg-card lg:rounded-xl lg:border lg:border-divider overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-divider">
            <Link to="/messages" className="lg:hidden h-9 w-9 rounded-full hover:bg-muted flex items-center justify-center">
              <ArrowLeft className="h-5 w-5 flip-rtl" />
            </Link>
            <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary text-primary-foreground text-xs">{contact.initials}</AvatarFallback></Avatar>
            <div className="min-w-0">
              <div className="text-[14px] font-semibold truncate">{contact.name}</div>
              <div className="text-[11px] text-muted-foreground">Active now</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin">
            {msgs.map((m) => (
              <div key={m.id} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[75%] px-4 py-2 rounded-2xl text-[14px]", m.from === "me" ? "bg-primary text-primary-foreground rounded-ee-md" : "bg-muted text-foreground rounded-es-md")}>
                  {m.text}
                  <div className="text-[10px] mt-0.5 opacity-70">{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={send} className="flex items-center gap-2 p-3 border-t border-divider">
            <button type="button" className="h-10 w-10 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground"><Smile className="h-5 w-5" /></button>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message…" className="flex-1 h-11 px-4 rounded-full bg-input-bg text-[14px] placeholder:text-muted-foreground border-0" />
            <button type="button" className="h-10 w-10 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground"><Paperclip className="h-5 w-5" /></button>
            <button type="submit" className="h-11 w-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center"><ArrowUp className="h-5 w-5" /></button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
