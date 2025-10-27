import { Header } from "@/components/Header";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";
import { ProductDetail } from "@/components/ProductDetail";

const products = [
  {
    id: 1,
    name: "Curso Avançado de React",
    price: 199.90,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
    ],
    description: "Domine React do zero ao avançado. Aprenda hooks, context API, performance optimization e muito mais. Curso completo com projetos práticos e certificado.",
    category: "Desenvolvimento"
  },
  {
    id: 2,
    name: "Pacote Design UI/UX",
    price: 149.90,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop"
    ],
    description: "Aprenda a criar interfaces incríveis com Figma e implementá-las com as melhores práticas de design. Inclui templates e recursos exclusivos.",
    category: "Design"
  },
  {
    id: 3,
    name: "Kit Produtividade Developer",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=800&h=600&fit=crop"
    ],
    description: "Ferramentas, templates e recursos essenciais para aumentar sua produtividade como desenvolvedor. Snippets, configs e muito mais.",
    category: "Ferramentas"
  },
  {
    id: 4,
    name: "Ebook JavaScript Moderno",
    price: 59.90,
    image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=600&fit=crop"
    ],
    description: "Guia completo sobre JavaScript moderno (ES6+). Aprenda async/await, destructuring, spread operators e todas as funcionalidades mais recentes.",
    category: "Livros"
  },
  {
    id: 5,
    name: "Mentoria Personalizada",
    price: 299.90,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop"
    ],
    description: "Sessões individuais de mentoria com profissionais experientes. Tire dúvidas, receba feedback e acelere sua carreira tech.",
    category: "Mentoria"
  },
  {
    id: 6,
    name: "Template SaaS Completo",
    price: 179.90,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop"
    ],
    description: "Template pronto para criar seu próprio SaaS. Inclui autenticação, pagamentos, dashboard e mais. Código limpo e documentado.",
    category: "Templates"
  }
];

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <LeftSidebar />
      
      <main className="lg:ml-64 lg:mr-80 pt-16 min-h-screen">
        <div className="container mx-auto px-3 md:px-4 py-6 md:py-8 pb-20 md:pb-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Loja</h1>
            <p className="text-sm md:text-base text-muted-foreground">Explore nossos produtos e cursos exclusivos</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 justify-items-center">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={() => setSelectedProduct(product)}
                />
            ))}
          </div>
        </div>
      </main>

      <RightSidebar />
      <BottomNavigation />

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Shop;
