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
      <span className="font-serif text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl">
        {site.shortName}
      </span>
    );
  }

  return (
    <span className="inline-flex min-h-[3.25rem] items-center sm:min-h-[4rem] md:min-h-[4.75rem] lg:min-h-[5.25rem]">
      {/* eslint-disable-next-line @next/next/no-img-element -- PNG local; next/image falhava e activava fallback */}
      <img
        key={site.logoSrc}
        src={site.logoSrc}
        alt=""
        width={480}
        height={120}
        className="h-[3.25rem] w-auto max-w-[min(92vw,420px)] object-contain object-left sm:h-16 sm:max-w-[min(90vw,480px)] md:h-[4.75rem] md:max-w-[min(85vw,520px)] lg:h-[5.25rem] lg:max-w-[560px]"
        fetchPriority="high"
        decoding="async"
        onError={() => setBroken(true)}
      />
    </span>
  );
}
