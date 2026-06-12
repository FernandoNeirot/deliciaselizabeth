"use client";

import { Heart, Award, Clock, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCustomProducts } from "@/hooks/useProducts";
import { useEffect, useState } from "react";

const about1 = "/assets/about-1.webp";
const about2 = "/assets/about-2.webp";
const about3 = "/assets/about-3.webp";
const about4 = "/assets/about-4.webp";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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

const baseImages = [
  { src: about1, alt: "Torta de golosinas colorida" },
  { src: about2, alt: "Torta de primera comunión" },
  { src: about3, alt: "Torta temática Tauro con muffins" },
  { src: about4, alt: "Torta temática Bob Esponja" },
];

const AboutSection = () => {
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation();
  const { ref: imagesRef, isVisible: imagesVisible } = useScrollAnimation(0.1);
  const { products: custom } = useCustomProducts();
  const [aboutImages, setAboutImages] = useState(baseImages);

  useEffect(() => {
    const customAbout = custom
      .filter((p) => p.useInAbout)
      .map((p) => ({ src: p.image, alt: p.name }));

    if (customAbout.length >= 4) {
      setAboutImages(shuffle(customAbout).slice(0, 4));
      return;
    }

    const needed = 4 - customAbout.length;
    setAboutImages([...customAbout, ...shuffle(baseImages).slice(0, needed)]);
  }, [custom]);

  const [img1, img2, img3, img4] = aboutImages;

  return (
    <section id="sobre-mi" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
          <div
            ref={imagesRef}
            className={`relative scroll-animate-right ${imagesVisible ? "visible" : ""}`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-500 group">
                  <img
                    src={img1.src}
                    alt={img1.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-500 group">
                  <img
                    src={img2.src}
                    alt={img2.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-500 group">
                  <img
                    src={img3.src}
                    alt={img3.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-500 group">
                  <img
                    src={img4.src}
                    alt={img4.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-sage-light/30 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
