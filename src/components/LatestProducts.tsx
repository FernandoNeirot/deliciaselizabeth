"use client";

import { Link } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useCustomProducts } from "@/hooks/useProducts";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const LatestProducts = () => {
  const { products, loading, error } = useCustomProducts();
  const latestProducts = products.slice(0, 3);
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.1);

  return (
    <section id="ultimas-entregas" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div
          ref={titleRef}
          className={`text-center mb-12 scroll-animate ${titleVisible ? "visible" : ""}`}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Últimas Entregas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conoce algunas de nuestras creaciones más recientes, hechas con amor y dedicación
          </p>
        </div>

        <div ref={gridRef} className="min-h-[120px]">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Cargando entregas...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se pudieron cargar las entregas.</p>
            </div>
          ) : latestProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Pronto vas a ver acá nuestras últimas creaciones.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {latestProducts.map((product, i) => (
                <div
                  key={product.id}
                  className={`scroll-animate stagger-${i + 1} ${gridVisible ? "visible" : ""}`}
                >
                  <ProductCard product={product} showPrice={false} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className={`text-center mt-12 scroll-animate stagger-4 ${gridVisible ? "visible" : ""}`}
        >
          <Button variant="hero" size="xl" asChild>
            <Link to="/productos" onClick={() => window.scrollTo({ top: 0 })}>
              Ver Todos los Productos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
