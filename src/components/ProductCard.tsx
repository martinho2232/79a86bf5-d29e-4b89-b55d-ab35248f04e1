import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <div 
      className="product-card group cursor-pointer"
      onClick={onViewDetails}
    >
      <div className="product-card-content">
        {/* Front */}
        <div className="product-card-front">
          <div className="product-card-bg">
            <div className="floating-circle" />
            <div className="floating-circle floating-circle-right" />
            <div className="floating-circle floating-circle-bottom" />
          </div>
          <div className="product-card-front-content">
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="secondary" className="backdrop-blur-sm bg-background/70">{product.category}</Badge>
            </div>
            <div className="flex-1 overflow-hidden rounded-t-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="product-description">
              <p className="product-title">
                <strong>{product.name}</strong>
              </p>
              <p className="product-price">R$ {product.price.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="product-card-back">
          <div className="product-card-back-content">
            <ShoppingBag className="w-16 h-16 text-primary" />
            <strong className="text-primary text-lg">Visualizar</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
