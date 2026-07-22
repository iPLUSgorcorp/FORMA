import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopClient } from "@/components/ShopClient";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return <Suspense fallback={<main className="page-shell loading-page">Loading collection…</main>}><ShopClient /></Suspense>;
}
