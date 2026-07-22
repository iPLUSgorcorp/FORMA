import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="about-page page-shell">
      <section className="about-hero">
        <div><p className="eyebrow">ABOUT FORMA</p><h1>Clothes with clarity.</h1><p>FORMA is a demonstration fashion concept built around disciplined proportion, tactile materials, and objects made to live beyond a season.</p></div>
        <div className="about-image"><Image src="/images/products/w-sculpted-jumpsuit-slate-01.webp" alt="FORMA sculpted jumpsuit" fill priority sizes="55vw" /></div>
      </section>
      <section className="about-values">
        <article><span>01</span><h2>Form</h2><p>Every line has a reason, from a collar break to the curve of a trouser seam.</p></article>
        <article><span>02</span><h2>Material</h2><p>Texture is treated as information: dry wool, soft leather, compact knit.</p></article>
        <article><span>03</span><h2>Function</h2><p>Pieces are designed to combine quietly and work across the day.</p></article>
      </section>
      <section id="size-guide" className="information-section"><h2>Size guide</h2><p>FORMA uses a relaxed contemporary fit. Choose your regular size for the intended silhouette or size down for a closer line.</p></section>
      <section id="terms" className="information-section"><h2>Terms</h2><p>This website is a demonstration concept. Products and orders are fictional and no real transaction is processed.</p></section>
      <section id="privacy" className="information-section"><h2>Privacy</h2><p>Cart, wishlist, and language preferences are stored only in your browser through localStorage.</p></section>
      <Link className="button button-dark" href="/contact/en">Work with us</Link>
    </main>
  );
}
