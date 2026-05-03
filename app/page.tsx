import { AboutTeamSection } from "@/components/home/about-team-section";
import { ContactSection } from "@/components/home/contact-section";
import { HeroSection } from "@/components/home/hero-section";
import { AtendimentoSection } from "@/components/home/atendimento-section";
import { SpecialtiesSection } from "@/components/home/specialties-section";

export default function Home() {
  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-white"
      >
        Ir para o conteúdo
      </a>
      <HeroSection />
      <AboutTeamSection />
      <SpecialtiesSection />
      <AtendimentoSection />
      <ContactSection />
    </>
  );
}
