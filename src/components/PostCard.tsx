import { Heart, MessageSquare, Eye, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PostCardProps {
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  category: string;
  time: string;
  tags: string[];
  title: string;
  preview: string;
  upvotes: string;
  downvotes: string;
  comments: string;
  views: string;
}

export const PostCard = ({ author, category, time, tags, title, preview, upvotes, downvotes, comments, views }: PostCardProps) => {
  return (
    <div className="card-gradient border border-border hover:border-border/50 backdrop-blur-sm rounded-lg p-4 space-y-3 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author.username}`} alt={author.name} />
            <AvatarFallback className="bg-purple-500 text-white font-semibold">
              {author.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{author.name}</span>
              <span className="text-sm text-muted-foreground">{author.username}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{category}</span>
              <span>•</span>
              <span>{time}</span>
              <Badge variant="secondary" className="ml-1 text-xs">Discussão</Badge>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-secondary rounded text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
        <p className="text-foreground/80 text-sm line-clamp-2">{preview}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 hover:text-accent cursor-pointer transition-colors">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">{upvotes}</span>
          </div>
          <div className="flex items-center gap-2 hover:text-accent cursor-pointer transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium">{comments}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium">{views}</span>
        </div>
      </div>
    </div>
  );
};
