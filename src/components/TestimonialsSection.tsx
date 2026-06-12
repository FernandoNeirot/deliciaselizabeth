"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getReviews } from "@/services/reviewService";
import type { Review } from "@/types/review";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface DisplayTestimonial {
  name: string;
  initials: string;
  rating: number;
  text: string;
}

const staticTestimonials: DisplayTestimonial[] = [
  {
    name: "María García",
    initials: "MG",
    rating: 5,
    text: "¡La torta de cumpleaños quedó espectacular! Todos mis invitados quedaron encantados con el sabor y la decoración. ¡100% recomendada!",
  },
  {
    name: "Lucía Fernández",
    initials: "LF",
    rating: 5,
    text: "Pedí muffins para el baby shower de mi hermana y fueron un éxito total. Hermosos y deliciosos. Ya es mi tortera de confianza.",
  },
  {
    name: "Carolina Pérez",
    initials: "CP",
    rating: 5,
    text: "Elizabeth tiene un talento increíble. La torta de bodas superó todas nuestras expectativas. ¡Gracias por hacer nuestro día tan especial!",
  },
  {
    name: "Valentina López",
    initials: "VL",
    rating: 5,
    text: "Los alfajores y las galletas decoradas son una obra de arte. Siempre pido para regalar y todos quedan fascinados.",
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function reviewToTestimonial(review: Review): DisplayTestimonial {
  return {
    name: review.clientName,
    initials: getInitials(review.clientName),
    rating: review.rating,
    text: review.comment || "¡Excelente experiencia!",
  };
}

const TestimonialCard = ({ testimonial, index, isVisible }: { testimonial: DisplayTestimonial; index: number; isVisible: boolean }) => (
  <div
    className={`bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all duration-500 scroll-animate stagger-${index + 1} ${isVisible ? "visible" : ""}`}
  >
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < testimonial.rating ? "fill-primary text-primary" : "text-border"
          }`}
        />
      ))}
    </div>
    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
      "{testimonial.text}"
    </p>
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
          {testimonial.initials}
        </AvatarFallback>
      </Avatar>
      <span className="font-medium text-foreground text-sm">
        {testimonial.name}
      </span>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const [dynamicReviews, setDynamicReviews] = useState<DisplayTestimonial[]>([]);
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation(0.1);

  useEffect(() => {
    const reviews = getReviews();
    setDynamicReviews(reviews.map(reviewToTestimonial));
  }, []);

  const allTestimonials = dynamicReviews.length > 0
    ? [...dynamicReviews, ...staticTestimonials]
    : staticTestimonials;

  const displayed = allTestimonials.slice(0, 4);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div
          ref={titleRef}
          className={`text-center mb-12 scroll-animate ${titleVisible ? "visible" : ""}`}
        >
          <span className="inline-block text-primary font-medium mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Lo que mis clientas dicen
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            La satisfacción de mis clientas es mi mayor orgullo. Aquí comparten sus experiencias.
          </p>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayed.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-${index}`}
              testimonial={testimonial}
              index={index}
              isVisible={cardsVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
