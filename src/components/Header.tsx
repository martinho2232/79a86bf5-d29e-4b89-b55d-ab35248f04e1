import { Search, Bell, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/logo.png";
import { useState, useEffect } from "react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <>
    {/* Gradient overlay to fade content before it reaches header */}
    <div className={`fixed top-0 left-0 right-0 h-24 z-40 pointer-events-none transition-opacity duration-300 ${
      isScrolled ? "opacity-100" : "opacity-0"
    }`} style={{
      background: "linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)"
    }} />
    
    <header className={`fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-3 md:px-6 transition-all duration-300 ${
      isScrolled ? "backdrop-blur-lg" : ""
    }`}>
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <img src={logo} alt="Logo" className="w-8 h-8" />
      </div>

      {/* Barra de Pesquisa - Oculta no mobile */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Pesquisar..." className="pl-10 pr-16 border-border text-foreground placeholder:text-muted-foreground bg-[#0f0c00]/0" />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none h-5 select-none inline-flex items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
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

        <div className="hidden md:flex items-center gap-2 cursor-pointer hover:bg-secondary/50 rounded-lg px-2 py-1 transition-colors">
          <Avatar className="w-8 h-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-accent text-accent-foreground font-semibold">EB</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">Eugene Barkley</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  </>;
};