import type { Metadata } from "next";
import Index from "@/views/Index";

export const metadata: Metadata = {
  title: "Delicias Elizabeth | Pastelería Artesanal en Avellaneda",
  description:
    "Pastelería artesanal hecha con amor. Tortas, cupcakes y postres personalizados para tus momentos especiales en Avellaneda, Buenos Aires.",
  openGraph: {
    title: "Delicias Elizabeth | Pastelería Artesanal en Avellaneda",
    description:
      "Pastelería artesanal hecha con amor. Tortas, cupcakes y postres personalizados para tus momentos especiales en Avellaneda, Buenos Aires.",
    url: "/",
    images: ["/og-home.jpg"],
  },
};

export default function HomePage() {
  return <Index />;
}
