"use client";

import { useState } from "react";
import { site } from "@/lib/site-content";

/**
 * Logotipo em `public/images/logo.png` (URL pública `/images/logo.png`).
 * Usa `<img>` nativo para evitar falhas do `next/image` com alguns ficheiros PNG.
 */
export function SiteLogo() {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <span className="font-serif text-xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-2xl">
        {site.shortName}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center">
      {/* eslint-disable-next-line @next/next/no-img-element -- PNG local; next/image falhava e activava fallback */}
      <img
        key={site.logoSrc}
        src={site.logoSrc}
        alt=""
        width={480}
        height={120}
        className="h-10 w-auto max-w-[min(70vw,260px)] object-contain object-left sm:h-12 sm:max-w-[320px] md:h-14 md:max-w-[380px] lg:h-16 lg:max-w-[440px]"
        fetchPriority="high"
        decoding="async"
        onError={() => setBroken(true)}
      />
    </span>
  );
}
