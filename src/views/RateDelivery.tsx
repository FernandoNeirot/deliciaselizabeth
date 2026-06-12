"use client";

import { useState, useEffect } from "react";
import { useParams } from "@/lib/router";
import { Star, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getDeliveryLink, submitReview } from "@/services/reviewService";
import { products } from "@/data/products";

const logo = "/assets/logo.png";

const RateDelivery = () => {
  const { id } = useParams<{ id: string }>();
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const link = id ? getDeliveryLink(id) : undefined;
  const product = link ? products.find((p) => p.id === link.productId) : undefined;

  useEffect(() => {
    if (!link) {
      setError("El enlace de valoración no es válido o ha expirado.");
    } else if (link.used) {
      setError("Ya valoraste esta entrega. ¡Gracias por tu opinión!");
    }
  }, [link]);

  const handleSubmit = () => {
    if (!link || !id || rating === 0) return;

    submitReview(id, link.productId, link.clientName, rating, comment);
    setSubmitted(true);
  };

  const ratingLabels = ["", "Malo", "Regular", "Bueno", "Muy bueno", "¡Excelente!"];

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
            Enlace no disponible
          </h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
            ¡Gracias por tu valoración!
          </h1>
          <p className="text-muted-foreground">
            Tu opinión nos ayuda a seguir mejorando. ¡Esperamos verte pronto!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <img src={logo} alt="Delicias Elizabeth" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
            ¿Cómo fue tu experiencia?
          </h1>
          <p className="text-muted-foreground">
            Hola <span className="font-medium text-foreground">{link?.clientName}</span>, 
            contanos qué te pareció tu pedido.
          </p>
        </div>

        {/* Product info */}
        {product && (
          <div className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 mb-8">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <p className="font-semibold text-foreground">{product.name}</p>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
          </div>
        )}

        {/* Stars */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            Tu calificación
          </label>
          <div className="flex justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-transform hover:scale-110"
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`w-10 h-10 transition-colors ${
                    star <= (hoveredStar || rating)
                      ? "fill-primary text-primary"
                      : "text-border"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground h-5">
            {ratingLabels[hoveredStar || rating] || "Seleccioná una calificación"}
          </p>
        </div>

        {/* Comment */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            Tu comentario (opcional)
          </label>
          <Textarea
            placeholder="Contanos tu experiencia..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        {/* Submit */}
        <Button
          variant="hero"
          size="xl"
          className="w-full"
          disabled={rating === 0}
          onClick={handleSubmit}
        >
          <Send className="w-5 h-5" />
          Enviar valoración
        </Button>
      </div>
    </div>
  );
};

export default RateDelivery;
