"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, Phone } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const logo = "/assets/logo.webp";

const Footer = () => {
  return (
    <footer id="contacto" className="bg-foreground text-background">
      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            ¿Lista para endulzar tu evento?
          </h2>
          <p className="text-background/70 mb-8 whitespace-pre-line">
            Contáctame por WhatsApp y cuéntame sobre tu próxima celebración.{"\u00a0"}
            {"\n"}¡Hagamos realidad el postre de tus sueños!
          </p>
          <Button variant="whatsapp" size="xl" asChild>
            <a href="https://wa.me/5491169743145" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5" />
              Escríbeme por WhatsApp
            </a>
          </Button>
        </div>

        {/* Footer Grid */}
        <div className="grid md:grid-cols-3 gap-12 border-t border-background/10 pt-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Delicias Elizabeth" className="h-12 w-auto rounded-full bg-white p-0.5" />
              <h3 className="text-2xl font-serif font-bold">
                Delicias <span className="text-primary">Elizabeth</span>
              </h3>
            </div>
            <p className="text-background/60 mb-6">
              Pastelería artesanal hecha con amor para tus momentos especiales.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/delicias_elizabeth/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5491169743145"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-[#25D366] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <nav className="space-y-3">
              <a href="#inicio" className="block text-background/60 hover:text-primary transition-colors">
                Inicio
              </a>
              <a href="#productos" className="block text-background/60 hover:text-primary transition-colors">
                Productos
              </a>
              <a href="#sobre-mi" className="block text-background/60 hover:text-primary transition-colors">
                Sobre Mí
              </a>
              <a href="#contacto" className="block text-background/60 hover:text-primary transition-colors">
                Contacto
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Información de Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-background/60">
                  Avellaneda, Buenos Aires
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-background/60">
                  +54 11 6974-3145
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6 text-center text-background/40 text-sm">
          © {new Date().getFullYear()} Delicias Elizabeth. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
