import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand footer-brand" href="/">FORMA</Link>
        <p>Digital essentials for modern wardrobes.<br />Refined design. Timeless impact.</p>
      </div>
      <nav>
        <Link href="/shop">Shop</Link>
        <Link href="/lookbook">Lookbook</Link>
        <Link href="/collections">Collections</Link>
        <Link href="/about">About</Link>
      </nav>
      <nav>
        <Link href="/contact/en">Contact</Link>
        <a href="mailto:igorcorp.tech@gmail.com?subject=FORMA%20collaboration">Collaboration</a>
        <Link href="/about#terms">Terms</Link>
        <Link href="/about#privacy">Privacy</Link>
      </nav>
      <div>
        <p className="eyebrow">STUDIO</p>
        <a href="mailto:igorcorp.tech@gmail.com">igorcorp.tech@gmail.com</a>
        <p>Kyiv, Ukraine<br />Available worldwide</p>
      </div>
    </footer>
  );
}
