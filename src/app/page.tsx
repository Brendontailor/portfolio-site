import { AboutSection } from "@/components/home/about-section";
import { CasesSection } from "@/components/home/cases-section";
import { ContactSection } from "@/components/home/contact-section";
import { Hero } from "@/components/home/hero";
import { KnowledgeSection } from "@/components/home/knowledge-section";
import { LabSection } from "@/components/home/lab-section";
import { Manifesto } from "@/components/home/manifesto";
import { Marquee } from "@/components/home/marquee";
import { site } from "@/data/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: site.url,
    email: `mailto:${site.email}`,
    sameAs: [site.github],
    worksFor: {
      "@type": "Organization",
      name: site.company,
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "SaaS",
      "Multi-tenant",
      "APIs",
      "Arquitetura de software",
    ],
  };

  return (
    <>
      <main id="main" tabIndex={-1}>
        <Hero />
        <Marquee />
        <Manifesto />
        <CasesSection />
        <KnowledgeSection />
        <LabSection />
        <AboutSection />
        <ContactSection />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
