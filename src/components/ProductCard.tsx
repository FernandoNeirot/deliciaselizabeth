"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

import { type Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  showPrice?: boolean;
}

const ProductCard = ({ product, showPrice = true }: ProductCardProps) => {
  const whatsappMessage = encodeURIComponent(
    `¡Hola! 👋 Me interesa el producto: ${product.name}. ¿Podrías darme más información?`
  );
  const whatsappUrl = `https://wa.me/5491169743145?text=${whatsappMessage}`;

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 hover:-translate-y-2">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Price badge */}
        {showPrice && product.price && (
          <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-soft">
            <span className="font-serif font-bold text-foreground">{product.price}</span>
          </div>
        )}

        {/* Quick action on hover */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <Button variant="whatsapp" className="w-full" asChild>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              Consultar
            </a>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">
          {product.category}
        </span>
        <h3 className="font-serif font-semibold text-lg text-foreground mt-1 mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        
        {/* Mobile WhatsApp Button */}
        <div className="mt-4 md:hidden">
          <Button variant="whatsapp" size="sm" className="w-full" asChild>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              Pedir por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
