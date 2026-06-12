import Index from "@/views/Index";
import { buildPageMetadata, OG_IMAGES } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Delicias Elizabeth | Pastelería Artesanal en Avellaneda",
  description:
    "Pastelería artesanal hecha con amor. Tortas, cupcakes y postres personalizados para tus momentos especiales en Avellaneda, Buenos Aires.",
  path: "/",
  image: OG_IMAGES.home,
});

export default function HomePage() {
  return <Index />;
}
