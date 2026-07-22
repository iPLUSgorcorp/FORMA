import manifest from "../../public/images/products/manifest.json";
import type { Product } from "@/types/store";

const categoryPrice: Record<string, number> = {
  tailoring: 420,
  dresses: 340,
  tops: 160,
  knitwear: 210,
  bottoms: 270,
  outerwear: 390,
  jumpsuits: 360,
  accessories: 220,
  shoes: 260,
};

const categoryDescription: Record<string, string> = {
  tailoring: "Precise tailoring shaped for an easy, modern line. Built with restrained structure and fluid movement.",
  dresses: "A considered silhouette with architectural lines and a clean, confident drape.",
  tops: "A refined everyday layer designed around proportion, comfort, and quiet detail.",
  knitwear: "Fine-gauge texture and an effortless fit, made for considered daily dressing.",
  bottoms: "Sculpted volume and a clean waist create a modern, versatile foundation.",
  outerwear: "A protective outer layer with purposeful construction and understated presence.",
  jumpsuits: "A complete silhouette balancing disciplined tailoring with comfortable movement.",
  accessories: "A practical object refined through proportion, material, and subtle construction.",
  shoes: "A grounded everyday shape with considered lines and durable premium materials.",
};

const categoryMaterials: Record<string, string> = {
  tailoring: "Premium wool blend. Viscose lining. Dry clean only.",
  dresses: "Crepe or compact knit blend. Gentle specialist clean.",
  tops: "Natural-fibre blend. Cool hand wash or gentle dry clean.",
  knitwear: "Merino-cotton blend. Hand wash cold and dry flat.",
  bottoms: "Wool or cotton blend. Gentle dry clean.",
  outerwear: "Wool, cotton, or technical blend. Specialist clean.",
  jumpsuits: "Fluid crepe blend. Gentle dry clean.",
  accessories: "Premium leather or natural-fibre textile. Wipe clean.",
  shoes: "Leather upper and lining. Protect from prolonged moisture.",
};

const apparelSizes = ["XXS", "XS", "S", "M", "L", "XL"];

export const products: Product[] = manifest.products.map((item, index) => ({
  ...item,
  department: item.department as Product["department"],
  price: categoryPrice[item.category] + ((index * 15) % 95),
  description: categoryDescription[item.category] ?? categoryDescription.tops,
  materials: categoryMaterials[item.category] ?? categoryMaterials.tops,
  variants: item.variants.map((variant) => ({
    color: variant.color,
    images: variant.images.map((image) => `${manifest.webRoot}${image}`),
  })),
  sizes: ["accessories", "shoes"].includes(item.category)
    ? item.category === "shoes"
      ? ["36", "37", "38", "39", "40", "41", "42", "43"]
      : ["ONE SIZE"]
    : apparelSizes,
  isNew: index >= 14,
}));

export const productById = (id: string) => products.find((product) => product.id === id);

export const featuredProducts = [
  "w-tailored-set",
  "w-column-dress",
  "m-technical-jacket",
  "a-crescent-bag",
  "w-wrap-coat",
  "m-relaxed-blazer",
].map((id) => productById(id)!).filter(Boolean);

export const colorValue = (color: string) => {
  const colors: Record<string, string> = {
    black: "#161616",
    charcoal: "#3f403f",
    graphite: "#545556",
    ivory: "#e8e1d5",
    pearl: "#eee9df",
    oat: "#d9cbb5",
    camel: "#a47b55",
    sand: "#c6ad8a",
    stone: "#aaa49b",
    taupe: "#9c8978",
    smoke: "#9b9b99",
    mineral: "#bfc0bb",
    bone: "#e8e4da",
    navy: "#232c3d",
    ink: "#1d2638",
    slate: "#758190",
    sage: "#879180",
    olive: "#6e725c",
    clay: "#9a6e59",
    espresso: "#4a3026",
    burgundy: "#582b36",
    oxblood: "#4e2028",
  };
  return colors[color] ?? "#b7b1a8";
};
