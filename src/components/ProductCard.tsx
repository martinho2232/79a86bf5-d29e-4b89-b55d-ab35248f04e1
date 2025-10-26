import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
  };
  onViewDetails: () => void;
}

export const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-2 right-2">{product.category}</Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-2xl font-bold text-primary">
          R$ {product.price.toFixed(2)}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={onViewDetails}
        >
          <Eye className="w-4 h-4 mr-2" />
          Ver Detalhes
        </Button>
        <Button className="flex-1">
          Comprar
        </Button>
      </CardFooter>
    </Card>
  );
};
