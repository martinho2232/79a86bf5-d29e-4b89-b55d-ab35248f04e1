import { Image, Video, BarChart3, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export const PostCreator = () => {
  return <div className="card-gradient border border-border backdrop-blur-sm rounded-lg p-3 md:p-4 mt-4">
      <div className="flex gap-2 md:gap-3 mt-4">
        <Avatar className="w-9 h-9 md:w-10 md:h-10 shrink-0">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=EB" alt="Profile" />
          <AvatarFallback className="bg-accent text-accent-foreground font-semibold text-sm">
            EB
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2 md:space-y-3">
          <Input placeholder="Compartilhe algo hoje..." className="bg-input border-border text-foreground placeholder:text-muted-foreground h-10 md:h-12 text-sm" />
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1 md:gap-2">
              <Button variant="outline" size="sm" className="gap-1 md:gap-2 border-border h-9 px-2 md:px-3">
                <Image className="w-4 h-4" />
                <span className="hidden sm:inline text-xs md:text-sm">Imagem</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1 md:gap-2 border-border h-9 px-2 md:px-3">
                <Video className="w-4 h-4" />
                <span className="hidden sm:inline text-xs md:text-sm">Vídeo</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1 md:gap-2 border-border h-9 px-2 md:px-3 hidden md:flex">
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs md:text-sm">Enquete</span>
              </Button>
            </div>
            <Button size="icon" className="bg-accent text-accent-foreground hover:bg-accent/90 h-9 w-9 shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>;
};