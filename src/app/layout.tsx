import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Delicias Elizabeth | Pastelería Artesanal en Avellaneda",
    template: "%s | Delicias Elizabeth",
  },
  description:
    "Pastelería artesanal hecha con amor. Tortas, cupcakes y postres personalizados para tus momentos especiales en Avellaneda, Buenos Aires.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  icons: {
    icon: [{ url: "/assets/logo.png", type: "image/png" }],
    apple: [{ url: "/assets/logo.png", type: "image/png" }],
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
