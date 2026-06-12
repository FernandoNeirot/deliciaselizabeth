"use client";

import { useState } from "react";
import { useRouter } from "@/lib/router";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessageCircle, Cake, ArrowLeft, CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";


const PORTIONS = [10, 15, 20, 25, 30, 40, 50];

const HOURS = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
];

const Budget = () => {
  const { back } = useRouter();
  const [portions, setPortions] = useState<number | null>(null);
  const [theme, setTheme] = useState("");
  const [deliveryType, setDeliveryType] = useState<"retiro" | "envio">("retiro");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState<Date>();
  const [hour, setHour] = useState("");

  const isValid =
    portions !== null &&
    theme.trim().length > 0 &&
    date !== undefined &&
    hour !== "" &&
    (deliveryType === "retiro" || address.trim().length > 0);

  const handleSubmit = () => {
    if (!isValid) return;

    const deliveryLabel = deliveryType === "retiro" ? "Retiro en local" : `Envío a: ${address.trim()}`;
    const dateLabel = date ? format(date, "dd/MM/yyyy", { locale: es }) : "";

    const message = encodeURIComponent(
      `¡Hola! Quisiera pedir un presupuesto para una torta 🎂\n\n` +
      `🎨 Temática y rellenos: ${theme.trim()}\n` +
      `👥 Porciones: ${portions}\n` +
      `🚚 Entrega: ${deliveryLabel}\n` +
      `📅 Fecha: ${dateLabel} a las ${hour}`
    );

    window.open(`https://wa.me/5491169743145?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <button
          onClick={() => back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Cake className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
              Pedí tu Presupuesto
            </h1>
            <p className="text-muted-foreground">
              Completá los datos y te contactamos por WhatsApp con el presupuesto.
            </p>
          </div>

          <div className="space-y-8">
            {/* Temática y Rellenos */}
            <div className="space-y-3">
              <Label htmlFor="theme" className="text-base font-semibold">
                Temática deseada y relleno
              </Label>
              <Textarea
                id="theme"
                placeholder="Describí la temática que te gustaría para tu torta y los rellenos deseados (ej: Frozen para nena de 5 años colores pastel, con dulce de leche y crema chantilly...)"
                rows={4}
                maxLength={500}
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="resize-none"
              />
            </div>

            {/* Porciones */}

            {/* Retiro o Envío */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Método de entrega</Label>
              <div className="flex gap-3">
                {(["retiro", "envio"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => { setDeliveryType(type); if (type === "retiro") setAddress(""); }}
                    className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                      deliveryType === type
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-foreground hover:border-primary/50"
                    }`}
                  >
                    {type === "retiro" ? "🏪 Retiro en local" : "🚚 Envío a domicilio"}
                  </button>
                ))}
              </div>
              {deliveryType === "envio" && (
                <Input
                  placeholder="Ingresá la dirección de entrega"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  maxLength={200}
                />
              )}
            </div>

            {/* Fecha y Hora */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Fecha y hora {deliveryType === "retiro" ? "de retiro" : "de entrega"}
              </Label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex-1 justify-start text-left font-normal hover:bg-primary/10 hover:text-primary",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "dd/MM/yyyy", { locale: es }) : "Seleccioná una fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>

                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {HOURS.map((h) => (
                      <button
                        key={h}
                        onClick={() => setHour(h)}
                        className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-200 ${
                          hour === h
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-card text-foreground hover:border-primary/50"
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <Button
              variant="whatsapp"
              size="xl"
              className="w-full"
              disabled={!isValid}
              onClick={handleSubmit}
            >
              <MessageCircle className="w-5 h-5" />
              Solicitar Presupuesto por WhatsApp
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Budget;
