"use client";

import { Heart, Award, Clock, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCustomProducts } from "@/hooks/useProducts";
import { useMemo } from "react";

const MAX_ABOUT_IMAGES = 4;

type AboutImage = { src: string; alt: string };

const features = [
  {
    icon: Heart,
    title: "Hecho con Amor",
    description: "Cada postre está elaborado con pasión y dedicación artesanal.",
  },
  {
    icon: Award,
    title: "Calidad Premium",
    description: "Solo utilizamos ingredientes frescos y de la más alta calidad.",
  },
  {
    icon: Clock,
    title: "Puntualidad",
    description: "Entrega en tiempo y forma para que tu evento sea perfecto.",
  },
  {
    icon: Sparkles,
    title: "Diseños Únicos",
    description: "Personalizamos cada pedido según tus gustos y necesidades.",
  },
];

const AboutSection = () => {
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation();
  const { ref: imagesRef, isVisible: imagesVisible } = useScrollAnimation(0.1);
  const { products: custom } = useCustomProducts();
  const aboutImages = useMemo<AboutImage[]>(
    () =>
      custom
        .filter((p) => p.useInAbout && p.image)
        .slice(0, MAX_ABOUT_IMAGES)
        .map((p) => ({ src: p.image, alt: p.name })),
    [custom],
  );

  const [img1, img2, img3, img4] = aboutImages;

  return (
    <section id="sobre-mi" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className={`grid gap-12 items-center ${aboutImages.length > 0 ? "lg:grid-cols-2" : ""}`}>
          {/* Content */}
          <div
            ref={textRef}
            className={`scroll-animate-left ${textVisible ? "visible" : ""}`}
          >
            <span className="inline-block text-primary font-medium mb-4">
              Sobre Mí
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Pasión por la pastelería desde el corazón
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ¡Hola! Soy Elizabeth, una emprendedora apasionada por la pastelería artesanal. 
              Cada creación que sale de mi cocina está hecha con ingredientes 
              seleccionados y mucho amor. Mi objetivo es endulzar tus momentos 
              más especiales con postres únicos y deliciosos.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Desde tortas de celebración hasta postres individuales, cada pedido 
              es tratado con el mismo cuidado y dedicación. ¡Déjame ser parte de 
              tus momentos especiales!
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className={`flex gap-4 scroll-animate stagger-${i + 1} ${textVisible ? "visible" : ""}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image Grid */}
          {aboutImages.length > 0 && (
          <div
            ref={imagesRef}
            className={`relative scroll-animate-right ${imagesVisible ? "visible" : ""}`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                {img1 && (
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-500 group">
                  <img
                    src={img1.src}
                    alt={img1.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                )}
                {img2 && (
                <div className="aspect-square rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-500 group">
                  <img
                    src={img2.src}
                    alt={img2.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                )}
              </div>
              <div className="space-y-4 pt-8">
                {img3 && (
                <div className="aspect-square rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-500 group">
                  <img
                    src={img3.src}
                    alt={img3.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                )}
                {img4 && (
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-500 group">
                  <img
                    src={img4.src}
                    alt={img4.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                )}
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-sage-light/30 rounded-full blur-3xl" />
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
