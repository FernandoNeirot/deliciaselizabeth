"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { Star, Cake, ChevronLeft, ChevronRight } from "lucide-react";
import { useCustomProducts } from "@/hooks/useProducts";

const baseSlides = [
  { src: "/assets/hero-bakery.webp", alt: "Pastelería artesanal - Delicias Elizabeth" },
  { src: "/assets/product-cake-1.webp", alt: "Torta de Boda Elegante - Delicias Elizabeth" },
  { src: "/assets/product-princesas.webp", alt: "Torta de Princesas - Delicias Elizabeth" },
  { src: "/assets/product-pokemon.webp", alt: "Torta temática - Delicias Elizabeth" },
  { src: "/assets/product-mariposas.webp", alt: "Torta Mariposas Rosa - Delicias Elizabeth" },
];

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const HeroSection = () => {
  const { products: custom } = useCustomProducts();
  const customHero = useMemo(
    () => custom.filter((p) => p.useInHero).map((p) => ({ src: p.image, alt: p.name })),
    [custom],
  );
  const [slides, setSlides] = useState(baseSlides);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const source = customHero.length > 0 ? customHero : baseSlides;
    setSlides(shuffle(source));
    setCurrent(0);
  }, [customHero]);

  const next = useCallback(() => setCurrent((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sage-light/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cherry-light/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm font-medium text-secondary-foreground">
                Pastelería Artesanal con Amor
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
              Endulzando tus{" "}
              <span className="text-primary relative">
                momentos
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5C47 2 153 2 199 5.5" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" className="animate-[draw_1.5s_ease-out_0.8s_forwards]" strokeDasharray="200" strokeDashoffset="200" style={{ animation: 'draw 1.5s ease-out 0.8s forwards' }} />
                </svg>
              </span>{" "}
              más especiales
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Creamos tortas, cupcakes y postres únicos para celebrar cada ocasión. 
              Ingredientes frescos, diseños personalizados y sabor inigualable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" asChild>
                <Link to="/productos">
                  Ver Catálogo
                </Link>
              </Button>
              <Button variant="whatsapp" size="xl" asChild>
                <a href="/presupuesto">
                  <Cake className="w-5 h-5" />
                  Pedir Presupuesto
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 mt-12">
              <div className="text-center">
                <span className="block text-3xl font-serif font-bold text-foreground">200+</span>
                <span className="text-sm text-muted-foreground">Pedidos Entregados</span>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <span className="block text-3xl font-serif font-bold text-foreground">5⭐</span>
                <span className="text-sm text-muted-foreground">Calificación</span>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <span className="block text-3xl font-serif font-bold text-foreground">2+</span>
                <span className="text-sm text-muted-foreground">Años de Exp.</span>
              </div>
            </div>
          </div>

          {/* Hero Carousel */}
          <div className="relative animate-scale-in">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-elevated">
              {slides.map((slide, index) => (
                <img
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    index === current ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent pointer-events-none" />

              {/* Navigation arrows */}
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-background transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-background transition-colors"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === current ? "bg-background w-6" : "bg-background/60"
                    }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-card animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎂</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Pedidos Personalizados</p>
                  <p className="text-sm text-muted-foreground">Diseñamos tu torta ideal</p>
                </div>
              </div>
            </div>

            {/* Second floating element */}
            <div className="absolute -top-4 -right-4 bg-card p-3 rounded-xl shadow-card animate-float hidden lg:block" style={{ animationDelay: '3s' }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <Star className="w-4 h-4 fill-accent text-accent" />
                </div>
                <span className="text-xs font-medium text-foreground">5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
