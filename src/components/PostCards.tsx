import { Heart, MessageSquare, Share2, ArrowBigUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function PostCard({ post }: { post: { id: string; author: string; initials: string; time: string; content: string; likes: number; comments: number } }) {
  return (
    <article className="rounded-xl border border-divider bg-card p-4">
      <header className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">{post.initials}</AvatarFallback></Avatar>
        <div>
          <div className="text-[14px] font-semibold">{post.author}</div>
          <div className="text-[11px] text-muted-foreground">{post.time}</div>
        </div>
      </header>
      <p className="text-[14px] leading-relaxed mb-3">{post.content}</p>
      <div className="flex items-center gap-4 text-muted-foreground">
        <button aria-label={`Like post (${post.likes} likes)`} className="inline-flex items-center gap-1.5 text-[12px] hover:text-primary"><Heart className="h-4 w-4" /> {post.likes}</button>
        <button aria-label={`Comment on post (${post.comments} comments)`} className="inline-flex items-center gap-1.5 text-[12px] hover:text-primary"><MessageSquare className="h-4 w-4" /> {post.comments}</button>
        <button aria-label="Share post" className="inline-flex items-center gap-1.5 text-[12px] hover:text-primary ms-auto"><Share2 className="h-4 w-4" /></button>
      </div>
    </article>
  );
}

export function QuestionCard({ question }: { question: { id: string; title: string; tags: string[]; votes: number; answers: number } }) {
  return (
    <article className="rounded-xl border border-divider bg-card p-4 flex gap-4">
      <div className="flex flex-col items-center gap-1 text-center shrink-0 w-12">
        <ArrowBigUp className="h-5 w-5 text-primary" />
        <span className="text-[14px] font-bold">{question.votes}</span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">votes</span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-[15px] font-semibold leading-snug">{question.title}</h3>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {question.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-full bg-primary-soft text-primary text-[11px] font-medium">{t}</span>
          ))}
        </div>
        <div className="text-[12px] text-muted-foreground mt-2">{question.answers} answers</div>
      </div>
    </article>
  );
}
