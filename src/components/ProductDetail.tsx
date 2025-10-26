import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, X } from "lucide-react";

interface ProductDetailProps {
  product: {
    id: number;
    name: string;
    price: number;
    images: string[];
    description: string;
    category: string;
  };
  onClose: () => void;
}

export const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl mb-2">{product.name}</DialogTitle>
              <Badge>{product.category}</Badge>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden border">
              <img
                src={product.images[selectedImage]}
                alt={`${product.name} - Imagem ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-primary scale-95"
                      : "border-transparent hover:border-muted-foreground/50"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Detalhes e Descrição */}
          <div className="space-y-6">
            <div>
              <p className="text-3xl font-bold text-primary mb-4">
                R$ {product.price.toFixed(2)}
              </p>
              
              <DialogDescription className="text-base leading-relaxed">
                {product.description}
              </DialogDescription>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-lg">O que você receberá:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Acesso imediato ao conteúdo completo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Atualizações gratuitas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Suporte via comunidade exclusiva</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Garantia de 30 dias</span>
                </li>
              </ul>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Continuar Comprando
              </Button>
              <Button className="flex-1">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Comprar Agora
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
