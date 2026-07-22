import { notFound } from "next/navigation";
import { ContactView } from "@/components/ContactView";

export function generateStaticParams() { return [{ lang: "en" }, { lang: "ua" }]; }

export default async function LocalizedContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "ua") notFound();
  return <ContactView lang={lang} />;
}
