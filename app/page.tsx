import { AboutTeamSection } from "@/components/home/about-team-section";
import { ContactSection } from "@/components/home/contact-section";
import { HeroSection } from "@/components/home/hero-section";
import { AtendimentoSection } from "@/components/home/atendimento-section";
import { SpecialtiesSection } from "@/components/home/specialties-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutTeamSection />
      <SpecialtiesSection />
      <AtendimentoSection />
      <ContactSection />
    </>
  );
}
