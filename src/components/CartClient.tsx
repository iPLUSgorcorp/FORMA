"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "@phosphor-icons/react";
import { useStore } from "@/context/StoreProvider";
import { productById } from "@/data/products";
import { formatPrice, titleCase } from "@/lib/format";
import { QuantityControl } from "@/components/QuantityControl";

export function CartClient() {
  const { cart, subtotal, updateQuantity, removeFromCart } = useStore();
  const shipping = subtotal > 0 && subtotal < 500 ? 15 : 0;
  const taxes = subtotal * 0.0875;
  const total = subtotal + shipping + taxes;

  if (cart.length === 0) {
    return (
      <main className="cart-page page-shell empty-cart">
        <p className="eyebrow">YOUR BAG</p>
        <h1>Your Cart</h1>
        <p>Your selection is currently empty.</p>
        <Link className="button button-dark" href="/shop">Explore the collection</Link>
      </main>
    );
  }

  return (
    <main className="cart-page page-shell">
      <div className="cart-title">
        <h1>Your Cart</h1>
        <p>{cart.reduce((sum, item) => sum + item.quantity, 0)} items</p>
      </div>
      <div className="cart-layout">
        <section className="cart-lines">
          {cart.map((item) => {
            const product = productById(item.productId);
            if (!product) return null;
            const variant = product.variants.find((entry) => entry.color === item.color) ?? product.variants[0];
            return (
              <article className="cart-line" key={`${item.productId}-${item.color}-${item.size}`}>
                <Link className="cart-line-image" href={`/product/${product.id}`}>
                  <Image src={variant.images[0]} alt={product.name} fill sizes="220px" />
                </Link>
                <div className="cart-line-info">
                  <Link href={`/product/${product.id}`}><h2>{product.name}</h2></Link>
                  <p>{titleCase(item.color)}</p>
                  <p>Size: {item.size}</p>
                </div>
                <QuantityControl value={item.quantity} onChange={(quantity) => updateQuantity(item, quantity)} min={0} />
                <p className="cart-line-price">{formatPrice(product.price * item.quantity)}</p>
                <button className="remove-line" aria-label={`Remove ${product.name}`} onClick={() => removeFromCart(item)}><X size={17} /></button>
              </article>
            );
          })}
          <Link className="continue-link" href="/shop">← Continue shopping</Link>
        </section>
        <aside className="order-summary">
          <h2>Order Summary</h2>
          <dl>
            <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div><dt>Shipping</dt><dd>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd></div>
            <div><dt>Taxes</dt><dd>{formatPrice(taxes)}</dd></div>
          </dl>
          <div className="summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
          <Link className="button button-dark summary-button" href="/checkout">Checkout</Link>
          <p className="demo-note">Demonstration checkout. No real payment will be collected.</p>
          <div className="payment-marks">VISA&nbsp;&nbsp; ●● &nbsp;&nbsp;AMEX&nbsp;&nbsp; PayPal</div>
        </aside>
      </div>
    </main>
  );
}
