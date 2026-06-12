"use client";

import { useState, useCallback } from "react";
import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
const logo = "/assets/logo.png";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname, push } = useRouter();

  const isHome = pathname === "/";

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMenuOpen(false);

      // "Inicio" → always go to home top
      if (href === "inicio") {
        if (!isHome) {
          push("/");
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // "Productos" → on home scroll to #ultimas-entregas, on other pages go to /productos
      if (href === "productos") {
        if (isHome) {
          document.getElementById("ultimas-entregas")?.scrollIntoView({ behavior: "smooth" });
        } else {
          push("/productos");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      // "Presupuesto" → navigate to /presupuesto
      if (href === "presupuesto") {
        push("/presupuesto");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // Other anchors (sobre-mi, contacto) → go home first if needed, then scroll
      if (!isHome) {
        push("/");
        setTimeout(() => {
          document.getElementById(href)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(href)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [isHome, push]
  );

  const navLinks = [
    { href: "inicio", label: "Inicio" },
    { href: "productos", label: "Productos" },
    { href: "presupuesto", label: "Presupuesto" },
    { href: "sobre-mi", label: "Sobre Mí" },
    { href: "contacto", label: "Contacto" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-3"
              onClick={(e) => handleNavClick(e, "inicio")}
            >
              <img src={logo} alt="Delicias Elizabeth" className="h-12 md:h-16 w-auto rounded-full bg-white p-0.5" />
              <span className="text-xl md:text-2xl font-serif font-bold text-foreground">
                Delicias <span className="text-primary">Elizabeth</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={`#${link.href}`}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button variant="hero" size="lg" asChild>
                <a href="https://wa.me/5491169743145" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-4 h-4" />
                  Contáctame
                </a>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border animate-fade-up bg-background">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={`#${link.href}`}
                    className="text-muted-foreground hover:text-primary transition-colors py-2 font-medium"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                ))}
                <Button variant="hero" size="lg" className="mt-2" asChild>
                  <a href="https://wa.me/5491169743145" target="_blank" rel="noopener noreferrer">
                    <Phone className="w-4 h-4" />
                    Contáctame
                  </a>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>
      {isMenuOpen && (
        <div
          className="fixed top-16 md:top-20 bottom-0 left-0 right-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
