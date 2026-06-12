"use client";

import { Cake, Cookie, Coffee, PieChart } from "lucide-react";

const categories = [
  {
    id: "tortas",
    name: "Tortas",
    description: "Tortas personalizadas para toda ocasión",
    icon: Cake,
    color: "bg-primary/10 text-primary",
  },
  {
    id: "desayunos",
    name: "Desayunos",
    description: "Desayunos artesanales y completos",
    icon: Coffee,
    color: "bg-primary/10 text-primary",
  },
  {
    id: "tartas",
    name: "Tartas",
    description: "Tartas dulces y saladas",
    icon: PieChart,
    color: "bg-olive/10 text-olive",
  },
  {
    id: "muffin",
    name: "Muffin",
    description: "Pequeños bocados de felicidad",
    icon: Cookie,
    color: "bg-accent/10 text-accent",
  },
];

interface CategorySectionProps {
  onCategorySelect: (categoryId: string | null) => void;
  selectedCategory: string | null;
  availableCategories?: string[];
  compact?: boolean;
}

const CategorySection = ({ onCategorySelect, selectedCategory, availableCategories, compact }: CategorySectionProps) => {
  const visibleCategories = availableCategories
    ? categories.filter((c) => availableCategories.includes(c.id))
    : categories;

  return (
    <section className={compact ? "pt-2 pb-4 bg-transparent" : "py-16 bg-secondary/50"}>
      <div className="container mx-auto px-4">
        {!compact && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Nuestras Categorías
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explora nuestra variedad de productos artesanales, cada uno elaborado con los mejores ingredientes
            </p>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {visibleCategories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategorySelect(isSelected ? null : category.id)}
                className={`group rounded-xl transition-all duration-300 hover:shadow-card flex items-center gap-3 ${
                  compact
                    ? `px-4 py-2.5 border-2 ${isSelected ? "bg-primary text-primary-foreground border-primary shadow-card scale-105" : "bg-card border-border hover:border-primary/50 hover:bg-primary/5"}`
                    : `p-6 rounded-2xl flex-1 min-w-[200px] max-w-[260px] flex-col ${
                        isSelected 
                          ? "bg-primary text-primary-foreground shadow-card scale-105" 
                          : "bg-card hover:scale-105"
                      }`
                }`}
              >
                <div className={`rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  compact
                    ? `w-8 h-8 ${isSelected ? "bg-primary-foreground/20" : category.color}`
                    : `w-14 h-14 rounded-xl mb-4 mx-auto ${isSelected ? "bg-primary-foreground/20" : category.color}`
                }`}>
                  <Icon className={`${compact ? "w-4 h-4" : "w-7 h-7"} ${isSelected ? "text-primary-foreground" : ""}`} />
                </div>
                <div className={compact ? "text-left" : "text-center"}>
                  <h3 className={`font-serif font-semibold ${compact ? "text-sm" : "text-lg mb-1"} ${
                    isSelected ? "text-primary-foreground" : "text-foreground"
                  }`}>
                    {category.name}
                  </h3>
                  {!compact && (
                    <p className={`text-sm ${
                      isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}>
                      {category.description}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
