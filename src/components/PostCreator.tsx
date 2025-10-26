import { Image, Video, BarChart3, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const PostCreator = () => {
  return (
    <div className="card-gradient border border-border backdrop-blur-sm rounded-lg p-4 mt-4">
      <div className="flex gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=EB" alt="Profile" />
          <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
            EB
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          <Input
            placeholder="Compartilhe algo hoje..."
            className="bg-input border-border text-foreground placeholder:text-muted-foreground h-12"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2 border-border">
                <Image className="w-4 h-4" />
                Imagem
              </Button>
              <Button variant="outline" size="sm" className="gap-2 border-border">
                <Video className="w-4 h-4" />
                Vídeo
              </Button>
              <Button variant="outline" size="sm" className="gap-2 border-border">
                <BarChart3 className="w-4 h-4" />
                Enquete
              </Button>
            </div>
            <Button size="icon" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
