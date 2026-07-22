"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Heart } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import type { Product } from "@/types/store";
import { colorValue, products } from "@/data/products";
import { formatPrice, titleCase } from "@/lib/format";
import { useStore } from "@/context/StoreProvider";
import { QuantityControl } from "@/components/QuantityControl";
import { ProductCard } from "@/components/ProductCard";

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [variantIndex, setVariantIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState(product.sizes[Math.min(3, product.sizes.length - 1)]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const variant = product.variants[variantIndex];
  const images = useMemo(() => variant.images, [variant.images]);
  const saved = wishlist.includes(product.id);
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

  const add = () => {
    addToCart({ productId: product.id, color: variant.color, size, quantity });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  return (
    <main className="product-page page-shell">
      <div className="product-layout">
        <div className="thumbnail-rail">
          {product.variants.flatMap((item, vIndex) => item.images.map((image, iIndex) => (
            <button
              className={vIndex === variantIndex && iIndex === imageIndex ? "active" : ""}
              onClick={() => { setVariantIndex(vIndex); setImageIndex(iIndex); }}
              aria-label={`View ${item.color} image ${iIndex + 1}`}
              key={`${image}-${iIndex}`}
            >
              <Image src={image} alt="" fill sizes="90px" />
            </button>
          )))}
        </div>
        <div className="product-main-image">
          <Image src={images[Math.min(imageIndex, images.length - 1)]} alt={`${product.name} in ${variant.color}`} fill priority sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <section className="product-info">
          <p className="eyebrow">{product.department} / {product.category}</p>
          <h1>{product.name}</h1>
          <p className="product-price">{formatPrice(product.price)}</p>
          <p className="product-description">{product.description}</p>
          <div className="product-rule" />
          <div className="option-block">
            <p className="eyebrow">COLOR: {variant.color}</p>
            <div className="swatches">
              {product.variants.map((item, index) => (
                <button
                  className={variantIndex === index ? "active" : ""}
                  style={{ backgroundColor: colorValue(item.color) }}
                  aria-label={titleCase(item.color)}
                  title={titleCase(item.color)}
                  onClick={() => { setVariantIndex(index); setImageIndex(0); }}
                  key={item.color}
                />
              ))}
            </div>
          </div>
          <div className="option-block">
            <div className="option-heading"><p className="eyebrow">SIZE:</p><Link href="/about#size-guide">Size Guide</Link></div>
            <div className="sizes">
              {product.sizes.map((item) => (
                <button className={size === item ? "active" : ""} onClick={() => setSize(item)} key={item}>{item}</button>
              ))}
            </div>
          </div>
          <div className="buy-row">
            <QuantityControl value={quantity} onChange={setQuantity} />
            <button className="button button-dark add-button" onClick={add}>
              {added ? <><Check size={17} /> Added to cart</> : "Add to cart"}
            </button>
          </div>
          <button className={`wishlist-button ${saved ? "saved" : ""}`} onClick={() => toggleWishlist(product.id)}>
            <Heart size={20} weight={saved ? "fill" : "light"} /> {saved ? "Saved to wishlist" : "Save to wishlist"}
          </button>
          <div className="product-accordions">
            <details><summary>Details</summary><p>{product.description}</p></details>
            <details><summary>Materials &amp; care</summary><p>{product.materials}</p></details>
            <details><summary>Shipping &amp; returns</summary><p>Complimentary shipping over $500. Returns accepted within 14 days of delivery.</p></details>
          </div>
        </section>
      </div>
      {related.length > 0 && (
        <section className="related-section">
          <div className="section-heading"><p className="eyebrow">YOU MAY ALSO LIKE</p><Link href="/shop">View all</Link></div>
          <div className="related-grid">{related.map((item) => <ProductCard product={item} key={item.id} />)}</div>
        </section>
      )}
    </main>
  );
}
