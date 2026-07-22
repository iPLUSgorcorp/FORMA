"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products, colorValue } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/context/StoreProvider";
import { titleCase } from "@/lib/format";

const colors = Array.from(new Set(products.flatMap((product) => product.variants.map((variant) => variant.color))));
const categories = Array.from(new Set(products.map((product) => product.category)));

export function ShopClient() {
  const params = useSearchParams();
  const { wishlist } = useStore();
  const [department, setDepartment] = useState(params.get("department") ?? "all");
  const [category, setCategory] = useState(params.get("category") ?? "all");
  const [color, setColor] = useState("all");
  const [sort, setSort] = useState("newest");
  const wishlistOnly = params.get("wishlist") === "true";

  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      if (wishlistOnly && !wishlist.includes(product.id)) return false;
      if (department !== "all" && product.department !== department) return false;
      if (category !== "all" && product.category !== category) return false;
      if (color !== "all" && !product.variants.some((variant) => variant.color === color)) return false;
      return true;
    });
    return result.toSorted((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return Number(b.isNew) - Number(a.isNew);
    });
  }, [department, category, color, sort, wishlist, wishlistOnly]);

  const clear = () => {
    setDepartment("all");
    setCategory("all");
    setColor("all");
  };

  return (
    <main className="shop-page page-shell">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">{wishlistOnly ? "SAVED PIECES" : "FORMA / SHOP"}</p>
          <h1>{wishlistOnly ? "Wishlist" : "All Products"}</h1>
        </div>
        <label className="sort-control">
          <span>SORT BY:</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to high</option>
            <option value="price-high">Price: High to low</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>
      <div className="shop-layout">
        <aside className="filters">
          <details open>
            <summary>CATEGORY</summary>
            <div className="filter-list">
              {["all", "women", "men", "unisex"].map((value) => (
                <button className={department === value ? "active" : ""} onClick={() => setDepartment(value)} key={value}>
                  <span />{titleCase(value)}
                </button>
              ))}
            </div>
          </details>
          <details open>
            <summary>PRODUCT TYPE</summary>
            <div className="filter-list compact">
              {["all", ...categories].map((value) => (
                <button className={category === value ? "active" : ""} onClick={() => setCategory(value)} key={value}>
                  <span />{titleCase(value)}
                </button>
              ))}
            </div>
          </details>
          <details open>
            <summary>COLOR</summary>
            <div className="color-filter">
              <button className={color === "all" ? "active" : ""} onClick={() => setColor("all")} aria-label="All colors">ALL</button>
              {colors.slice(0, 12).map((value) => (
                <button
                  className={color === value ? "active" : ""}
                  style={{ backgroundColor: colorValue(value) }}
                  onClick={() => setColor(value)}
                  aria-label={titleCase(value)}
                  title={titleCase(value)}
                  key={value}
                />
              ))}
            </div>
          </details>
          <button className="text-button" onClick={clear}>Clear filters</button>
        </aside>
        <section aria-live="polite">
          <div className="results-count">{filtered.length} PRODUCTS</div>
          {filtered.length > 0 ? (
            <div className="product-grid">
              {filtered.map((product) => <ProductCard product={product} key={product.id} />)}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No pieces found</h2>
              <p>Try clearing one or more filters.</p>
              <button className="button button-dark" onClick={clear}>Reset filters</button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
