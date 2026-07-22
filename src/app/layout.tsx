import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "./globals.css";
import { StoreProvider } from "@/context/StoreProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactBadge } from "@/components/ContactBadge";

export const metadata: Metadata = {
  title: { default: "FORMA — Architectural Essentials", template: "%s — FORMA" },
  description: "A demonstration premium fashion e-commerce concept by FORMA.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          {children}
          <Footer />
          <ContactBadge />
        </StoreProvider>
      </body>
    </html>
  );
}
