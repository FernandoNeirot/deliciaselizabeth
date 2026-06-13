import type { Metadata } from "next";
import { Providers } from "./providers";
import { OG_IMAGE, SITE_LOCALE, SITE_NAME } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Delicias Elizabeth | Pastelería Artesanal en Avellaneda",
    template: "%s | Delicias Elizabeth",
  },
  description:
    "Pastelería artesanal hecha con amor. Tortas, muffins y postres personalizados para tus momentos especiales en Avellaneda, Buenos Aires.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - logo`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
