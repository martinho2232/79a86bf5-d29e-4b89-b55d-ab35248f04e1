import { Header } from "@/components/Header";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { CourseCard } from "@/components/CourseCard";

const coursesData = [
  {
    id: "spoofer",
    title: "Fundamentos do Supabase",
    duration: "30 Mins",
    badge: "Aula"
  },
  {
    id: "react-advanced",
    title: "React Avançado",
    duration: "45 Mins",
    badge: "Aula"
  },
  {
    id: "typescript-basics",
    title: "TypeScript do Zero",
    duration: "25 Mins",
    badge: "Aula"
  },
  {
    id: "tailwind-design",
    title: "Design com Tailwind",
    duration: "35 Mins",
    badge: "Aula"
  },
  {
    id: "nodejs-api",
    title: "APIs com Node.js",
    duration: "50 Mins",
    badge: "Aula"
  },
  {
    id: "database-design",
    title: "Design de Banco de Dados",
    duration: "40 Mins",
    badge: "Aula"
  }
];

const Courses = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <LeftSidebar />
      
      <main className="lg:ml-64 lg:mr-80 pt-16 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-foreground">Catálogo de Cursos</h1>
            <p className="text-muted-foreground">Escolha um curso para começar a aprender</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
            {coursesData.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                duration={course.duration}
                badge={course.badge}
              />
            ))}
          </div>
        </div>
      </main>

      <RightSidebar />
    </div>
  );
};

export default Courses;
