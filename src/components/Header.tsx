"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Handbag,
  Heart,
  List,
  MagnifyingGlass,
  User,
  X,
} from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { useStore } from "@/context/StoreProvider";

const links = [
  ["Shop", "/shop"],
  ["Lookbook", "/lookbook"],
  ["Collections", "/collections"],
  ["About", "/about"],
];

export function Header() {
  const pathname = usePathname();
  const { cartCount, wishlist } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dark = pathname === "/";

  const results = useMemo(
    () =>
      query.trim().length < 2
        ? []
        : products
            .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 6),
    [query],
  );

  return (
    <>
      <header className={`site-header ${dark ? "is-dark" : ""}`}>
        <Link className="brand" href="/" aria-label="FORMA home">
          FORMA
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link className={pathname === href ? "active" : ""} href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button aria-label="Search" onClick={() => setSearchOpen(true)}>
            <MagnifyingGlass size={22} weight="light" />
          </button>
          <button aria-label="Demo account" onClick={() => setAccountOpen((open) => !open)}>
            <User size={22} weight="light" />
          </button>
          <Link className="wishlist-link" href="/shop?wishlist=true" aria-label="Wishlist">
            <Heart size={21} weight="light" />
            {wishlist.length > 0 && <span>{wishlist.length}</span>}
          </Link>
          <Link className="cart-link" href="/cart" aria-label={`Cart with ${cartCount} items`}>
            <Handbag size={23} weight="light" />
            <span>{cartCount}</span>
          </Link>
          <button className="menu-toggle" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <List size={24} weight="light" />
          </button>
        </div>
        {accountOpen && (
          <div className="account-popover">
            <p className="eyebrow">DEMO ACCOUNT</p>
            <p>Sign-in is intentionally disabled for this concept store.</p>
            <Link href="/contact/en" onClick={() => setAccountOpen(false)}>Contact client care</Link>
          </div>
        )}
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation">
          <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <X size={28} weight="light" />
          </button>
          <Link className="brand" href="/" onClick={() => setMenuOpen(false)}>FORMA</Link>
          <nav>
            {links.map(([label, href]) => (
              <Link href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</Link>
            ))}
            <Link href="/cart" onClick={() => setMenuOpen(false)}>Cart ({cartCount})</Link>
            <Link href="/contact/en" onClick={() => setMenuOpen(false)}>Contact</Link>
          </nav>
        </div>
      )}

      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Product search">
          <div className="search-panel">
            <div className="search-row">
              <MagnifyingGlass size={25} weight="light" />
              <input
                autoFocus
                aria-label="Search products"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the collection"
              />
              <button aria-label="Close search" onClick={() => setSearchOpen(false)}><X size={24} /></button>
            </div>
            <div className="search-results">
              {query.length >= 2 && results.length === 0 && <p>No products found.</p>}
              {results.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id} onClick={() => setSearchOpen(false)}>
                  <span>{product.name}</span><small>{product.category}</small>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
