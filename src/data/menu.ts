import burrata from "@/assets/burrata.jpg";
import costela from "@/assets/costela.jpg";
import fondant from "@/assets/fondant.jpg";
import ginTonica from "@/assets/gin-tonica.jpg";
import risoto from "@/assets/risoto.jpg";
import salmao from "@/assets/salmao.jpg";
import scallop from "@/assets/scallop.jpg";
import tiramisu from "@/assets/tiramisu.jpg";

export type Category = "Entradas" | "Principais" | "Sobremesas" | "Coquetéis";

export const CATEGORIES: Category[] = [
  "Entradas",
  "Principais",
  "Sobremesas",
  "Coquetéis",
];

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "scallop",
    name: "Scallop à Manteiga de Noisette",
    description:
      "Vieiras douradas, manteiga de noisette, alho-poró grelhado e emulsão de cítricos.",
    price: 78,
    category: "Entradas",
    image: scallop,
  },
  {
    id: "burrata",
    name: "Burrata com Tomates Heirloom",
    description:
      "Burrata cremosa, tomates heirloom, azeite de manjericão e pérolas de balsâmico.",
    price: 54,
    category: "Entradas",
    image: burrata,
  },
  {
    id: "costela",
    name: "Costela Braseada ao Vinho",
    description:
      "Costela cozida lentamente em vinho tinto, polenta cremosa e jus encorpado.",
    price: 92,
    category: "Principais",
    image: costela,
  },
  {
    id: "risoto",
    name: "Risoto de Trufa Negra",
    description:
      "Arroz carnaroli, trufa negra laminada, parmesão 24 meses e microverdes.",
    price: 84,
    category: "Principais",
    image: risoto,
  },
  {
    id: "salmao",
    name: "Salmão Grelhado ao Beurre Blanc",
    description:
      "Salmão de pele crocante, aspargos verdes e beurre blanc de limão siciliano.",
    price: 88,
    category: "Principais",
    image: salmao,
  },
  {
    id: "fondant",
    name: "Fondant de Chocolate 70%",
    description:
      "Centro cremoso de chocolate amargo, sorvete de baunilha e folha de ouro.",
    price: 38,
    category: "Sobremesas",
    image: fondant,
  },
  {
    id: "tiramisu",
    name: "Tiramisù Clássico",
    description:
      "Mascarpone aerado, savoiardi embebidos em espresso e cacau belga.",
    price: 32,
    category: "Sobremesas",
    image: tiramisu,
  },
  {
    id: "gin-tonica",
    name: "Citrus Gin Tônica",
    description:
      "Gin cítrico, tônica premium, grapefruit desidratado e um toque de alecrim.",
    price: 34,
    category: "Coquetéis",
    image: ginTonica,
  },
];

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
