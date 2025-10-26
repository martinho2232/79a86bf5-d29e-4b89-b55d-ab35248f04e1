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

      </div>
    </header>
  );
};