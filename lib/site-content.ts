/** Conteúdo institucional — ajuste nomes, textos e imagens conforme o escritório. */

export const site = {
  name: "Julio Capetini e Advogado associado",
  shortName: "Julio Capetini",
  /**
   * Logotipo em `public/images/logo.png` → `/images/logo.png`.
   * Se colocar na raiz de `public/`, use `/logo.png`.
   */
  logoSrc: "/images/logo.png",
  tagline: "Advocacia estratégica, com ética e resultados.",
  /** Parágrafos exibidos no hero; para meta tags use `siteMetaDescription`. */
  description: [
    "Resolva seu problema jurídico com agilidade e competência.",
    "Buscamos sempre os melhores resultados com estratégias adequadas ao seu caso.",
    "Atendimento on-line para todo Brasil.",
  ],
  phoneDisplay: "(21) 99999-9999",
  phoneTel: "+5521999999999",
  whatsappE164: "5521999999999",
  email: "contato@pauloadv.com.br",
  /** Texto para rodapé e contacto (sem endereço fixo de sede). */
  serviceAreaLine: "Atendimento online em todo o Brasil. Reuniões presenciais mediante agendamento.",
} as const;

/** Descrição num único texto para `<meta>`, Open Graph e JSON-LD. */
export const siteMetaDescription = site.description.join(" ");

export const teamMembers = [
  {
    name: "Paulo Cesar",
    oab: "OAB/RJ nº 243.275",
    role: "Atuação no Direito público e privado",
    bio: [
      "Bacharel em Direito.",
      "Pós-graduação em Direito Processual Civil e Direito Civil.",
      "Pós-graduação em Direito Financeiro e tributário.",
      "Pós-graduado em Direito público e privado aplicado pela ESMAGES - Escola Superior de Magistratura do ES.",
      "Foi Residente Jurídico pelo Tribunal de Justiça do Espírito Santo.",
      "Pós-graduando em inteligência artificial para o Direito.",
    ],
    image: "/images/paulo.jpg",
  },
  {
    name: "Júlio Capetini",
    oab: "OAB/ES nº 39.735",
    role: "Atuação em diversas frentes do Direito",
    bio: [
      "Bacharel em direito.",
      "Pós-graduação em direito penal e processual penal.",
      "Atuou como Assessor de Juiz de Direito do TJES por 14 anos.",
    ],
    image: "/images/julio.jpg",
  },
] as const;

/** Imagem para partilhas (Open Graph / redes) — usa o logótipo do site (`site.logoSrc`). */
export const defaultSocialImage = {
  src: site.logoSrc,
  alt: site.name,
} as const;

/** Áreas de atuação (apenas títulos — sem descrição na página). */
export const specialties = [
  "Direito Civil",
  "Direito de família",
  "Direito Previdenciário",
  "Direito Trabalhista",
  "Direito do Consumidor",
  "Direito Tributário",
  "Direito criminal",
  "Direito Público",
] as const;

/** Blocos da secção “Atendimento” (substitui galeria de escritório físico). */
export const atendimentoHighlights = [
  {
    title: "100% digital",
    description:
      "Consultas e acompanhamento processual com comunicação por e-mail, telefone e videoconferência, no ritmo que o seu caso exige.",
  },
  {
    title: "Todo o Brasil",
    description:
      "Atuamos com foco em demandas que podem ser conduzidas remotamente, com clareza e segurança.",
  },
  {
    title: "Presencial sob agendamento",
    description:
      "Quando fizer sentido para o caso, é possível combinar encontro presencial — mediante marcação prévia.",
  },
] as const;
