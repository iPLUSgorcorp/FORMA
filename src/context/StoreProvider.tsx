"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { productById } from "@/data/products";
import type { CartItem } from "@/types/store";

type StoreContextValue = {
  cart: CartItem[];
  wishlist: string[];
  language: "en" | "ua";
  cartCount: number;
  subtotal: number;
  addToCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  setLanguage: (language: "en" | "ua") => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const sameLine = (a: CartItem, b: CartItem) =>
  a.productId === b.productId && a.color === b.color && a.size === b.size;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [language, setLanguageState] = useState<"en" | "ua">("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const savedCart = window.localStorage.getItem("forma-cart");
      const savedWishlist = window.localStorage.getItem("forma-wishlist");
      const savedLanguage = window.localStorage.getItem("forma-language");
      if (savedCart) setCart(JSON.parse(savedCart) as CartItem[]);
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist) as string[]);
      if (savedLanguage === "ua" || savedLanguage === "en") setLanguageState(savedLanguage);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem("forma-cart", JSON.stringify(cart));
  }, [cart, ready]);

  useEffect(() => {
    if (ready) window.localStorage.setItem("forma-wishlist", JSON.stringify(wishlist));
  }, [wishlist, ready]);

  const addToCart = useCallback((item: CartItem) => {
    setCart((current) => {
      const existing = current.find((entry) => sameLine(entry, item));
      if (!existing) return [...current, item];
      return current.map((entry) =>
        sameLine(entry, item)
          ? { ...entry, quantity: entry.quantity + item.quantity }
          : entry,
      );
    });
  }, []);

  const updateQuantity = useCallback((item: CartItem, quantity: number) => {
    if (quantity <= 0) {
      setCart((current) => current.filter((entry) => !sameLine(entry, item)));
      return;
    }
    setCart((current) =>
      current.map((entry) => (sameLine(entry, item) ? { ...entry, quantity } : entry)),
    );
  }, []);

  const removeFromCart = useCallback((item: CartItem) => {
    setCart((current) => current.filter((entry) => !sameLine(entry, item)));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }, []);

  const setLanguage = useCallback((nextLanguage: "en" | "ua") => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("forma-language", nextLanguage);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => {
    const product = productById(item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      language,
      cartCount,
      subtotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart: () => setCart([]),
      toggleWishlist,
      setLanguage,
    }),
    [cart, wishlist, language, cartCount, subtotal, addToCart, updateQuantity, removeFromCart, toggleWishlist, setLanguage],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
