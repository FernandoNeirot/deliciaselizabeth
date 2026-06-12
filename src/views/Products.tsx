"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import Header from "@/components/Header";
import CategorySection from "@/components/CategorySection";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { useCustomProducts } from "@/hooks/useProducts";

const normalizeCategoryId = (category: string) => {
  const id = category.toLowerCase();
  return id === "cupcakes" ? "muffin" : id;
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { products, loading, error } = useCustomProducts();

  const availableCategories = useMemo(() => {
    const cats = new Set(products.map((p) => normalizeCategoryId(p.category)));
    return Array.from(cats);
  }, [products]);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory
      ? normalizeCategoryId(p.category) === selectedCategory
      : true;
    const q = searchQuery.toLowerCase();
    const matchesSearch = searchQuery
      ? p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags?.some((t) => t.toLowerCase().includes(q)) ?? false)
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 pt-12 pb-0">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Nuestros Productos
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Explora todo nuestro catálogo de delicias artesanales. Cada creación es única,
              hecha con ingredientes premium y mucho amor. ¡Haz tu pedido por WhatsApp!
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <CategorySection
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
          availableCategories={availableCategories}
          compact
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Cargando productos...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive">No se pudieron cargar los productos.</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron productos.</p>
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
      </main>
      <Footer />
    </div>
  );
};

export default Products;
