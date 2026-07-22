import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductCard } from "@/components/ProductCard";
import { featuredProducts } from "@/data/products";

export default function Home() {
  return (
    <main className="home-page">
      <HeroCarousel />
      <section className="home-products page-shell">
        <div className="section-heading">
          <div><p className="eyebrow">SELECTED PIECES</p><h2>New essentials</h2></div>
          <Link href="/shop">View all <ArrowRight size={16} /></Link>
        </div>
        <div className="home-product-grid">
          {featuredProducts.slice(0, 4).map((product) => <ProductCard product={product} key={product.id} />)}
        </div>
      </section>
      <section className="home-editorial page-shell">
        <div className="editorial-copy">
          <p className="eyebrow">FORMA / 01</p>
          <h2>Built around<br />form and function.</h2>
          <p>A concise wardrobe shaped by architecture, tactility, and the rhythm of everyday life.</p>
          <Link className="text-link" href="/lookbook">Explore the lookbook <ArrowRight size={16} /></Link>
        </div>
        <Link className="editorial-image large" href="/lookbook">
          <Image src="/images/products/w-tailored-set-ivory-01.webp" alt="Ivory FORMA tailored set" fill sizes="60vw" />
        </Link>
        <Link className="editorial-image small" href="/product/a-crescent-bag">
          <Image src="/images/products/a-crescent-bag-black-01.webp" alt="Black crescent shoulder bag" fill sizes="30vw" />
        </Link>
      </section>
    </main>
  );
}
