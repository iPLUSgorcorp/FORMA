import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Lookbook" };

const thumbnails = [
  ["/images/products/w-column-dress-pearl-01.webp", "Fold-Neck Column Dress"],
  ["/images/products/m-utility-overshirt-olive-01.webp", "Panelled Utility Overshirt"],
  ["/images/products/w-tailored-set-camel-01.webp", "Sculpted Tailoring"],
  ["/images/products/w-sculpted-jumpsuit-slate-01.webp", "Wide-Leg Jumpsuit"],
];

export default function LookbookPage() {
  return (
    <main className="lookbook-page page-shell">
      <section className="lookbook-hero">
        <aside className="season-marker">SPRING / SUMMER 26</aside>
        <div className="lookbook-copy">
          <p className="eyebrow">LOOKBOOK</p>
          <h1>Urban<br />Essentials</h1>
          <p>A study in form and function. Timeless pieces for a modern perspective.</p>
          <strong>SPRING / SUMMER 26</strong>
          <div className="lookbook-pages"><span className="active">01</span><span>02</span><span>03</span></div>
        </div>
        <Link className="lookbook-main-image" href="/product/w-tailored-set">
          <Image src="/images/products/w-tailored-set-ivory-01.webp" alt="FORMA urban essentials tailoring" fill priority sizes="70vw" />
        </Link>
      </section>
      <section className="lookbook-grid">
        {thumbnails.map(([image, label]) => (
          <Link href="/shop" key={image}>
            <Image src={image} alt={label} fill sizes="25vw" /><span>{label}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
