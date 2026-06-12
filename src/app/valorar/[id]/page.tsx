import type { Metadata } from "next";
import RateDelivery from "@/views/RateDelivery";
import { buildPageMetadata, OG_IMAGES } from "@/lib/seo";

type RateDeliveryPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: RateDeliveryPageProps): Promise<Metadata> {
  const { id } = await params;

  return buildPageMetadata({
    title: "Valorá tu Experiencia",
    description:
      "Contanos cómo fue tu experiencia con tu pedido de Delicias Elizabeth. Tu opinión nos ayuda a seguir mejorando.",
    path: `/valorar/${id}`,
    image: OG_IMAGES.valorar,
    keywords: [
      "valoración pedido",
      "opinión clientes",
      "pastelería artesanal",
      "Delicias Elizabeth",
    ],
  });
}

export default function RateDeliveryPage() {
  return <RateDelivery />;
}
