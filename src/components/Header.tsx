import { LogOut, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import prancheta from "@/assets/prancheta.png";
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

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <img src={prancheta} alt="Prancheta" className="w-12 h-12" />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-10 h-10 rounded-full border-2 border-primary/50 hover:border-primary hover:bg-primary/10 transition-all"
          >
            <LogOut className="w-5 h-5 text-primary" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="w-10 h-10 hover:bg-secondary/50 transition-all"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};