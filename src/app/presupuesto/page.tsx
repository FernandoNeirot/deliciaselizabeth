import type { Metadata } from "next";
import Budget from "@/views/Budget";

export const metadata: Metadata = {
  title: "Pedí tu Presupuesto",
  description:
    "Diseñá tu torta personalizada: rellenos, porciones, temática y entrega. Te contactamos por WhatsApp con el presupuesto.",
  openGraph: {
    title: "Pedí tu Presupuesto | Delicias Elizabeth",
    description:
      "Diseñá tu torta personalizada: rellenos, porciones, temática y entrega. Te contactamos por WhatsApp con el presupuesto.",
    url: "/presupuesto",
    images: ["/og-presupuesto.jpg"],
  },
};

export default function BudgetPage() {
  return <Budget />;
}
