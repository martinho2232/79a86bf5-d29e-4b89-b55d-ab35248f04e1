import { useState } from "react";
import { ChevronDown, ChevronUp, Search, Play, Circle, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import logo from "@/assets/logo.png";

interface Lesson {
  id: string;
  title: string;
  type: "video" | "text";
  duration?: string;
  completed: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  expanded: boolean;
}

const courseData: Module[] = [
  {
    id: "spoofer",
    title: "Spoofer",
    expanded: true,
    lessons: [
      { id: "1", title: "Introdução e Fundamentos", type: "video", duration: "10:04", completed: false },
      { id: "2", title: "Formatação + Dicas", type: "video", duration: "15:30", completed: false },
      { id: "3", title: "Aprofundando nas Ferramentas + Manual Spoofing", type: "video", duration: "20:15", completed: false },
      { id: "4", title: "Criando Gerador de Seriais com C++", type: "video", duration: "25:40", completed: false },
      { id: "5", title: "Purple Spoofer CMD (Aprofundando)", type: "video", duration: "18:20", completed: false },
      { id: "6", title: "Purple Spoofer CMD (Continuação)", type: "video", duration: "22:10", completed: false },
      { id: "7", title: "Purple Spoofer CMD - Regedit", type: "video", duration: "19:04", completed: false },
    ],
  },
];

export default function Course() {
  const [modules, setModules] = useState<Module[]>(courseData);
  const [currentLesson, setCurrentLesson] = useState<string>("7");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleModule = (moduleId: string) => {
    setModules(modules.map(m => m.id === moduleId ? { ...m, expanded: !m.expanded } : m));
  };

  const getCurrentLesson = () => {
    for (const module of modules) {
      const lesson = module.lessons.find(l => l.id === currentLesson);
      if (lesson) return { module, lesson };
    }
    return null;
  };

  const current = getCurrentLesson();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0A0A0A] border-b border-border z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" className="h-8 w-8" />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground">MC</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground">Melina Costa</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex pt-16">
        {/* Left Sidebar - Course Navigation */}
        <aside className="fixed left-0 top-16 bottom-0 w-80 border-r border-border overflow-y-auto card-gradient">
          <div className="p-6 space-y-6">
            {/* Access Purchases Card */}
            <div className="bg-[#0A0A0A] rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:bg-[#0A0A0A]/80 transition-colors">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18M15 3v18" />
              </svg>
              <span className="text-sm font-medium text-foreground">Acessar minhas compras</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por Título"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#0A0A0A] border-none"
              />
            </div>

            {/* Curriculum */}
            <div className="space-y-2">
              {modules.map((module) => (
                <div key={module.id}>
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                      <span className="font-semibold">{module.title}</span>
                    </div>
                    {module.expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {/* Lessons */}
                  {module.expanded && (
                    <div className="mt-1 space-y-1">
                      {module.lessons.map((lesson, index) => {
                        const isActive = lesson.id === currentLesson;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setCurrentLesson(lesson.id)}
                            className={`w-full flex items-start gap-3 px-4 py-3 rounded-lg transition-colors ml-2 ${
                              isActive 
                                ? "bg-[#0A0A0A] border-l-4 border-primary" 
                                : "hover:bg-secondary/50"
                            }`}
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${
                                isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                              }`}>
                                {index + 1}
                              </span>
                              <div className="flex-1 text-left">
                                <div className={`text-sm ${isActive ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                                  {lesson.title}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  {lesson.type === "video" ? (
                                    <Play className="w-3 h-3 text-muted-foreground" />
                                  ) : (
                                    <Circle className="w-3 h-3 text-muted-foreground" />
                                  )}
                                  <span className="text-xs text-muted-foreground capitalize">{lesson.type}</span>
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="ml-80 flex-1 p-6">
          <div className="mx-6 space-y-6">
            {/* Video Player */}
            <YouTubePlayer videoId="qUPF1akyqlw" />

            {/* Lesson Actions */}
            <div className="flex items-center justify-between">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <CheckCircle className="w-4 h-4" />
                Marcar como vista
              </Button>
            </div>

            {/* Lesson Title */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {current?.lesson.title || "Purple Spoofer CMD - Regedit"}
              </h2>
            </div>

            {/* Comments Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">Comentários</h3>
                <span className="text-sm text-muted-foreground">0</span>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-8 text-center">
                <p className="text-muted-foreground">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-4 pt-8">
              <Button variant="outline" className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </Button>
              <Button className="bg-foreground text-background hover:bg-foreground/90 gap-2">
                Próximo
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
