import { Header } from "@/components/Header";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Flame, Star, Users } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";

const trendingTopics = [
  { name: "React", posts: 1234, trend: "+12%" },
  { name: "TypeScript", posts: 987, trend: "+8%" },
  { name: "Supabase", posts: 756, trend: "+15%" },
  { name: "Tailwind CSS", posts: 654, trend: "+10%" },
  { name: "Node.js", posts: 543, trend: "+5%" },
];

const popularPosts = [
  {
    title: "Como criar uma API REST com Node.js",
    author: "TechGuru",
    likes: 234,
    comments: 45,
    category: "Backend"
  },
  {
    title: "Design System completo com Tailwind",
    author: "CodeMaster",
    likes: 189,
    comments: 32,
    category: "Frontend"
  },
  {
    title: "Autenticação segura com Supabase",
    author: "DevPro",
    likes: 156,
    comments: 28,
    category: "Segurança"
  },
  {
    title: "React Server Components explicados",
    author: "WebWizard",
    likes: 145,
    comments: 21,
    category: "React"
  },
];

const featuredCreators = [
  { name: "TechGuru", followers: "12.5k", specialty: "Backend" },
  { name: "CodeMaster", followers: "9.8k", specialty: "Frontend" },
  { name: "DevPro", followers: "8.2k", specialty: "Fullstack" },
  { name: "WebWizard", followers: "7.1k", specialty: "React" },
];

const Explore = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <LeftSidebar />
      
      <main className="lg:ml-64 lg:mr-80 pt-16 min-h-screen">
        <div className="container mx-auto px-3 md:px-4 py-6 md:py-8 pb-20 md:pb-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Explorar</h1>
            <p className="text-sm md:text-base text-muted-foreground">Descubra conteúdos e criadores populares</p>
          </div>

          {/* Trending Topics */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <Flame className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold">Trending Topics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
              {trendingTopics.map((topic) => (
                <Card key={topic.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base md:text-lg">{topic.name}</CardTitle>
                    <CardDescription className="text-xs md:text-sm">{topic.posts} posts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-green-500">
                      <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm font-semibold">{topic.trend}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Popular Posts */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <Star className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold">Posts Populares</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {popularPosts.map((post, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base md:text-xl">{post.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs shrink-0">{post.category}</Badge>
                    </div>
                    <CardDescription className="text-xs md:text-sm">por {post.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        ❤️ {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        💬 {post.comments}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Featured Creators */}
          <section>
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold">Criadores em Destaque</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredCreators.map((creator) => (
                <Card key={creator.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 mx-auto mb-3 md:mb-4 flex items-center justify-center">
                      <span className="text-xl md:text-2xl font-bold text-primary">
                        {creator.name.charAt(0)}
                      </span>
                    </div>
                    <CardTitle className="text-base md:text-lg">{creator.name}</CardTitle>
                    <CardDescription className="text-xs md:text-sm">{creator.followers} seguidores</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge className="text-xs">{creator.specialty}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <RightSidebar />
      <BottomNavigation />
    </div>
  );
};

export default Explore;
