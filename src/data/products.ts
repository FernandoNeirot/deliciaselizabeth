export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  tags?: string[];
  useInHero?: boolean;
  useInAbout?: boolean;
  createdAt?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Torta de Boda Elegante",
    description:
      "Hermosa torta de tres pisos con rosas naturales y detalles en oro. Perfecta para tu día especial.",
    price: "$150",
    image: "/assets/product-cake-1.webp",
    category: "Tortas",
  },
  {
    id: "2",
    name: "Cupcakes Surtidos",
    description:
      "Set de 6 cupcakes con diferentes sabores: chocolate, vainilla, fresa y más. Decorados con amor.",
    price: "$25",
    image: "/assets/product-cupcakes.webp",
    category: "Cupcakes",
  },
  {
    id: "3",
    name: "Torta de Chocolate Premium",
    description:
      "Capas de bizcocho de chocolate con ganache y frutos rojos frescos. Una explosión de sabor.",
    price: "$65",
    image: "/assets/product-chocolate-cake.webp",
    category: "Tortas",
  },
  {
    id: "7",
    name: "Mini Chocotorta con Cupcakes",
    description: "Deliciosa mini chocotorta acompañada de 5 cupcakes temáticos decorados a mano.",
    price: "",
    image: "/assets/product-chocotorta.webp",
    category: "Tortas",
  },
  {
    id: "8",
    name: "Torta Frutal",
    description:
      "Exquisita tarta de frutas frescas con kiwi, frutillas, duraznos y arándanos sobre crema pastelera.",
    price: "",
    image: "/assets/product-frutal.webp",
    category: "Tortas",
  },
  {
    id: "9",
    name: "Torta de Princesas",
    description:
      "Hermosa torta temática de princesas Disney con decoración en fondant y detalles artesanales.",
    price: "",
    image: "/assets/product-princesas.webp",
    category: "Tortas",
  },
  {
    id: "10",
    name: "Tarta Frutal Clásica",
    description:
      "Tarta con base crocante rellena de crema pastelera y decorada con kiwi, frutillas, duraznos y arándanos.",
    price: "",
    image: "/assets/product-frutal2.webp",
    category: "Tartas",
  },
  {
    id: "11",
    name: "Tarta de Membrillo",
    description: "Clásica tarta enrejada rellena de dulce de membrillo casero con masa quebrada artesanal.",
    price: "",
    image: "/assets/product-membrillo.webp",
    category: "Tartas",
  },
  {
    id: "12",
    name: "Torta de Golosinas",
    description:
      "Divertida torta cubierta de golosinas, chocolates, paletas y confites. Ideal para cumpleaños infantiles.",
    price: "",
    image: "/assets/product-golosinas2.webp",
    category: "Tortas",
  },
  {
    id: "13",
    name: "Torta de Chocolate Glaseada",
    description:
      "Elegante torta de chocolate con glaseado oscuro y detalles brillantes. Perfecta para celebraciones especiales.",
    price: "",
    image: "/assets/product-aries.webp",
    category: "Tortas",
  },
  {
    id: "14",
    name: "Torta Mariposas Rosa",
    description:
      "Delicada torta rosa decorada con mariposas de azúcar y perlitas. Perfecta para cumpleaños y baby showers.",
    price: "",
    image: "/assets/product-mariposas.webp",
    category: "Tortas",
  },
  {
    id: "15",
    name: "Torta Temática Infantil",
    description: "Torta personalizada con temática a elección, decoración en crema y topper artesanal.",
    price: "",
    image: "/assets/product-tiktok.webp",
    category: "Tortas",
  },
  {
    id: "16",
    name: "Torta de Personajes",
    description:
      "Torta temática con personajes animados y decoración personalizada. Ideal para cumpleaños infantiles.",
    price: "",
    image: "/assets/product-pokemon.webp",
    category: "Tortas",
  },
  {
    id: "17",
    name: "Torta Corporativa",
    description:
      "Torta personalizada para eventos corporativos y aniversarios de marca. Diseño a medida con logo incluido.",
    price: "",
    image: "/assets/product-secondlife.webp",
    category: "Tortas",
  },
  {
    id: "18",
    name: "Torta Temática Rosa",
    description: "Colorida torta temática con decoración en crema rosa y toppers personalizados.",
    price: "",
    image: "/assets/product-huntrix.webp",
    category: "Tortas",
  },
  {
    id: "19",
    name: "Torta para Adultos",
    description:
      "Original torta decorada con temática especial para celebraciones de adultos. Diseño único y personalizado.",
    price: "",
    image: "/assets/product-vino.webp",
    category: "Tortas",
  },
];
