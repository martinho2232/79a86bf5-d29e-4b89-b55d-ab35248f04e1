import { Search, Bell, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/logo.png";
export const Header = () => {
  return <header className="fixed top-0 left-0 right-0 h-16 bg-transparent z-50 flex items-center justify-between px-3 md:px-6">
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <img src={logo} alt="Logo" className="w-8 h-8" />
      </div>

      {/* Barra de Pesquisa */}
      <div className="flex-1 max-w-xl mx-2 md:mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Pesquisar..." className="pl-10 pr-4 md:pr-16 border-border text-foreground placeholder:text-muted-foreground bg-[#0f0c00]/0" />
          <kbd className="hidden md:inline-flex absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs border-none">⌘</span>F
          </kbd>
        </div>
      </div>

      {/* Seção Direita */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <Button variant="ghost" size="icon" className="relative hidden md:flex">
          <Mail className="w-5 h-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
        </Button>

        <div className="flex items-center gap-2 cursor-pointer hover:bg-secondary/50 rounded-lg px-2 py-1 transition-colors">
          <Avatar className="w-8 h-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-accent text-accent-foreground font-semibold">EB</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground hidden md:inline">Eugene Barkley</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:inline" />
        </div>
      </div>
    </header>;
};