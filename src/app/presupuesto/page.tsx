import Budget from "@/views/Budget";
import { buildPageMetadata, OG_IMAGES } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Pedí tu Presupuesto",
  description:
    "Diseñá tu torta personalizada: rellenos, porciones, temática y entrega. Te contactamos por WhatsApp con el presupuesto.",
  path: "/presupuesto",
  image: OG_IMAGES.presupuesto,
  keywords: [
    "presupuesto torta",
    "torta personalizada",
    "pedido WhatsApp",
    "pastelería Avellaneda",
    "Delicias Elizabeth",
  ],
});

export default function BudgetPage() {
  return <Budget />;
}
