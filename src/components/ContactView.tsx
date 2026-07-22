"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Asterisk, GlobeHemisphereWest, Rows, Sparkle } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useStore } from "@/context/StoreProvider";

const content = {
  en: {
    eyebrow: "COLLABORATE",
    title: <>Bring refined<br />fashion e-commerce<br />to your brand.</>,
    body: "Looking for a custom website, storefront, or product interface with this level of quality? Our team designs and builds premium digital experiences for fashion brands that value clarity, performance, and timeless design.",
    write: "WRITE TO US DIRECTLY",
    email: "Email us",
    concepts: "View concepts",
    service1: ["Web Design", "High-end websites and brand experiences crafted with precision."],
    service2: ["E-commerce", "Conversion-focused storefronts with elegant product experiences."],
    service3: ["SaaS Interfaces", "Clean, scalable interfaces for complex platforms and tools."],
    quote: <>Quiet confidence.<br />Clear systems.<br />Design that sells<br />with taste.</>,
  },
  ua: {
    eyebrow: "СПІВПРАЦЮВАТИ",
    title: <>Створимо вишуканий<br />fashion e-commerce<br />для вашого бренду.</>,
    body: "Потрібен сайт, інтернет-магазин або інтерфейс продукту такого рівня? Наша команда проєктує та створює преміальні цифрові рішення для fashion-брендів, які цінують ясність, ефективність і позачасовий дизайн.",
    write: "НАПИШІТЬ НАМ НАПРЯМУ",
    email: "Написати",
    concepts: "Переглянути концепти",
    service1: ["Вебдизайн", "Сайти преміального рівня та бренд-досвід, створені з точністю."],
    service2: ["Інтернет-магазини", "Storefront-рішення, що працюють на конверсію та елегантний UX."],
    service3: ["SaaS-інтерфейси", "Чисті масштабовані інтерфейси для складних платформ."],
    quote: <>Тиха впевненість.<br />Чіткі системи.<br />Дизайн, що продає<br />зі смаком.</>,
  },
};

export function ContactView({ lang }: { lang: "en" | "ua" }) {
  const { setLanguage } = useStore();
  const text = content[lang];
  useEffect(() => setLanguage(lang), [lang, setLanguage]);

  const mail = "mailto:igorcorp.tech@gmail.com?subject=FORMA%20fashion%20e-commerce%20collaboration";
  return (
    <main className="contact-page">
      <div className="contact-language"><Link className={lang === "en" ? "active" : ""} href="/contact/en">EN</Link><span>|</span><Link className={lang === "ua" ? "active" : ""} href="/contact/ua">UA</Link></div>
      <section className="contact-copy">
        <p className="eyebrow">{text.eyebrow} <Sparkle size={14} weight="fill" /></p>
        <h1>{text.title}</h1>
        <p className="contact-intro">{text.body}</p>
        <a className="contact-email-card" href={mail}>
          <span className="email-star"><Asterisk size={24} /></span>
          <span><small>{text.write}</small><strong>igorcorp.tech@gmail.com</strong></span>
          <ArrowUpRight size={24} weight="light" />
        </a>
        <div className="contact-actions">
          <a className="button button-dark" href={mail}>{text.email}<ArrowUpRight size={16} /></a>
          <Link className="button button-outline" href="/collections">{text.concepts}<ArrowUpRight size={16} /></Link>
        </div>
        <div className="services-grid">
          <article><Sparkle size={21} /><h2>{text.service1[0]}</h2><p>{text.service1[1]}</p></article>
          <article><Rows size={21} /><h2>{text.service2[0]}</h2><p>{text.service2[1]}</p></article>
          <article><GlobeHemisphereWest size={21} /><h2>{text.service3[0]}</h2><p>{text.service3[1]}</p></article>
        </div>
      </section>
      <section className="contact-visual">
        <Image src="/images/products/w-wrap-coat-black-01.webp" alt="FORMA black wrap coat" fill priority sizes="50vw" />
        <p>{text.quote}</p>
      </section>
    </main>
  );
}
