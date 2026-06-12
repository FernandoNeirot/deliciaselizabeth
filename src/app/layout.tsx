import type { Metadata } from "next";
import { Providers } from "./providers";
import { SITE_LOCALE, SITE_NAME } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Delicias Elizabeth | Pastelería Artesanal en Avellaneda",
    template: "%s | Delicias Elizabeth",
  },
  description:
    "Pastelería artesanal hecha con amor. Tortas, cupcakes y postres personalizados para tus momentos especiales en Avellaneda, Buenos Aires.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
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
