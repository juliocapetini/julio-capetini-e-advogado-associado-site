import { IconWhatsApp } from "@/components/icons/ui-icons";
import { site } from "@/lib/site-content";

export function WhatsAppFloat() {
  const label = `Falar com o advogado — ${site.phoneDisplay}`;
  return (
    <div className="group fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      <span
        aria-hidden
        className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[var(--color-ink)] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-md transition-all duration-200 group-hover:right-[4.5rem] group-hover:opacity-100 group-focus-within:right-[4.5rem] group-focus-within:opacity-100"
      >
        Falar no WhatsApp
      </span>
      <a
        href={`https://wa.me/${site.whatsappE164}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 ring-4 ring-white/80 transition hover:scale-105 hover:shadow-xl"
      >
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] soft-ping"
          aria-hidden
        />
        <IconWhatsApp className="relative h-7 w-7" />
      </a>
    </div>
  );
}
