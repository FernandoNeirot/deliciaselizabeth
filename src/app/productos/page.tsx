import type { Metadata } from "next";
import Products from "@/views/Products";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Explora nuestro catálogo de tortas, cupcakes y postres artesanales. Cada creación es única, hecha con ingredientes premium. Pedí por WhatsApp.",
  openGraph: {
    title: "Productos | Delicias Elizabeth",
    description:
      "Explora nuestro catálogo de tortas, cupcakes y postres artesanales. Cada creación es única, hecha con ingredientes premium. Pedí por WhatsApp.",
    url: "/productos",
    images: ["/og-productos.jpg"],
  },
};

export default function ProductsPage() {
  return <Products />;
}
