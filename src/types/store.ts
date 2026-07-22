export type ProductVariant = {
  color: string;
  images: string[];
};

export type Product = {
  id: string;
  name: string;
  department: "women" | "men" | "unisex";
  category: string;
  price: number;
  description: string;
  materials: string;
  variants: ProductVariant[];
  sizes: string[];
  isNew: boolean;
};

export type CartItem = {
  productId: string;
  color: string;
  size: string;
  quantity: number;
};
