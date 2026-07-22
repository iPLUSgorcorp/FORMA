import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = { title: "Collections" };

const collections = [
  { title: "Modern Tailoring", copy: "Precision with ease.", image: "/images/products/w-tailored-set-navy-01.webp", href: "/shop?category=tailoring" },
  { title: "Soft Structure", copy: "Outerwear for changing light.", image: "/images/products/w-wrap-coat-black-01.webp", href: "/shop?category=outerwear" },
  { title: "Material Objects", copy: "Leather shaped with restraint.", image: "/images/products/a-mini-top-handle-bag-oxblood-01.webp", href: "/shop?department=unisex" },
];

export default function CollectionsPage() {
  return (
    <main className="collections-page page-shell">
      <header className="collections-heading"><p className="eyebrow">FORMA / COLLECTIONS</p><h1>Designed as a system.<br />Worn as your own.</h1></header>
      <div className="collection-grid">
        {collections.map((item, index) => (
          <Link href={item.href} className={`collection-card card-${index + 1}`} key={item.title}>
            <Image src={item.image} alt={item.title} fill sizes="(max-width: 800px) 100vw, 50vw" />
            <div><p className="eyebrow">0{index + 1}</p><h2>{item.title}</h2><p>{item.copy}</p><ArrowUpRight size={22} /></div>
          </Link>
        ))}
      </div>
    </main>
  );
}
