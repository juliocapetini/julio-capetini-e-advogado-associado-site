import { newsletterFontClassName } from "@/lib/newsletter-fonts";

export default function ArtigosLayout({ children }: { children: React.ReactNode }) {
  return <div className={newsletterFontClassName}>{children}</div>;
}
