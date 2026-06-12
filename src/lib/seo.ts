import type { Metadata } from "next";

export const SITE_NAME = "Delicias Elizabeth";
export const SITE_LOCALE = "es_AR";

export const DEFAULT_KEYWORDS = [
  "pastelería artesanal",
  "tortas personalizadas",
  "muffins",
  "postres",
  "Avellaneda",
  "Buenos Aires",
  "Delicias Elizabeth",
];

export const OG_IMAGES = {
  home: "/og-home.jpg",
  productos: "/og-productos.jpg",
  presupuesto: "/og-presupuesto.jpg",
  valorar: "/og-valorar.jpg",
} as const;

export type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
};

function resolveTitle(title: string): string {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = OG_IMAGES.home,
  keywords = DEFAULT_KEYWORDS,
  noIndex = false,
}: PageSeoInput): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const resolvedTitle = resolveTitle(title);
  const pageTitle =
    normalizedPath === "/" ? { absolute: resolvedTitle } : title;

  const metadata: Metadata = {
    title: pageTitle,
    description,
    keywords,
    alternates: {
      canonical: normalizedPath,
    },
    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      title: resolvedTitle,
      description,
      url: normalizedPath,
      images: [
        {
          url: image,
          alt: resolvedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [image],
    },
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}
