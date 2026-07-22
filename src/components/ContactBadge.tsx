import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function ContactBadge() {
  return (
    <Link className="contact-badge" href="/contact/en" aria-label="Open the FORMA contact page">
      <span className="ig-mark">I✦G</span>
      <span>Click to get in touch</span>
      <ArrowUpRight size={16} weight="light" />
    </Link>
  );
}
