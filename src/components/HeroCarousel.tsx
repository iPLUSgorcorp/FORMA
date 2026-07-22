"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/products/m-technical-jacket-black-01.webp",
    eyebrow: "NEW COLLECTION",
    title: "Spring / Summer 2026",
    copy: "Modern essentials. Timeless style. Built for every day.",
    href: "/collections",
  },
  {
    image: "/images/products/w-wrap-coat-black-01.webp",
    eyebrow: "WOMEN / OUTERWEAR",
    title: "Quiet confidence",
    copy: "Sculpted silhouettes, precise construction, natural movement.",
    href: "/shop?department=women",
  },
  {
    image: "/images/products/m-relaxed-blazer-stone-01.webp",
    eyebrow: "FORMA TAILORING",
    title: "A modern uniform",
    copy: "Considered proportion for a clear, contemporary wardrobe.",
    href: "/shop?category=tailoring",
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((index) => (index + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <section className="home-hero" aria-label="Featured collection">
      {slides.map((item, index) => (
        <Image
          className={`home-hero-image ${active === index ? "active" : ""}`}
          src={item.image}
          alt=""
          fill
          priority={index === 0}
          sizes="100vw"
          key={item.image}
        />
      ))}
      <div className="home-hero-copy">
        <p className="eyebrow">{slide.eyebrow}</p>
        <h1>{slide.title}</h1>
        <p>{slide.copy}</p>
        <Link className="button button-light" href={slide.href}>Explore collection</Link>
      </div>
      <div className="hero-pagination" aria-label="Choose hero slide">
        {slides.map((item, index) => (
          <button
            className={active === index ? "active" : ""}
            aria-label={`Show ${item.title}`}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            key={item.title}
          >
            0{index + 1}
          </button>
        ))}
      </div>
      <div className="hero-assurances">
        <span>Complimentary shipping <small>On orders over $500</small></span>
        <span>Easy returns <small>Within 14 days</small></span>
        <span>Secure checkout <small>Demo experience</small></span>
      </div>
    </section>
  );
}
