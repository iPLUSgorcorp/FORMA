"use client";

import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react";
import { useState, type FormEvent } from "react";
import { useStore } from "@/context/StoreProvider";
import { formatPrice } from "@/lib/format";

export function CheckoutClient() {
  const { cart, subtotal, clearCart } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const shipping = subtotal > 0 && subtotal < 500 ? 15 : 0;
  const total = subtotal + shipping + subtotal * 0.0875;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <main className="checkout-page page-shell checkout-success">
        <CheckCircle size={52} weight="light" />
        <p className="eyebrow">DEMO ORDER CONFIRMED</p>
        <h1>Thank you.</h1>
        <p>Your demonstration order has been recorded locally. No payment was processed.</p>
        <Link className="button button-dark" href="/shop">Return to shop</Link>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page page-shell checkout-success">
        <h1>Your bag is empty.</h1>
        <Link className="button button-dark" href="/shop">Continue shopping</Link>
      </main>
    );
  }

  return (
    <main className="checkout-page page-shell">
      <div className="checkout-heading"><p className="eyebrow">SECURE DEMO CHECKOUT</p><h1>Checkout</h1></div>
      <form className="checkout-layout" onSubmit={submit}>
        <div className="checkout-form">
          <fieldset>
            <legend>Contact</legend>
            <label>Email<input required type="email" placeholder="you@example.com" /></label>
            <label>Phone<input required type="tel" placeholder="+380" /></label>
          </fieldset>
          <fieldset>
            <legend>Shipping address</legend>
            <div className="form-grid">
              <label>First name<input required /></label>
              <label>Last name<input required /></label>
              <label className="full">Address<input required /></label>
              <label>City<input required /></label>
              <label>Postal code<input required /></label>
              <label className="full">Country<select defaultValue="Ukraine"><option>Ukraine</option><option>United States</option><option>United Kingdom</option><option>Germany</option><option>France</option></select></label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Payment — demonstration only</legend>
            <label className="radio-row"><input required name="payment" type="radio" defaultChecked /> Demo card</label>
            <label className="radio-row"><input required name="payment" type="radio" /> PayPal demo</label>
            <p className="demo-note">No card details are requested and no transaction will occur.</p>
          </fieldset>
        </div>
        <aside className="checkout-summary">
          <h2>Order summary</h2>
          <p>{cart.reduce((sum, item) => sum + item.quantity, 0)} items</p>
          <div><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div><span>Shipping</span><span>{shipping ? formatPrice(shipping) : "Complimentary"}</span></div>
          <div className="checkout-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
          <button className="button button-dark" type="submit">Place demo order</button>
        </aside>
      </form>
    </main>
  );
}
