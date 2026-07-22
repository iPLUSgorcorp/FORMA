"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "@phosphor-icons/react";
import type { Product } from "@/types/store";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/context/StoreProvider";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useStore();
  const saved = wishlist.includes(product.id);

  return (
    <article className="product-card">
      <Link className="product-image" href={`/product/${product.id}`}>
        <Image
          src={product.variants[0].images[0]}
          alt={`${product.name} in ${product.variants[0].color}`}
          fill
          sizes="(max-width: 720px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {product.isNew && <span className="new-label">NEW</span>}
      </Link>
      <button
        className={`card-wishlist ${saved ? "saved" : ""}`}
        aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        onClick={() => toggleWishlist(product.id)}
      >
        <Heart size={19} weight={saved ? "fill" : "light"} />
      </button>
      <div className="product-meta">
        <Link href={`/product/${product.id}`}>{product.name}</Link>
        <span>{formatPrice(product.price)}</span>
      </div>
      <p>{product.variants.length} {product.variants.length === 1 ? "color" : "colors"}</p>
    </article>
  );
}
