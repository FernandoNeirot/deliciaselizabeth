import Products from "@/views/Products";
import { buildPageMetadata, OG_IMAGES } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Productos",
  description:
    "Explora nuestro catálogo de tortas, cupcakes y postres artesanales. Cada creación es única, hecha con ingredientes premium. Pedí por WhatsApp.",
  path: "/productos",
  image: OG_IMAGES.productos,
  keywords: [
    "tortas artesanales",
    "cupcakes",
    "postres personalizados",
    "catálogo pastelería",
    "Avellaneda",
    "Delicias Elizabeth",
  ],
});

export default function ProductsPage() {
  return <Products />;
}
