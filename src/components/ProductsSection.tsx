"use client";

import ProductCard from "./ProductCard";

const products = [
  {
    id: "1",
    name: "Torta de Boda Elegante",
    description: "Hermosa torta de tres pisos con rosas naturales y detalles en oro. Perfecta para tu día especial.",
    price: "$150",
    image: "/assets/product-cake-1.webp",
    category: "Tortas",
  },
  {
    id: "2",
    name: "Muffins Surtidos",
    description: "Set de 6 muffins con diferentes sabores: chocolate, vainilla, fresa y más. Decorados con amor.",
    price: "$25",
    image: "/assets/product-cupcakes.webp",
    category: "Muffin",
  },
  {
    id: "3",
    name: "Torta de Chocolate Premium",
    description: "Capas de bizcocho de chocolate con ganache y frutos rojos frescos. Una explosión de sabor.",
    price: "$65",
    image: "/assets/product-chocolate-cake.webp",
    category: "Tortas",
  },
  {
    id: "4",
    name: "Macarons Franceses",
    description: "Delicados macarons en colores pastel. Caja de 12 unidades con sabores variados.",
    price: "$35",
    image: "/assets/product-macarons.webp",
    category: "Muffin",
  },
  {
    id: "5",
    name: "Cheesecake de Frutos Rojos",
    description: "Cremoso cheesecake New York style con compota de frutos rojos casera.",
    price: "$45",
    image: "/assets/product-cheesecake.webp",
    category: "Tartas",
  },
  {
    id: "6",
    name: "Tiramisú Artesanal",
    description: "Tradicional tiramisú italiano con café espresso y mascarpone auténtico.",
    price: "$40",
    image: "/assets/product-tiramisu.webp",
    category: "Tartas",
  },
];

interface ProductsSectionProps {
  selectedCategory: string | null;
}

const ProductsSection = ({ selectedCategory }: ProductsSectionProps) => {
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category.toLowerCase() === selectedCategory)
    : products;

  return (
    <section id="productos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Nuestros Productos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada creación es única, hecha con ingredientes premium y mucho amor. 
            ¡Haz tu pedido por WhatsApp!
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay productos en esta categoría aún.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
