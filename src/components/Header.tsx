import { LogOut, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import prancheta from "@/assets/prancheta.png";
import { useState, useEffect } from "react";

export const Header = () => {
  const navigate = useNavigate();

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
          <button
            onClick={() => navigate('/settings')}
            className="w-10 h-10 rounded-full border-2 border-primary/50 hover:border-primary transition-all cursor-pointer"
          >
            <Avatar className="w-full h-full">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">U</AvatarFallback>
            </Avatar>
          </button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="w-10 h-10 hover:bg-destructive/10 hover:text-destructive transition-all"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};