import type { Metadata } from "next";
import RateDelivery from "@/views/RateDelivery";

export const metadata: Metadata = {
  title: "Valorá tu Experiencia",
  description:
    "Contanos cómo fue tu experiencia con tu pedido de Delicias Elizabeth. Tu opinión nos ayuda a seguir mejorando.",
  openGraph: {
    title: "Valorá tu Experiencia | Delicias Elizabeth",
    description:
      "Contanos cómo fue tu experiencia con tu pedido de Delicias Elizabeth. Tu opinión nos ayuda a seguir mejorando.",
    images: ["/og-valorar.jpg"],
  },
};

export default function RateDeliveryPage() {
  return <RateDelivery />;
}
