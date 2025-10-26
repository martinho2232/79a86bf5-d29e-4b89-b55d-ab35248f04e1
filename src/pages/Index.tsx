import { Header } from "@/components/Header";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { PostCreator } from "@/components/PostCreator";
import { PostCard } from "@/components/PostCard";
const samplePosts = [{
  author: {
    name: "Marie Kirk",
    username: "@mariekirk22",
    avatar: ""
  },
  category: "Tecnologia",
  time: "4h",
  tags: ["#tecnologia", "#C++", "#Rust", "#Produtividade"],
  title: "Rust é o futuro da programação de sistemas?",
  preview: "Tenho mergulhado em Rust nas últimas semanas, e honestamente, parece revolucionário comparado ao C++. A combinação de segurança de memória + performance é impressionante. Curioso—vocês acham que Rust vai substituir C++ em projetos de grande escala ou eles vão coexistir?",
  upvotes: "3.6K",
  downvotes: "210",
  comments: "3.6K",
  views: "210"
}, {
  author: {
    name: "Nam So hee",
    username: "@namsohe",
    avatar: ""
  },
  category: "Tecnologia",
  time: "4h",
  tags: ["#BemEstar", "#tech", "#Diário", "#Produtividade"],
  title: "Como você se desconecta das telas?",
  preview: "Com trabalho remoto e notificações constantes, percebi que passo mais de 10 horas diárias em frente à tela 😵. Qual é sua maneira favorita de recarregar as energias offline? Trilha, diário, ou outra coisa?",
  upvotes: "1.2K",
  downvotes: "510",
  comments: "1.6K",
  views: "80"
}];
const Index = () => {
  return <div className="min-h-screen">
      <Header />
      
      <div className="flex w-full pt-16">
        <LeftSidebar />
        
        {/* Main Feed */}
        <main className="flex-1 ml-64 mr-80 min-h-screen">
          <div className="w-full px-6 pb-6 space-y-4">
            <PostCreator />
            <div className="space-y-4">
              {samplePosts.map((post, index) => <PostCard key={index} {...post} />)}
            </div>
          </div>
        </main>

        <RightSidebar />
      </div>
    </div>;
};
export default Index;