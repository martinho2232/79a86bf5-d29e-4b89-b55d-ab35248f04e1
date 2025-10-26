import { Home, Compass, GraduationCap, Settings, Flame } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
const navItems = [{
  icon: Home,
  label: "Início",
  active: true
}, {
  icon: Compass,
  label: "Explorar",
  active: false
}, {
  icon: GraduationCap,
  label: "Curso",
  active: false
}, {
  icon: Settings,
  label: "Configurações",
  active: false
}];
const topUsers = [{
  username: "TechGuru",
  posts: 127,
  initial: "T",
  color: "bg-red-500"
}, {
  username: "CodeMaster",
  posts: 98,
  initial: "C",
  color: "bg-yellow-500"
}, {
  username: "DevPro",
  posts: 85,
  initial: "D",
  color: "bg-green-500"
}, {
  username: "WebWizard",
  posts: 72,
  initial: "W",
  color: "bg-indigo-500"
}];
export const LeftSidebar = () => {
  const navigate = useNavigate();
  
  return <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-transparent overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Navegação Geral */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Geral
          </h3>
          <nav className="space-y-1">
            {navItems.map(item => <button 
                key={item.label} 
                onClick={() => {
                  if (item.label === "Início") navigate("/");
                  if (item.label === "Explorar") navigate("/explore");
                  if (item.label === "Curso") navigate("/courses");
                  if (item.label === "Configurações") navigate("/settings");
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${item.active ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-secondary"}`}>
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>)}
          </nav>
        </div>

      </div>
    </aside>;
};