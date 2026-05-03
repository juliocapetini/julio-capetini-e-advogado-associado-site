import { site, siteMetaDescription, teamMembers } from "@/lib/site-content";
import { getSiteUrlString } from "@/lib/site-url";

/** Dados estruturados schema.org (LegalService, WebSite, advogados). */
export function JsonLd() {
  const origin = getSiteUrlString();

  const graph: Record<string, unknown>[] = [
    {
      "@type": "LegalService",
      "@id": `${origin}/#legal-service`,
      name: site.name,
      url: origin,
      image: `${origin}${site.logoSrc}`,
      description: siteMetaDescription,
      telephone: site.phoneTel,
      email: site.email,
      areaServed: {
        "@type": "Country",
        name: "Brasil",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      url: origin,
      name: site.name,
      description: siteMetaDescription,
      inLanguage: "pt-BR",
      publisher: { "@id": `${origin}/#legal-service` },
    },
    ...teamMembers.map((m, i) => ({
      "@type": "Person",
      "@id": `${origin}/#advogado-${i}`,
      name: m.name,
      jobTitle: m.role,
      description: m.bio.join(" "),
      identifier: m.oab,
      memberOf: { "@id": `${origin}/#legal-service` },
    })),
  ];

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
