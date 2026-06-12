import NotFound from "@/views/NotFound";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Página no encontrada",
  description:
    "La página que buscás no existe o fue movida. Volvé al inicio para explorar nuestra pastelería artesanal.",
  path: "/404",
  noIndex: true,
});

export default function GlobalNotFound() {
  return <NotFound />;
}
