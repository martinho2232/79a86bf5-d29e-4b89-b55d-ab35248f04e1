import { Home, Compass, GraduationCap, Settings, ShoppingBag } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Início", path: "/" },
    { icon: GraduationCap, label: "Cursos", path: "/courses" },
    { icon: ShoppingBag, label: "Loja", path: "/shop" },
    { icon: Settings, label: "Configurações", path: "/settings" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-lg border-t border-border z-50">
      <div className="grid grid-cols-4 h-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                active 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`w-6 h-6 ${active ? "fill-primary/20" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
